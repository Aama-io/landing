import cx from 'clsx';
import { Box, Button, Container, Image, Overlay, Text, Title } from '@mantine/core';
import classes from './Hero.module.css';
import { getImageUrl } from '@/lib/directus';

/*
headline: 'Headless but not brainless',
      id: 'd81ab264-b2be-4077-84e7-b1406e74d9c3',
      image: 'df0745c2-b6e3-4b37-b64d-55a4eb0033ab',
      button_group: '4cd6d4ca-82ea-4daf-ae79-a4c4265bfb27',
      description: 'Directus gives you a backend that is perfect for Headless CMS use cases but also everything beyond. Authentication, user permissions.',
      alignment: 'left',
      tagline: 'Backend + CMS',
      layout: 'image_right' */

type HeroProps = {
  headline: string;
  description: string;
  tagline: string;
  layout: string;
  image: {
    filename_disk: string;
  };
  button_group: {
    buttons: {
      id: string;
      label: string;
      variant: string;
    }[];
  };
};
  
export function Hero({ props }: { props: HeroProps }) {
  const { headline, description, tagline, layout, image, button_group } = props;
  return (
    <Box>
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <Title className={classes.title}>{headline}</Title>

          <Container size={640}>
            <Text size="lg" className={classes.description}>
              {description}
            </Text>
          </Container>
          <div className={classes.controls}>
            {button_group.buttons.map((button: any) => (
              <Button className={classes.control} key={button.id} variant={button.variant}>
                {button.label}
              </Button>
            ))}
          </div>
          { image && (
              
              <Container size={1040} mt={60}>
                <Image src={getImageUrl(image.filename_disk)} radius={'md'} />
              </Container>

          )}
        </div>
      </div>
    </Box>
  );
}