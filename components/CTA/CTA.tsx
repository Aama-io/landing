import { Container, Text, Title, Button, Group, Box, Divider } from '@mantine/core';
import { motion } from 'framer-motion';
import classes from './CTA.module.css';
import Link from 'next/link';
import { IconArrowRight, IconCheck } from '@tabler/icons-react';

export function CTA() {
  const pricingFeatures = [
    "No setup fees",
    "Monthly subscription",
    "Free investor portal",
    "Scale as you grow"
  ];

  return (
    <div className={classes.wrapper}>
      <div className={classes.backgroundGrid}>
        <div className={classes.gridItem1}></div>
        <div className={classes.gridItem2}></div>
        <div className={classes.gridItem3}></div>
      </div>
      
      <div className={classes.floatingElements}>
        <div className={classes.floatingElement + ' ' + classes.floatingElement1}></div>
        <div className={classes.floatingElement + ' ' + classes.floatingElement2}></div>
        <div className={classes.floatingElement + ' ' + classes.floatingElement3}></div>
      </div>
      
      <Container size="lg" pos="relative">
        <motion.div 
          className={classes.inner}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Title className={classes.title}>
              Transform Your Fund Operations Today
            </Title>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Text className={classes.description}>
              Replace outdated contact forms with a modern software where investors can apply, 
              track and manage investments in real-time. Built specifically for boutique and 
              mid-sized fund managers in Singapore.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Group className={classes.pricingFeatures} mt={30}>
              {pricingFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <Group gap="xs" className={classes.featureItem}>
                    <IconCheck size={16} className={classes.checkIcon} />
                    <Text>{feature}</Text>
                  </Group>
                </motion.div>
              ))}
            </Group>
          </motion.div>

          <Group justify="center" mt={50}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Button 
                component={Link} 
                href="/contact" 
                size="lg" 
                variant="filled" 
                color="white"
                rightSection={<IconArrowRight size={18} />}
                className={classes.primaryButton}
              >
                Get Started Now
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Button 
                component={Link} 
                href="/contact" 
                size="lg" 
                variant="outline"
                color="white"
                className={classes.secondaryButton}
              >
                Schedule Demo
              </Button>
            </motion.div>
          </Group>
        </motion.div>
      </Container>
    </div>
  );
} 