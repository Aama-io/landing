import { Container, Text } from '@mantine/core';
import {
  IconShieldCheck,
  IconFileCertificate,
  IconLock,
  IconScale,
  IconRefresh,
} from '@tabler/icons-react';
import classes from './TrustBar.module.css';

const standards = [
  { label: 'MAS-aligned design', icon: IconScale },
  { label: 'IFRS accounting', icon: IconFileCertificate },
  { label: 'KYC / AML workflows', icon: IconShieldCheck },
  { label: 'Encryption & RBAC', icon: IconLock },
  { label: 'Full audit trails', icon: IconRefresh },
];

export function TrustBar() {
  return (
    <section className={classes.wrapper}>
      <Container size="xl">
        <Text className={classes.eyebrow}>
          Built to the standards regulated fund managers are held to
        </Text>
        <div className={classes.row}>
          {standards.map((s) => (
            <div key={s.label} className={classes.item}>
              <s.icon size={18} className={classes.icon} stroke={1.7} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
