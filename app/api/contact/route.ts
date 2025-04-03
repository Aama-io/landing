import { NextResponse } from 'next/server';
import { TransactionalEmailsApi, SendSmtpEmail, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';

// Initialize Brevo client
const brevoApi = new TransactionalEmailsApi();

// Set API key in the correct format
if (process.env.BREVO_API_KEY) {
  brevoApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
}

// Temporary debugging
console.log('Brevo API Key:', process.env.BREVO_API_KEY ? 'Set' : 'Not set');

export async function POST(request: Request) {
  try {
    // Validate environment variables
    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error: BREVO_API_KEY is missing' },
        { status: 500 }
      );
    }
    if (!process.env.BREVO_SENDER_EMAIL) {
      return NextResponse.json(
        { error: 'Server configuration error: BREVO_SENDER_EMAIL is missing' },
        { status: 500 }
      );
    }
    if (!process.env.BREVO_TO_EMAIL) {
      return NextResponse.json(
        { error: 'Server configuration error: BREVO_TO_EMAIL is missing' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, company, phone, inquiryType, message, fundSize, investmentStrategy } = body;

    // Validate required fields
    if (!name || !email || !inquiryType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
      <p><strong>Fund Size:</strong> ${fundSize || 'Not provided'}</p>
      <p><strong>Investment Strategy:</strong> ${investmentStrategy || 'Not provided'}</p>
      <h3>Message:</h3>
      <p>${message}</p>
    `;

    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.subject = `New Contact Form Submission: ${inquiryType}`;
    sendSmtpEmail.htmlContent = emailContent;
    sendSmtpEmail.sender = {
      name: `${name}${company ? ` (${company})` : ''}`,
      email: process.env.BREVO_SENDER_EMAIL!
    };
    sendSmtpEmail.to = [{
      email: process.env.BREVO_TO_EMAIL!,
      name: 'AAMA Team'
    }];
    sendSmtpEmail.replyTo = {
      email: email,
      name: name
    };

    // Add more detailed error logging
    try {
      const result = await brevoApi.sendTransacEmail(sendSmtpEmail);
      console.log('Brevo API Response:', result);
    } catch (apiError: any) {
      console.error('Brevo API Error:', {
        message: apiError.message,
        response: apiError.response?.body,
        status: apiError.status,
        headers: apiError.headers
      });
      throw apiError;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to send email:', error);
    
    // Extract error message from Brevo API response if available
    const errorMessage = error.response?.body?.message || error.message || 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: errorMessage
      },
      { status: 500 }
    );
  }
} 