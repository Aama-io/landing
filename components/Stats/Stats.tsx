import { Container, SimpleGrid, Text, Title } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useRef } from 'react';
import classes from './Stats.module.css';

const stats = [
  { value: '$100M+', label: 'Assets Under Management' },
  { value: '1000+', label: 'Active Investors' },
  { value: '99.9%', label: 'Platform Uptime' },
  { value: '5+', label: 'Supported Blockchains' },
];

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.2,
  });

  return (
    <Container size="lg" py="xl">
      <div ref={ref} className={classes.wrapper}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
          {stats.map((stat, index) => (
            <div key={index} className={classes.stat}>
              <Text className={classes.value}>{stat.value}</Text>
              <Text className={classes.label}>{stat.label}</Text>
            </div>
          ))}
        </SimpleGrid>
      </div>
    </Container>
  );
} 