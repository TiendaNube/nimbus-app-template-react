import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from "@nimbus-ds/icons";
import { Page, Layout, DataTable, DataList } from "@nimbus-ds/patterns";
import {
  Box,
  Button,
  IconButton,
  Table,
  Thumbnail,
  Text,
  Pagination,
} from "@nimbus-ds/components";
import { ProductProps } from "@/types";
import { ResponsiveComponent } from "@/components";
import useProduct from "./hooks/useProducts";
import Loading from "../LoadingPage/LoadingPage";

const ProductsPage: React.FC = () => {
  const { products, onDelete, IS_LOADING } = useProduct();
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(
    new Set()
  );
  const [displayedRows, setDisplayedRows] = useState<
    ProductProps[] | undefined
  >([]);
  const [headerCheckboxStatus, setHeaderCheckboxStatus] = useState(false);
  const [headerIndeterminateStatus, setHeaderIndeterminateStatus] =
    useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("descending");
  const [sortColumn, setSortColumn] = useState<"id" | "name">("id");
  const [t] = useTranslation('translations');

  useEffect(() => {
    setSelectedProducts(new Set()); // Clear checkedRows whenever products value changes
  }, [products, setSelectedProducts]);

  useEffect(() => {
    if (selectedProducts.size === products?.content.length) {
      setHeaderCheckboxStatus(true);
      setHeaderIndeterminateStatus(false);
    } else if (selectedProducts.size > 0) {
      setHeaderCheckboxStatus(false);
      setHeaderIndeterminateStatus(true);
    } else {
      setHeaderCheckboxStatus(false);
      setHeaderIndeterminateStatus(false);
    }
  }, [selectedProducts.size, products?.content.length]);

  const handleRowClick = (id: number) => {
    if (selectedProducts.has(id)) {
      setSelectedProducts((prevSelectedProducts) => {
        const newSelectedProducts = new Set(prevSelectedProducts);
        newSelectedProducts.delete(id);
        return newSelectedProducts;
      });
    } else {
      setSelectedProducts((prevSelectedProducts) => {
        const newSelectedProducts = new Set(prevSelectedProducts);
        newSelectedProducts.add(id);
        return newSelectedProducts;
      });
    }
  };

  const handleHeaderCheckboxClick = () => {
    if (headerCheckboxStatus) {
      setSelectedProducts(new Set());
    } else {
      const productIds = products?.content.map((product) => product.id);
      setSelectedProducts(new Set(productIds));
    }
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleSort = (column: "id" | "name") => {
    if (column === sortColumn) {
      setSortDirection(
        sortDirection === "ascending" ? "descending" : "ascending"
      );
    } else {
      setSortColumn(column);
      setSortDirection("ascending");
    }
  };

  useEffect(() => {
    const sortCompareFunction = (rowA: ProductProps, rowB: ProductProps) => {
      if (sortColumn === "id") {
        return sortDirection === "ascending"
          ? rowA.id - rowB.id
          : rowB.id - rowA.id;
      }
      if (sortColumn === "name") {
        if(rowA.name.es && rowB.name.es)
        {
          return sortDirection === "ascending"
          ? rowA.name.es.localeCompare(rowB.name.es)
          : rowB.name.es.localeCompare(rowA.name.es);
        } else if(rowA.name.pt && rowB.name.pt)
        {
          return sortDirection === "ascending"
          ? rowA.name.pt.localeCompare(rowB.name.pt)
          : rowB.name.pt.localeCompare(rowA.name.pt);
        }
      }
      return 0;
    };
    if (products?.content.length) {
      const getDisplayedRows = (): ProductProps[] | undefined => {
        const sortedRows = products?.content.slice().sort(sortCompareFunction);
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedRows.slice(startIndex, endIndex);
      };

      setDisplayedRows(getDisplayedRows());
    }
  }, [products, currentPage, sortColumn, sortDirection, pageSize]);

  const totalRows = products?.content.length;
  const firstRow = (currentPage - 1) * pageSize + 1;
  const lastRow = totalRows && Math.min(currentPage * pageSize, totalRows);
  const tableCount =
    lastRow && lastRow > 0
      ? `Mostrando ${firstRow}-${lastRow} produtos de ${totalRows}`
      : "";

  const tableHeader = (
    <DataTable.Header
      checkbox={{
        name: "check-all-rows",
        checked: headerCheckboxStatus,
        onChange: handleHeaderCheckboxClick,
        indeterminate: headerIndeterminateStatus,
      }}
    >
      <Table.Cell width="100%">
        <Box display="flex" gap="2" alignItems="center">
          Produto
          <IconButton
            source={
              sortDirection === "ascending" ? (
                <ChevronUpIcon size={10} />
              ) : (
                <ChevronDownIcon size={10} />
              )
            }
            size="1rem"
            onClick={() => handleSort("name")}
          />
        </Box>
      </Table.Cell>
      <Table.Cell width="120px">Ações</Table.Cell>
    </DataTable.Header>
  );

  const tableFooter = (
    <DataTable.Footer
      itemCount={tableCount}
      pagination={{
        pageCount: (totalRows && Math.ceil(totalRows / pageSize)) as number,
        activePage: currentPage,
        onPageChange: handlePageChange,
      }}
    />
  );

  const removeSelectedProducts = (products?: any[]) => {
    console.log("selectedProducts", selectedProducts);
  };

  const hasBulkActions = selectedProducts.size > 0 && (
    <DataTable.BulkActions
      checkbox={{
        name: "check-all",
        checked: headerCheckboxStatus,
        onChange: handleHeaderCheckboxClick,
        indeterminate: headerIndeterminateStatus,
      }}
      label={`${selectedProducts.size} ${
        selectedProducts.size === 1 ? t('products.selected.single') :  t('products.selected.many')
      }`}
      action={
        <Box display="flex" gap="1">
          <Button
            appearance="danger"
            onClick={(e: any) => removeSelectedProducts(e)}
          >
            {t('products.remove')}
          </Button>
        </Box>
      }
    />
  );

  const mobileContent = (
    <DataList>
      {hasBulkActions}
      {displayedRows &&
        displayedRows.map((row) => {
          const { id } = row;

          return (
            <DataList.Row
              key={id}
              backgroundColor={
                selectedProducts.has(row.id)
                  ? "primary-surface"
                  : "neutral-background"
              }
              flexDirection="row"
              width="100%"
              gap="2"
            >
              <Box display="flex" gap="2" flex="1 1 auto">
                <Thumbnail
                  key={row.images[0].id}
                  src={row.images[0].src}
                  width="54px"
                  alt={row.name.pt as string || row.name.es as string}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text>{row.name.pt as string || row.name.es as string}</Text>
                </Box>
              </Box>
              <Box
                display="flex"
                gap="2"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton
                  onClick={() => onDelete.mutate(row.id)}
                  source={<TrashIcon />}
                  size="2rem"
                />
              </Box>
            </DataList.Row>
          );
        })}
    </DataList>
  );

  const desktopContent = (
    <>
      <Table>
        <Table.Head>
          <Table.Cell>{t('products.name')}</Table.Cell>
          <Table.Cell>
            <Box
              display="flex"
              gap="2"
              alignItems="center"
              width="100%"
              justifyContent="center"
            >
              <Text>{t('products.remove')}</Text>
            </Box>
          </Table.Cell>
        </Table.Head>
        <Table.Body>
          {displayedRows &&
            displayedRows.map((row) => {
              const { id } = row;
              return (
                <Table.Row key={id}>
                  <Table.Cell>
                    <Box display="flex" gap="2" alignItems="center">
                      <Thumbnail
                        src={row.images[0].src}
                        width="36px"
                        alt={row.name.pt as string || row.name.es as string}
                      />
                      {row.name.pt || row.name.es}
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Box
                      display="flex"
                      gap="2"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <IconButton
                        onClick={() => onDelete.mutate(row.id)}
                        source={<TrashIcon />}
                        size="2rem"
                      />
                    </Box>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      <Box display={"flex"} alignItems={"flex-end"} justifyContent={"flex-end"}>
        <Pagination
          activePage={currentPage}
          onPageChange={handlePageChange}
          pageCount={(totalRows && Math.ceil(totalRows / pageSize)) as number}
        ></Pagination>
      </Box>
    </>
  );
  const hasProducts = useMemo(() => {
    return !!products?.content?.length ?? null;
  }, [products?.content?.length]);
  return (
    <>
      {IS_LOADING && <Loading />}
      {!IS_LOADING && (
        <Page maxWidth="1200px">
          <Page.Header title={t('products.title')} />

          <Page.Body px={{ xs: "none", md: "6" }}>
            <Layout columns="1">
              <Layout.Section>
                <>
                  {hasProducts && (
                    <ResponsiveComponent
                      mobileContent={mobileContent}
                      desktopContent={desktopContent}
                    />
                  )}
                  {!!!hasProducts && (
                    <Text>{t('products.no-content')}</Text>
                  )}
                </>
              </Layout.Section>
            </Layout>
          </Page.Body>
        </Page>
      )}
    </>
  );
};

export default ProductsPage;
