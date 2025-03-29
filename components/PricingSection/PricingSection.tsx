import { Container, Title, Text, Card, Switch, Group, List, Button, Stack, Table, Badge, Box, ScrollArea, Divider, ThemeIcon, Tooltip, Paper } from '@mantine/core';
import { IconCheck, IconX, IconMinus, IconInfoCircle, IconAward, IconChevronsDown, IconCrown } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './PricingSection.module.css';

const plans = [
  {
    title: 'Basic',
    monthlyPrice: '0.5%',
    yearlyPrice: '0.4%',
    description: 'Perfect for getting started',
    features: [
      'Up to $1M AUM',
      'Basic fund setup',
      'Standard KYC/AML',
      'Email support',
      'Basic analytics',
      'Single blockchain',
    ],
    action: 'Get started',
    highlight: false,
  },
  {
    title: 'Professional',
    monthlyPrice: '0.3%',
    yearlyPrice: '0.25%',
    description: 'For growing funds',
    features: [
      'Up to $10M AUM',
      'Advanced fund setup',
      'Priority KYC/AML',
      'Priority support',
      'Advanced analytics',
      'Multi-chain support',
      'Custom branding',
      'API access',
    ],
    action: 'Start free trial',
    highlight: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'For institutional funds',
    features: [
      'Unlimited AUM',
      'Custom fund structure',
      'Dedicated KYC/AML',
      '24/7 support',
      'Custom analytics',
      'All chains supported',
      'White-label solution',
      'Custom integrations',
      'Dedicated account manager',
    ],
    action: 'Contact sales',
    highlight: false,
  },
];

// Data type for cell content
interface CellData {
  value: string;
  highlight: boolean;
}

// Feature interface
interface Feature {
  feature: string;
  tooltip?: string;
  aama: CellData;
  allvue: CellData;
  fundrecs: CellData;
  efront: CellData;
  apex: CellData;
}

// Group data by categories
const comparisonData = [
  {
    category: "Core Features",
    features: [
      {
        feature: 'Investor Onboarding',
        aama: { value: 'Yes (fully digital)', highlight: true },
        allvue: { value: 'Yes', highlight: false },
        fundrecs: { value: 'No', highlight: false },
        efront: { value: 'Limited', highlight: false },
        apex: { value: 'Yes', highlight: false }
      },
      {
        feature: 'Investor Portal',
        aama: { value: 'Yes', highlight: true },
        allvue: { value: 'Yes', highlight: false },
        fundrecs: { value: 'No', highlight: false },
        efront: { value: 'Yes', highlight: false },
        apex: { value: 'Yes', highlight: false }
      },
      {
        feature: 'Fund Management',
        aama: { value: 'Yes', highlight: true },
        allvue: { value: 'Yes', highlight: false },
        fundrecs: { value: 'No', highlight: false },
        efront: { value: 'Yes', highlight: false },
        apex: { value: 'Yes', highlight: false }
      },
      {
        feature: 'Fund Accounting & NAV',
        aama: { value: 'Yes', highlight: true },
        allvue: { value: 'Yes', highlight: false },
        fundrecs: { value: 'Yes', highlight: false },
        efront: { value: 'Yes', highlight: false },
        apex: { value: 'Yes', highlight: false }
      },
      {
        feature: 'Compliance & AML Tools',
        aama: { value: 'Yes (Enhanced)', highlight: true },
        allvue: { value: 'Yes', highlight: false },
        fundrecs: { value: 'No', highlight: false },
        efront: { value: 'Yes', highlight: false },
        apex: { value: 'Yes', highlight: false }
      },
      {
        feature: 'Custom Reporting',
        aama: { value: 'Yes', highlight: true },
        allvue: { value: 'Yes', highlight: false },
        fundrecs: { value: 'Limited', highlight: false },
        efront: { value: 'Yes', highlight: false },
        apex: { value: 'Yes', highlight: false }
      },
      {
        feature: 'Admin Dashboard',
        aama: { value: 'Yes', highlight: true },
        allvue: { value: 'Yes', highlight: false },
        fundrecs: { value: 'No', highlight: false },
        efront: { value: 'Yes', highlight: false },
        apex: { value: 'Yes', highlight: false }
      },
      {
        feature: 'AI-Powered Analytics',
        tooltip: 'Machine learning features for investment insights',
        aama: { value: 'Yes', highlight: true },
        allvue: { value: 'Limited', highlight: false },
        fundrecs: { value: 'No', highlight: false },
        efront: { value: 'Limited', highlight: false },
        apex: { value: 'Limited', highlight: false }
      }
    ]
  },
  {
    category: "Implementation & Support",
    features: [
      {
        feature: 'Client Type',
        aama: { value: 'Boutique, Mid-size', highlight: true },
        allvue: { value: 'Enterprise', highlight: false },
        fundrecs: { value: 'Mid-size', highlight: false },
        efront: { value: 'PE/VC/Enterprise', highlight: false },
        apex: { value: 'Enterprise', highlight: false }
      },
      {
        feature: 'Deployment',
        aama: { value: 'SaaS', highlight: true },
        allvue: { value: 'SaaS/On-prem', highlight: false },
        fundrecs: { value: 'SaaS', highlight: true },
        efront: { value: 'On-prem', highlight: false },
        apex: { value: 'SaaS', highlight: true }
      },
      {
        feature: 'Local Support (Singapore)',
        aama: { value: 'Full Coverage', highlight: true },
        allvue: { value: 'Yes', highlight: true },
        fundrecs: { value: 'Limited', highlight: false },
        efront: { value: 'Yes', highlight: true },
        apex: { value: 'Yes', highlight: true }
      },
      {
        feature: 'Global Market Support',
        tooltip: 'Ability to support fund operations across multiple jurisdictions',
        aama: { value: 'Yes (Comprehensive)', highlight: true },
        allvue: { value: 'Limited Regions', highlight: false },
        fundrecs: { value: 'No', highlight: false },
        efront: { value: 'Selected Markets', highlight: false },
        apex: { value: 'Major Markets', highlight: false }
      },
      {
        feature: 'Customization',
        aama: { value: 'Yes', highlight: true },
        allvue: { value: 'Limited/Expensive', highlight: false },
        fundrecs: { value: 'Limited', highlight: false },
        efront: { value: 'Limited', highlight: false },
        apex: { value: 'Limited', highlight: false }
      }
    ]
  },
  {
    category: "Cost & Timeline",
    features: [
      {
        feature: 'Pricing (Year 1)',
        tooltip: 'Total first-year cost including subscription and setup fees',
        aama: { value: '$12K – $45K', highlight: true },
        allvue: { value: '$120K – $350K+', highlight: false },
        fundrecs: { value: '$65K – $160K', highlight: false },
        efront: { value: '$160K – $520K+', highlight: false },
        apex: { value: '$220K+', highlight: false }
      },
      {
        feature: 'Setup Fees',
        tooltip: 'One-time implementation and configuration costs',
        aama: { value: '$2K – $12K', highlight: true },
        allvue: { value: '$25K – $60K+', highlight: false },
        fundrecs: { value: '$12K – $35K', highlight: false },
        efront: { value: '$30K – $80K+', highlight: false },
        apex: { value: '$55K+', highlight: false }
      },
      {
        feature: 'Go-Live Time',
        tooltip: 'Average time from contract signing to production deployment',
        aama: { value: '1–3 weeks', highlight: true },
        allvue: { value: '2–6 months', highlight: false },
        fundrecs: { value: '1–3 months', highlight: false },
        efront: { value: '3–6 months', highlight: false },
        apex: { value: '3–6 months', highlight: false }
      }
    ]
  }
];

// Function to render cell content with appropriate styling
const renderCellContent = (data: CellData) => {
  if (data.value === 'Yes' || data.value === 'Yes (fully digital)') {
    return (
      <Group gap="xs" wrap="nowrap">
        <ThemeIcon size="sm" radius="xl" color={data.highlight ? "green" : "gray"} variant={data.highlight ? "filled" : "light"}>
          <IconCheck size={14} stroke={2.5} />
        </ThemeIcon>
        <Text>{data.value}</Text>
      </Group>
    );
  } else if (data.value === 'No') {
    return (
      <Group gap="xs" wrap="nowrap">
        <ThemeIcon size="sm" radius="xl" color="red" variant="light">
          <IconX size={14} stroke={2.5} />
        </ThemeIcon>
        <Text>{data.value}</Text>
      </Group>
    );
  } else if (data.value === 'Limited' || data.value.includes('Limited')) {
    return (
      <Group gap="xs" wrap="nowrap">
        <ThemeIcon size="sm" radius="xl" color="yellow" variant="light">
          <IconMinus size={14} stroke={2.5} />
        </ThemeIcon>
        <Text>{data.value}</Text>
      </Group>
    );
  } else {
    return <Text fw={data.highlight ? 700 : 400}>{data.value}</Text>;
  }
};

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className={classes.wrapper}>
      <Container size="lg" py="xl">
        <Group gap="xs" justify="center" mb="sm">
          <IconCrown color="var(--mantine-color-blue-6)" size={28} />
          <Title ta="center" className={classes.title}>
           Global Market Comparison for 2025
          </Title>
        </Group>
        <Text ta="center" c="dimmed" maw={800} mx="auto" mb={30}>
          AAMA.io is positioned to deliver enterprise-grade fund management capabilities at a fraction of the cost 
          of traditional providers in Singapore and global markets for 2025 and beyond
        </Text>
        
        <Group mb={25} justify="center">
          <Box className={classes.legendItem}>
            <ThemeIcon size="sm" radius="xl" color="green" variant="filled">
              <IconCheck size={14} stroke={2.5} />
            </ThemeIcon>
            <Text size="sm">Best Option</Text>
          </Box>
          
          <Box className={classes.legendItem}>
            <ThemeIcon size="sm" radius="xl" color="gray" variant="light">
              <IconCheck size={14} stroke={2.5} />
            </ThemeIcon>
            <Text size="sm">Available</Text>
          </Box>
          
          <Box className={classes.legendItem}>
            <ThemeIcon size="sm" radius="xl" color="yellow" variant="light">
              <IconMinus size={14} stroke={2.5} />
            </ThemeIcon>
            <Text size="sm">Limited</Text>
          </Box>
          
          <Box className={classes.legendItem}>
            <ThemeIcon size="sm" radius="xl" color="red" variant="light">
              <IconX size={14} stroke={2.5} />
            </ThemeIcon>
            <Text size="sm">Not Available</Text>
          </Box>
        </Group>
        
        <Paper shadow="sm" radius="md" withBorder className={classes.tableContainer}>
          <ScrollArea>
            <Table 
              stickyHeader
              stickyHeaderOffset={60}
              verticalSpacing="sm" 
              horizontalSpacing="lg" 
              striped 
              highlightOnHover
              withColumnBorders
              className={classes.comparisonTable}
            >
              <Table.Thead>
                <Table.Tr className={classes.headerRow}>
                  <Table.Th className={classes.featureColumn}>Feature / Provider</Table.Th>
                  <Table.Th className={classes.aamaColumn}>
                    <Group gap="xs" justify="center">
                      <Badge size="lg" color="blue" variant="filled" className={classes.providerBadge}>
                        AAMA.io
                      </Badge>
                    </Group>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={600} ta="center">Allvue Systems</Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={600} ta="center">FundRecs</Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={600} ta="center">eFront (BlackRock)</Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={600} ta="center">Apex Group (FIS Investran)</Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {comparisonData.map((category, categoryIndex) => (
                  <>
                    <Table.Tr key={`category-${categoryIndex}`} className={classes.categoryRow}>
                      <Table.Td colSpan={6} className={classes.categoryCell}>
                        <Group gap="xs">
                          <IconChevronsDown size={16} />
                          <Text fw={700}>{category.category}</Text>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                    {category.features.map((row: Feature, index) => (
                      <Table.Tr key={`${categoryIndex}-${index}`}>
                        <Table.Td fw={500}>
                          {row.tooltip ? (
                            <Tooltip label={row.tooltip} position="top-start" withArrow>
                              <Group gap="xs">
                                <Text>{row.feature}</Text>
                                <IconInfoCircle size={16} color="gray" />
                              </Group>
                            </Tooltip>
                          ) : (
                            row.feature
                          )}
                        </Table.Td>
                        <Table.Td className={classes.aamaColumn}>
                          {renderCellContent(row.aama)}
                        </Table.Td>
                        <Table.Td>{renderCellContent(row.allvue)}</Table.Td>
                        <Table.Td>{renderCellContent(row.fundrecs)}</Table.Td>
                        <Table.Td>{renderCellContent(row.efront)}</Table.Td>
                        <Table.Td>{renderCellContent(row.apex)}</Table.Td>
                      </Table.Tr>
                    ))}
                  </>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
          
          <Group mt="md" justify="space-between" align="center" p="md">
            <Group gap="xs" c="dimmed">
              <IconInfoCircle size={16} />
              <Text size="sm">Lower values are better for pricing and timeline metrics. AAMA.io can provide customized solutions for any market globally.</Text>
            </Group>
            <Text size="sm" ta="right" c="dimmed">
              Based on projected market research for 2025
            </Text>
          </Group>
        </Paper>
      </Container>
    </div>
  );
} 