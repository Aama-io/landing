import { Container, Text, Title, Button, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import classes from './CTA.module.css';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

export function CTA() {
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
              Ready to revolutionize your fund management?
            </Title>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Text className={classes.description}>
              Join the future of fund management with AAMA's blockchain-powered platform.
              Start your journey towards efficient, transparent, and automated fund operations.
            </Text>
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