import React from "react";

import { Page, Layout, MenuButton, HelpLink } from "@nimbus-ds/patterns";
import {
  Alert,
  Box,
  Button,
  Chip,
  Icon,
  IconButton,
  Input,
  Popover,
  Tag,
  Text,
  Link,
} from "@nimbus-ds/components";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  ExternalLinkIcon,
  PlusCircleIcon,
  SlidersIcon,
} from "@nimbus-ds/icons";

const PageTemplateExamplePage: React.FC = () => {
  const popoverContent = (
    <Box display="flex" flexDirection="column" width="100%">
      <MenuButton label="Ação secundária" />
      <MenuButton label="Ação secundária" />
      <MenuButton label="Ação secundária" />
    </Box>
  );

  const buttonStack = (
    <>
      <IconButton source={<ChevronLeftIcon />} size="2rem" />
      <IconButton source={<ChevronRightIcon />} size="2rem" />
      <Popover content={popoverContent} arrow={false} padding="small">
        <Button>
          Menu contextual
          <Icon source={<ChevronDownIcon />} />
        </Button>
      </Popover>
      <Button>
        Ação secundária
        <Icon source={<DownloadIcon />} />
      </Button>
      <Button appearance="primary">
        <Icon color="neutral-background" source={<PlusCircleIcon />} />
        Ação primária
      </Button>
    </>
  );

  return (
    <Page maxWidth="1200px">
      <Page.Header
        title="Modelo de página"
        subtitle="Subtítulo da página"
        buttonStack={buttonStack}
      >
        <Box display="flex" gap="2">
          <Tag appearance="primary">Tag de exemplo</Tag>
          <Tag>Tag de exemplo</Tag>
        </Box>
        <Alert title="Alerta de exemplo">
          Este é um alerta de exemplo no cabeçalho da página
        </Alert>
        <Box display="flex" flexDirection="column" gap="2">
          <Box display="flex" gap="1">
            <Input.Search placeholder="Buscar" />
            <Button>
              <Icon color="currentColor" source={<SlidersIcon />} />
            </Button>
          </Box>
          <Box display="flex" gap="2" alignItems="center">
            <Text>150 vendas</Text>
            <Chip text="Filtro aplicado" removable />
          </Box>
        </Box>
      </Page.Header>
      <Page.Body>
        <Layout columns="1">
          <Box
            width="100%"
            p="4"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderColor="neutral-interactive"
            borderStyle="dashed"
            borderWidth="1"
            borderRadius="0-5"
          >
            <Text>Substitua-me pelo seu conteúdo</Text>
          </Box>
          <HelpLink>
            <Link
              as="a"
              href="https://nimbus.tiendanube.com"
              target="_blank"
              appearance="primary"
              textDecoration="none"
            >
              Click me
              <Icon source={<ExternalLinkIcon />} color="currentColor" />
            </Link>
          </HelpLink>
        </Layout>
      </Page.Body>
    </Page>
  );
};

export default PageTemplateExamplePage;
