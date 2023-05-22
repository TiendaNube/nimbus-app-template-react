import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import {
  Card,
  Icon,
  Box,
  Title,
  Button,
  Link,
  Text,
  Toast,
  Spinner,
} from "@nimbus-ds/components";
import { ExternalLinkIcon, PlusCircleIcon } from "@nimbus-ds/icons";
import { Page, Layout } from "@nimbus-ds/patterns";
import { useAuthentication, useFetch } from "@/hooks";
import Loading from "./LoadingPage";

const HomePage: React.FC = () => {
  const { ACCESS_TOKEN, LOADING_AUTHENTICATION } = useAuthentication();
  const { request } = useFetch();

  const {
    data: productsQuantity,
    isLoading: loadingProducts,
    refetch: refetchProducts,
  } = useQuery(
    ["products"],
    () =>
      request<{ content: number }>({
        url: "/products/total",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authentication: `bearer ${ACCESS_TOKEN}`,
        },
      }),
    {
      enabled: !!ACCESS_TOKEN,
      retry: false,
    }
  );

  const onSubmit = useMutation(
    () =>
      request({
        url: "/products",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authentication: `bearer ${ACCESS_TOKEN}`,
        },
      }),
    {
      onSuccess: () => {
        refetchProducts();
      },
    }
  );

  const IS_LOADING = useMemo(
    () => LOADING_AUTHENTICATION || loadingProducts || onSubmit.isLoading,
    [LOADING_AUTHENTICATION, loadingProducts, onSubmit.isLoading]
  );

  return (
    <>
      {IS_LOADING && <Loading />}
      {ACCESS_TOKEN && (
        <Page maxWidth="800px">
          <Page.Header title="Demo app" />
          <Page.Body>
            <Layout columns="1">
              <Layout.Section>
                <Card>
                  <Card.Header title="¡Felicitaciones por crear tu app!" />
                  <Card.Body>
                    <Text>
                      Esta app de ejemplo incluye nuestro&nbsp;
                      <Link
                        as="a"
                        href="https://nimbus.tiendanube.com/"
                        target="_blank"
                        appearance="primary"
                        textDecoration="none"
                      >
                        design system Nimbus
                      </Link>
                      &nbsp;y la integración a la&nbsp;
                      <Link appearance="primary" textDecoration="none">
                        API de Tiendanube
                      </Link>
                      &nbsp;para facilitar el desarrollo de nuevas aplicaciones
                      para nuestro ecosistema.
                    </Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link>
                      Conocé más sobre cómo crear tu app
                      <Icon
                        color="currentColor"
                        source={<ExternalLinkIcon />}
                      />
                    </Link>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Header title="Contador de productos de Tienda demo" />
                  <Card.Body>
                    <Box display="flex" flexDirection="column" gap="4" mb="2">
                      <Text>
                        Los productos de ejemplo se crean con un nombre y precio
                        aleatorios, a modo de prueba. Podés modificarlos o
                        eliminarlos en cualquier momento.
                      </Text>
                      <Box display="flex" flexDirection="column" gap="2">
                        <Text color="neutral-textDisabled">
                          Total de productos
                        </Text>
                        <Title as="h6" fontSize="h1" color="primary-textLow">
                          {productsQuantity && `${productsQuantity?.content}`}
                        </Title>
                      </Box>
                    </Box>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      appearance="primary"
                      onClick={() => onSubmit.mutate()}
                      disabled={IS_LOADING}
                    >
                      <Icon color="currentColor" source={<PlusCircleIcon />} />
                      Crear 5 productos
                      {IS_LOADING && (
                        <Spinner color="currentColor" size="small" />
                      )}
                    </Button>
                  </Card.Footer>
                </Card>
              </Layout.Section>
            </Layout>
          </Page.Body>
        </Page>
      )}
    </>
  );
};

export default HomePage;
