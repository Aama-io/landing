import { NextResponse } from 'next/server';

/**
 * Contact form handler — creates/updates a HubSpot Contact and an associated
 * Deal (plus a timeline Note) from the "Send us a Message" form.
 *
 * Required env: HUBSPOT_ACCESS_TOKEN (private app token with scopes
 *   crm.objects.contacts.read, crm.objects.contacts.write, crm.objects.deals.write).
 * Optional env: HUBSPOT_DEAL_PIPELINE, HUBSPOT_DEAL_STAGE.
 */

const HS_BASE = 'https://api.hubapi.com';

// HubSpot default ("HUBSPOT_DEFINED") association type ids
const ASSOC = {
  DEAL_TO_CONTACT: 3,
  NOTE_TO_CONTACT: 202,
  NOTE_TO_DEAL: 214,
} as const;

type HubSpotError = Error & { status?: number; body?: unknown };

async function hubspot(path: string, init: RequestInit, token: string) {
  const res = await fetch(`${HS_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    const err = new Error(
      (data as { message?: string }).message || `HubSpot request failed (${res.status})`
    ) as HubSpotError;
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data as any;
}

/** Build a properties object, dropping empty values so we never overwrite with blanks. */
function clean(props: Record<string, string | undefined | null>) {
  return Object.fromEntries(
    Object.entries(props).filter(([, v]) => v != null && String(v).trim() !== '')
  );
}

export async function POST(request: Request) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'Server configuration error: HUBSPOT_ACCESS_TOKEN is missing' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, company, phone, inquiryType, message, fundSize, investmentStrategy } =
      body ?? {};

    if (!name || !email || !inquiryType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Split a single "name" field into first / last for HubSpot.
    const trimmedName = String(name).trim();
    const [firstname, ...rest] = trimmedName.split(/\s+/);
    const lastname = rest.join(' ');

    // 1) Upsert the contact (find by email → update, else create).
    const contactProps = clean({
      email,
      firstname,
      lastname,
      company,
      phone,
    });

    const search = await hubspot(
      '/crm/v3/objects/contacts/search',
      {
        method: 'POST',
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
          properties: ['email'],
          limit: 1,
        }),
      },
      token
    );

    let contactId: string;
    if (search.total > 0) {
      contactId = search.results[0].id;
      await hubspot(
        `/crm/v3/objects/contacts/${contactId}`,
        { method: 'PATCH', body: JSON.stringify({ properties: contactProps }) },
        token
      );
    } else {
      const created = await hubspot(
        '/crm/v3/objects/contacts',
        { method: 'POST', body: JSON.stringify({ properties: contactProps }) },
        token
      );
      contactId = created.id;
    }

    // 2) Create a deal associated with the contact.
    const description = [
      `Inquiry type: ${inquiryType}`,
      fundSize ? `Fund size: ${fundSize}` : null,
      investmentStrategy ? `Investment strategy: ${investmentStrategy}` : null,
      phone ? `Phone: ${phone}` : null,
      '',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const dealProps = clean({
      dealname: `${trimmedName}${company ? ` – ${company}` : ''} — ${inquiryType}`,
      pipeline: process.env.HUBSPOT_DEAL_PIPELINE || 'default',
      dealstage: process.env.HUBSPOT_DEAL_STAGE || 'appointmentscheduled',
      description,
    });

    const deal = await hubspot(
      '/crm/v3/objects/deals',
      {
        method: 'POST',
        body: JSON.stringify({
          properties: dealProps,
          associations: [
            {
              to: { id: contactId },
              types: [
                {
                  associationCategory: 'HUBSPOT_DEFINED',
                  associationTypeId: ASSOC.DEAL_TO_CONTACT,
                },
              ],
            },
          ],
        }),
      },
      token
    );

    // 3) Add a timeline note with the full message (non-fatal if it fails).
    try {
      const noteBody = `<strong>New website enquiry: ${inquiryType}</strong><br/>${String(message).replace(
        /\n/g,
        '<br/>'
      )}`;
      await hubspot(
        '/crm/v3/objects/notes',
        {
          method: 'POST',
          body: JSON.stringify({
            properties: { hs_note_body: noteBody, hs_timestamp: Date.now() },
            associations: [
              {
                to: { id: contactId },
                types: [
                  { associationCategory: 'HUBSPOT_DEFINED', associationTypeId: ASSOC.NOTE_TO_CONTACT },
                ],
              },
              {
                to: { id: deal.id },
                types: [
                  { associationCategory: 'HUBSPOT_DEFINED', associationTypeId: ASSOC.NOTE_TO_DEAL },
                ],
              },
            ],
          }),
        },
        token
      );
    } catch (noteError) {
      // A failed note shouldn't fail the whole submission.
      console.error('HubSpot note creation failed:', noteError);
    }

    return NextResponse.json({ success: true, contactId, dealId: deal.id });
  } catch (error) {
    const err = error as HubSpotError;
    const details =
      (err.body as { message?: string } | undefined)?.message || err.message || 'Unknown error';
    console.error('HubSpot contact submission failed:', details);
    return NextResponse.json({ error: 'Failed to submit your request', details }, { status: 500 });
  }
}
