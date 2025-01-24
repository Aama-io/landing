import { Box, Container, Text, Title } from "@mantine/core";
import { Info } from "../Info/Info";
import { SimpleContact } from "../SimpleContact/SimpleContact";
import { ArticlesCardsGrid } from "../ArticlesCardsGrid/ArticlesCardsGrid";

const BlockHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <Box>
        <Title order={2} ta="center">
            {title}
        </Title>
        <Text ta="center">{subtitle}</Text>
    </Box>
);

export const PageContent = ({ page, posts }: { page: any ,posts?: any }) => {
    return (
        <Container my={'xl'}>
            {page.content.map((block: any, index: number) => {
                switch (block.collection) {
                    case 'block_richtext':
                        return <><BlockHeader title={block.item.tagline} subtitle={block.item.headline} /><Info key={index} {...block} /></>;
                    case 'image':
                        return <img key={index} src={block.data.image} alt={block.data.alt} />;
                    case 'block_form':
                        return <><BlockHeader title={block.item.tagline} subtitle={block.item.headline} /><SimpleContact key={index} config={block.item.form} /></>;
                    case 'block_posts':
                        return <><BlockHeader title={block.item.tagline} subtitle={block.item.headline} /><ArticlesCardsGrid posts={posts}/></>;
                    default:
                        return null;
                }
            })}
        </Container>
    )
}