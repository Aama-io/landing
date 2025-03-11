import { AppShell } from '@mantine/core';
import { Header } from '../components/Header/Header';
import { ProductHero } from '../components/ProductHero/ProductHero';
import { Problems } from '../components/Problems/Problems';
import { Product } from '../components/Product/Product';
import { Footer } from '../components/Footer/Footer';

export default function ProductPage() {
  return (
    <AppShell header={{ height: 60 }} padding={0}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <ProductHero />
        <Problems />
        <Product />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
} 