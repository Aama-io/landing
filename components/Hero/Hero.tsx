import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import classes from './Hero.module.css';
import Link from 'next/link';

export function Hero() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Modern{' '}
              <Text component="span" className={classes.highlight} inherit>
                Fund Management
              </Text>{' '}
              Platform
            </Title>

            <Text className={classes.description}>
              Seamlessly manage both traditional and blockchain-based funds with our comprehensive platform. 
              Built for modern fund managers who demand efficiency, security, and compliance.
            </Text>

            <Group className={classes.controls}>
              <Button
                component={Link}
                href="/contact"
                size="xl"
                className={classes.control}
                rightSection={<IconArrowRight size={20} />}
              >
                Get Started
              </Button>
              
              <Button
               component={Link}
                href="/contact"
                size="xl"
                variant="outline"
                className={classes.control}
              >
                Schedule Demo
              </Button>
            </Group>

            <div className={classes.stats}>
              <Group className={classes.statsInner}>
                <div>
                  <Text className={classes.statsValue}>$30M+</Text>
                  <Text className={classes.statsTitle}>Assets Managed</Text>
                </div>
                <div>
                  <Text className={classes.statsValue}>3+</Text>
                  <Text className={classes.statsTitle}>Active Funds</Text>
                </div>
                <div>
                  <Text className={classes.statsValue}>99.9%</Text>
                  <Text className={classes.statsTitle}>Uptime</Text>
                </div>
              </Group>
            </div>
          </div>

          <div className={classes.illustration}>
            <div className={classes.illustrationContent}>
              <div className={classes.gridBackground} />
              <div className={classes.floatingElements}>
                {/* Add floating elements like charts, tokens, etc. */}
                <div className={classes.floatingChart} />
                <div className={classes.floatingToken} />
                <div className={classes.floatingGraph} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}