import React from 'react';
import { IconCheck } from '@tabler/icons-react';
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  List,
  rem,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import classes from './Pricing.module.css';
import Link from 'next/link';

/*
[
    {
        "id": "388404db-1703-4b10-b12b-e5d4385f1530",
        "title": "Starter Plan",
        "description": "Perfect for your small busines",
        "price": "$199 /month",
        "badge": "Most Popular",
        "features": [
            "One seat",
            "Unlimited",
            "Lifetime access"
        ],
        "is_highlighted": false,
        "sort": null,
        "button": {
            "id": "dda7d91c-b449-4ab3-9d9d-84d4e8c09caf",
            "sort": null,
            "type": "url",
            "page": null,
            "post": null,
            "label": "Get Started",
            "variant": "solid",
            "button_group": null,
            "url": "/your-stripe-checkout-link"
        },
        "pricing": {
            "id": "48cf2543-15e0-454f-9b31-cbf3c2406712",
            "headline": "Plans to fit every budget",
            "tagline": "Pricing",
            "pricing_cards": [
                "388404db-1703-4b10-b12b-e5d4385f1530",
                "83972d2a-742e-4a6c-8698-563d01dde54d"
            ]
        }
    },
    {
        "id": "83972d2a-742e-4a6c-8698-563d01dde54d",
        "title": "Enterprise Plan",
        "description": "The best plan with all the best features",
        "price": "$599 /month",
        "badge": null,
        "features": [
            "All of them",
            "Yes all of them"
        ],
        "is_highlighted": true,
        "sort": null,
        "button": {
            "id": "efb97ae9-d95e-4f9d-bf00-9df9966c65ec",
            "sort": null,
            "type": "url",
            "page": null,
            "post": null,
            "label": "Talk to Sales",
            "variant": "solid",
            "button_group": null,
            "url": "/get-a-demo"
        },
        "pricing": {
            "id": "48cf2543-15e0-454f-9b31-cbf3c2406712",
            "headline": "Plans to fit every budget",
            "tagline": "Pricing",
            "pricing_cards": [
                "388404db-1703-4b10-b12b-e5d4385f1530",
                "83972d2a-742e-4a6c-8698-563d01dde54d"
            ]
        }
    }
]
*/

type PricingTableProps = {
  data: {
    headline: string;
    tagline: string;
    pricing_cards: {
      title: string;
      description: string;
      price: string;
      features: string[];
      buttonText: string;
      buttonColor: string;
    }[];
  };
};

export default function PricingTable({data}: PricingTableProps) {
  return (
    <div className={classes.wrapper}>
    <Container size="lg" py="xl" id="pricing">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          {data.tagline}
        </Badge>
      </Group>

      <Title order={2} ta="center" className={classes.title} mt="sm">
      {data.headline}
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md"></Text>

      <Grid mt={50}>
        {data.pricing_cards.map((plan:any) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 12/plan.length }} key={plan.title}>
            <Card shadow="md" radius="md" padding="lg" className={plan.is_highlighted ? classes.highlighted : ''}>
              <Group mb="md">
                <Title order={3}>{plan.title}</Title>
                <Badge size="lg" color={plan.buttonColor}>
                  {plan.price}
                </Badge>
              </Group>
              <Text c="dimmed" mb="md">
                {plan.description}
              </Text>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon size={24} radius="xl" variant="light">
                    <IconCheck style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
                mb="lg"
              >
                {plan.features.map((feature: any) => (
                  <List.Item key={feature}>
                    <Text size="sm">{feature}</Text>
                  </List.Item>
                ))}
              </List>
              <Button mb="xs" variant={plan.button.variant} component={Link} href={plan.button.url}>
                {plan.button.label}
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
    </div>
  );
}
