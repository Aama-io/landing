import { Container, Title, Text, Button, Group, Badge } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './Hero.module.css';
import Link from 'next/link';

export function Hero() {
  return (
    <div className={classes.root}>
      <div className={classes.heroGrid}>
        <div className={classes.heroGridItem1}></div>
        <div className={classes.heroGridItem2}></div>
        <div className={classes.heroGridItem3}></div>
      </div>
      <Container size="lg">
        <div className={classes.inner}>
          <motion.div 
            className={classes.content}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge size="lg" radius="sm" className={classes.badge}>Fund-as-a-Service Platform</Badge>
            <Title className={classes.title}>
              Modern{' '}
              <span className={classes.highlight}>Fund Management</span>{' '} Platform
            </Title>
            <Text className={classes.description}>
              Seamlessly manage both traditional and blockchain-based funds with our comprehensive platform. 
              Built for modern fund managers who demand efficiency, security, and compliance.
            </Text>

            <Group className={classes.controls}>
              <Button
                component={Link}
                href="/contact"
                size="lg" 
                className={classes.control}
                rightSection={<IconArrowRight size={18} />}
              >
                Get Started
              </Button>
              
              <Button
                component={Link}
                href="/contact"
                size="lg"
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
          </motion.div>
          
          <motion.div 
            className={classes.illustration}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={classes.floatingChart}></div>
            <div className={classes.floatingToken}></div>
            <div className={classes.floatingGraph}></div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}