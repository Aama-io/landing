import { Container, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import classes from './Metrics.module.css';

const metrics = [
  { value: '$500M+', label: 'Assets under administration' },
  { value: '2,000+', label: 'Active investors served' },
  { value: '50+', label: 'Funds launched' },
  { value: '80%', label: 'Less operational overhead' },
];

export function Metrics() {
  return (
    <section className={classes.wrapper}>
      <Container size="lg">
        <div className={classes.band}>
          <div className={classes.glow} />
          <div className={classes.grid}>
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                className={classes.metric}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Text className={classes.value}>{m.value}</Text>
                <Text className={classes.label}>{m.label}</Text>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
