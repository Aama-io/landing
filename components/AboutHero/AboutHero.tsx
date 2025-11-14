import { Container, Title, Text, Group, Stack, Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import classes from './AboutHero.module.css';

export function AboutHero() {
  const statsVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i + 0.4,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0] as const
      }
    }),
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.heroGrid}>
        <div className={classes.heroGridItem1}></div>
        <div className={classes.heroGridItem2}></div>
        <div className={classes.heroGridItem3}></div>
      </div>
      
      <div className={classes.floatingElements}>
        <div className={classes.floatingElement1}></div>
        <div className={classes.floatingElement2}></div>
        <div className={classes.floatingElement3}></div>
      </div>
      
      <Container size="lg">
        <motion.div 
          className={classes.inner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className={classes.content}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              size="lg" 
              radius="sm" 
              className={classes.badge}
            >
              Our Vision
            </Badge>
            
            <Title className={classes.title}>
              Revolutionizing Fund Management Through Technology
            </Title>
            
            <Text className={classes.description}>
              AAMA.io combines traditional finance expertise with cutting-edge blockchain technology 
              to create the next generation of fund management solutions.
            </Text>

            <Group mt={60} className={classes.stats}>
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={statsVariant}
              >
                <div className={classes.statItem}>
                  <Text className={classes.statCount}>2022</Text>
                  <Text className={classes.statTitle}>Founded</Text>
                </div>
              </motion.div>
              
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={statsVariant}
              >
                <div className={classes.statItem}>
                  <Text className={classes.statCount}>10+</Text>
                  <Text className={classes.statTitle}>Team Members</Text>
                </div>
              </motion.div>
              
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={statsVariant}
              >
                <div className={classes.statItem}>
                  <Text className={classes.statCount}>10+</Text>
                  <Text className={classes.statTitle}>Years of Experience</Text>
                </div>
              </motion.div>
            </Group>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
} 