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
                Institutional-Grade at <span className={classes.highlight}>Startup-Friendly Pricing</span>
              </Title>
              
              <Text className={classes.description}>
                We offer institutional-grade fund management software at startup-friendly pricing — designed to help 
                Singaporean fund managers scale, stay compliant, and delight investors.
              </Text>
              
              <Group mt="xl" className={classes.features}>
                <div className={classes.feature}>
                  <div className={classes.featureIcon}>✓</div>
                  <div className={classes.featureText}>
                    <Text fw={700}>SaaS Subscription</Text>
                    <Text size="sm" c="dimmed">Transparent monthly or yearly billing</Text>
                  </div>
                </div>
                
                <div className={classes.feature}>
                  <div className={classes.featureIcon}>✓</div>
                  <div className={classes.featureText}>
                    <Text fw={700}>All-Inclusive</Text>
                    <Text size="sm" c="dimmed">Maintenance & support included</Text>
                  </div>
                </div>
                
                <div className={classes.feature}>
                  <div className={classes.featureIcon}>✓</div>
                  <div className={classes.featureText}>
                    <Text fw={700}>Early Adopter Discount</Text>
                    <Text size="sm" c="dimmed">30% off for first 3 clients</Text>
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