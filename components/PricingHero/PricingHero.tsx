import { Container, Title, Text, Badge, Grid, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import classes from './PricingHero.module.css';

export function PricingHero() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <Grid gutter={50}>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <div className={classes.content}>
              <Badge size="lg" radius="sm" className={classes.badge}>Pricing</Badge>
              
              <Title className={classes.title}>
                Transparent Pricing for <span className={classes.highlight}>Fund Management</span>
              </Title>
              
              <Text className={classes.description}>
                AAMA offers flexible and transparent pricing options designed for funds of all sizes. 
                Our fee structure is based on assets under management, ensuring alignment with your fund's success.
              </Text>
              
              <Group mt="xl" className={classes.features}>
                <div className={classes.feature}>
                  <div className={classes.featureIcon}>✓</div>
                  <div className={classes.featureText}>
                    <Text fw={700}>No Hidden Fees</Text>
                    <Text size="sm" c="dimmed">Clear, asset-based pricing</Text>
                  </div>
                </div>
                
                <div className={classes.feature}>
                  <div className={classes.featureIcon}>✓</div>
                  <div className={classes.featureText}>
                    <Text fw={700}>Volume Discounts</Text>
                    <Text size="sm" c="dimmed">Rates decrease with AUM</Text>
                  </div>
                </div>
                
                <div className={classes.feature}>
                  <div className={classes.featureIcon}>✓</div>
                  <div className={classes.featureText}>
                    <Text fw={700}>Free Trial Available</Text>
                    <Text size="sm" c="dimmed">Test before committing</Text>
                  </div>
                </div>
              </Group>
            </div>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 5 }} className={classes.imageColumn}>
            <motion.div 
              className={classes.imageWrapper}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={classes.image}>
                <div className={classes.imageOverlay}></div>
                <div className={classes.shapes}>
                  <div className={classes.shape1}></div>
                  <div className={classes.shape2}></div>
                  <div className={classes.shape3}></div>
                </div>
              </div>
            </motion.div>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
} 