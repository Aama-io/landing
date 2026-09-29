import { Container, Title, Text, Group, Table, Box, ScrollArea, ThemeIcon, Tooltip, Paper } from '@mantine/core';
import { IconCheck, IconX, IconMinus, IconInfoCircle, IconChevronsDown, IconScale } from '@tabler/icons-react';
import classes from './PricingSection.module.css';

// Data type for cell content
interface CellData {
  value: string;
  status: 'yes' | 'no' | 'limited' | 'neutral';
}

// Feature interface
interface Feature {
  feature: string;
  tooltip?: string;
  aama: CellData;
  traditional: CellData;
}

// A general comparison against the category of enterprise fund administration
// platforms — never a named vendor, and never an invented figure. Every claim
// here is either about aama.io's own published product (see the plans above,
// the single source of truth for pricing) or a widely-documented pattern of
// how enterprise B2B software is typically sold and delivered (custom quoting,
// multi-month implementations). No competitor names, no fabricated numbers.
const comparisonData: { category: string; features: Feature[] }[] = [
  {
    category: 'Core features',
    features: [
      {
        feature: 'Investor onboarding',
        aama: { value: 'Fully digital, self-serve', status: 'yes' },
        traditional: { value: 'Often manual or paper-based', status: 'limited' },
      },
      {
        feature: 'Investor / LP portal',
        aama: { value: 'Included, white-labeled', status: 'yes' },
        traditional: { value: 'Frequently a separate paid module', status: 'limited' },
      },
      {
        feature: 'SPV & syndicate administration',
        tooltip: 'Per-deal SPV formation, investor onboarding and administration',
        aama: { value: 'Native, per-deal setup', status: 'yes' },
        traditional: { value: 'Rarely built in — usually needs a separate SPV administrator', status: 'no' },
      },
      {
        feature: 'VCC sub-fund support (Singapore)',
        tooltip: 'Native support for Singapore Variable Capital Company sub-fund structures',
        aama: { value: 'Native support', status: 'yes' },
        traditional: { value: 'Varies by provider — often needs custom configuration', status: 'limited' },
      },
      {
        feature: 'IFRS 9 / SFRS(I) 9 accounting',
        tooltip: 'Amortised cost, effective-interest and expected credit loss for credit funds',
        aama: { value: 'Native to the general ledger', status: 'yes' },
        traditional: { value: 'Typically available in established platforms', status: 'yes' },
      },
      {
        feature: 'Compliance & AML tooling',
        aama: { value: 'Included', status: 'yes' },
        traditional: { value: 'Typically available, sometimes a paid add-on', status: 'neutral' },
      },
      {
        feature: 'Configuration & customization',
        aama: { value: 'Included in every plan', status: 'yes' },
        traditional: { value: 'Often a separate professional-services engagement', status: 'limited' },
      },
    ],
  },
  {
    category: 'How it’s delivered',
    features: [
      {
        feature: 'Built for',
        aama: { value: 'Boutique & mid-market funds', status: 'neutral' },
        traditional: { value: 'Large institutional scale', status: 'neutral' },
      },
      {
        feature: 'Deployment',
        aama: { value: 'Cloud SaaS', status: 'yes' },
        traditional: { value: 'Cloud or on-premise, depending on provider', status: 'neutral' },
      },
      {
        feature: 'Pricing model',
        aama: { value: 'Published — see plans above', status: 'yes' },
        traditional: { value: 'Custom-quoted, rarely published', status: 'limited' },
      },
      {
        feature: 'Typical go-live',
        tooltip: 'How enterprise software of this kind is commonly rolled out, based on publicly documented industry norms',
        aama: { value: 'Weeks, not months', status: 'yes' },
        traditional: { value: 'Often 3–6 months for full implementation', status: 'limited' },
      },
    ],
  },
];

const statusColor: Record<CellData['status'], string> = {
  yes: 'green',
  no: 'red',
  limited: 'yellow',
  neutral: 'gray',
};

const StatusIcon = ({ status }: { status: CellData['status'] }) => {
  if (status === 'yes') {return <IconCheck size={14} stroke={2.5} />;}
  if (status === 'no') {return <IconX size={14} stroke={2.5} />;}
  if (status === 'limited') {return <IconMinus size={14} stroke={2.5} />;}
  return null;
};

const renderCellContent = (data: CellData, isAama: boolean) => (
  <Group gap="xs" wrap="nowrap">
    {data.status !== 'neutral' && (
      <ThemeIcon
        size="sm"
        radius="xl"
        color={statusColor[data.status]}
        variant={isAama && data.status === 'yes' ? 'filled' : 'light'}
      >
        <StatusIcon status={data.status} />
      </ThemeIcon>
    )}
    <Text size="sm" fw={isAama ? 600 : 400}>{data.value}</Text>
  </Group>
);

export function PricingSection() {
  return (
    <div className={classes.wrapper} id="compare">
      <Container size="lg">
        <Box className={classes.header}>
          <Group gap="xs" justify="center" mb="sm">
            <IconScale color="var(--brand)" size={26} />
            <Title ta="center" order={2} className={classes.title}>
              How aama.io compares
            </Title>
          </Group>
          <Text ta="center" c="dimmed" maw={720} mx="auto">
            A general comparison against the category of enterprise fund administration platforms —
            not any specific vendor. Providers vary widely; confirm current features and pricing
            directly with anyone else you&apos;re evaluating. aama.io&apos;s own pricing is fully published above.
          </Text>
        </Box>

        <Paper shadow="sm" radius="md" withBorder className={classes.tableContainer}>
          <ScrollArea>
            <Table
              verticalSpacing="sm"
              horizontalSpacing="lg"
              striped
              highlightOnHover
              withColumnBorders
              className={classes.comparisonTable}
            >
              <Table.Thead>
                <Table.Tr className={classes.headerRow}>
                  <Table.Th className={classes.featureColumn}>Feature</Table.Th>
                  <Table.Th className={classes.aamaColumn}>aama.io</Table.Th>
                  <Table.Th>Traditional enterprise platforms</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {comparisonData.map((category, categoryIndex) => (
                  <>
                    <Table.Tr key={`category-${categoryIndex}`} className={classes.categoryRow}>
                      <Table.Td colSpan={3} className={classes.categoryCell}>
                        <Group gap="xs">
                          <IconChevronsDown size={16} />
                          <Text fw={700}>{category.category}</Text>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                    {category.features.map((row, index) => (
                      <Table.Tr key={`${categoryIndex}-${index}`}>
                        <Table.Td fw={500}>
                          {row.tooltip ? (
                            <Tooltip label={row.tooltip} position="top-start" withArrow>
                              <Group gap="xs">
                                <Text size="sm">{row.feature}</Text>
                                <IconInfoCircle size={16} color="gray" />
                              </Group>
                            </Tooltip>
                          ) : (
                            <Text size="sm">{row.feature}</Text>
                          )}
                        </Table.Td>
                        <Table.Td className={classes.aamaColumn}>{renderCellContent(row.aama, true)}</Table.Td>
                        <Table.Td>{renderCellContent(row.traditional, false)}</Table.Td>
                      </Table.Tr>
                    ))}
                  </>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>

          <Group mt="md" justify="center" p="md">
            <Text size="sm" ta="center" c="dimmed" maw={640}>
              &ldquo;Traditional enterprise platforms&rdquo; describes a category, not a specific product —
              individual vendors differ, and some may match aama.io on some rows above.
            </Text>
          </Group>
        </Paper>
      </Container>
    </div>
  );
}
