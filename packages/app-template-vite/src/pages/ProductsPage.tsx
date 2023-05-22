import { useEffect, useState } from "react";

import { ProductProps } from "../lib";
import { ResponsiveComponent, useProductContext } from "../components";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  TrashIcon,
} from "@nimbus-ds/icons";
import { Page, Layout, DataTable, DataList } from "@nimbus-ds/patterns";
import {
  Box,
  Button,
  IconButton,
  Table,
  Thumbnail,
  Text,
  Link,
  Checkbox,
} from "@nimbus-ds/components";
import { AuthenticationContent } from "@/hooks/useAuthentication/useAuthentication.types";

const ExamplesPage: React.FC = () => {
  // const {
  //   products,
  //   removeProduct,
  //   selectedProducts,
  //   setSelectedProducts,
  //   toggleSelectedProduct,
  //   removeSelectedProducts,
  // } = useProductContext();
  const storage = localStorage.getItem("authentication");
  const authentication = storage
    ? (JSON.parse(storage as string) as AuthenticationContent)
    : null;
  const [displayedRows, setDisplayedRows] = useState<ProductProps[]>([]);
  const [headerCheckboxStatus, setHeaderCheckboxStatus] = useState(false);
  const [headerIndeterminateStatus, setHeaderIndeterminateStatus] =
    useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(20);
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("descending");
  const [sortColumn, setSortColumn] = useState<"id" | "name">("id");
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    // setSelectedProducts(new Set());
    setEditMode(!editMode);
  };

  // useEffect(() => {
  //   setSelectedProducts(new Set()); // Clear checkedRows whenever products value changes
  // }, [products, setSelectedProducts]);

  // useEffect(() => {
  //   if (selectedProducts.size === products.length) {
  //     setHeaderCheckboxStatus(true);
  //     setHeaderIndeterminateStatus(false);
  //   } else if (selectedProducts.size > 0) {
  //     setHeaderCheckboxStatus(false);
  //     setHeaderIndeterminateStatus(true);
  //   } else {
  //     setHeaderCheckboxStatus(false);
  //     setHeaderIndeterminateStatus(false);
  //   }
  // }, [selectedProducts.size, products.length]);

  // const handleRowClick = (id: number) => {
  //   if (selectedProducts.has(id)) {
  //     setSelectedProducts((prevSelectedProducts) => {
  //       const newSelectedProducts = new Set(prevSelectedProducts);
  //       newSelectedProducts.delete(id);
  //       return newSelectedProducts;
  //     });
  //   } else {
  //     setSelectedProducts((prevSelectedProducts) => {
  //       const newSelectedProducts = new Set(prevSelectedProducts);
  //       newSelectedProducts.add(id);
  //       return newSelectedProducts;
  //     });
  //   }
  // };

  // const handleHeaderCheckboxClick = () => {
  //   if (headerCheckboxStatus) {
  //     setSelectedProducts(new Set());
  //   } else {
  //     const productIds = products.map((product) => product.id);
  //     setSelectedProducts(new Set(productIds));
  //   }
  // };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  // const handleSort = (column: "id" | "name") => {
  //   if (column === sortColumn) {
  //     setSortDirection(
  //       sortDirection === "ascending" ? "descending" : "ascending"
  //     );
  //   } else {
  //     setSortColumn(column);
  //     setSortDirection("ascending");
  //   }
  // };

  // useEffect(() => {
  //   const sortCompareFunction = (rowA: ProductProps, rowB: ProductProps) => {
  //     if (sortColumn === "id") {
  //       return sortDirection === "ascending"
  //         ? rowA.id - rowB.id
  //         : rowB.id - rowA.id;
  //     }
  //     if (sortColumn === "name") {
  //       return sortDirection === "ascending"
  //         ? rowA.name.localeCompare(rowB.name)
  //         : rowB.name.localeCompare(rowA.name);
  //     }
  //     return 0;
  //   };
  //   const getDisplayedRows = (): ProductProps[] => {
  //     const sortedRows = products.slice().sort(sortCompareFunction);
  //     const startIndex = (currentPage - 1) * pageSize;
  //     const endIndex = startIndex + pageSize;
  //     return sortedRows.slice(startIndex, endIndex);
  //   };

  //   setDisplayedRows(getDisplayedRows());
  // }, [products, currentPage, sortColumn, sortDirection, pageSize]);

  // const totalRows = products.length;
  const firstRow = (currentPage - 1) * pageSize + 1;
  // const lastRow = Math.min(currentPage * pageSize, totalRows);

  // const handleRemoveProduct = (id: number) => {
  //   removeProduct(id);
  // };

  const tableHeader = (
    <DataTable.Header
      checkbox={{
        name: "check-all-rows",
        checked: headerCheckboxStatus,
        onChange: () => console.log("onCHANGE"),
        // onChange: handleHeaderCheckboxClick,
        indeterminate: headerIndeterminateStatus,
      }}
    >
      <Table.Cell width="auto">
        <Box display="flex" gap="2" alignItems="center">
          Producto
          <IconButton
            source={
              sortDirection === "ascending" ? (
                <ChevronUpIcon size={10} />
              ) : (
                <ChevronDownIcon size={10} />
              )
            }
            size="1rem"
            onChange={() => console.log("hii")}
            // onClick={() => handleSort("name")}
          />
        </Box>
      </Table.Cell>
      <Table.Cell width="120px">Stock</Table.Cell>
      <Table.Cell width="120px">Precio</Table.Cell>
      <Table.Cell width="120px">Variantes</Table.Cell>
      <Table.Cell width="120px">Acciones</Table.Cell>
    </DataTable.Header>
  );

  const tableFooter = (
    <DataTable.Footer
      itemCount=""
      // itemCount={`Mostrando ${firstRow}-${lastRow} productos de ${totalRows}`}
      pagination={{
        pageCount: 10,

        // pageCount: Math.ceil(totalRows / pageSize),
        activePage: currentPage,
        onPageChange: handlePageChange,
      }}
    />
  );

  // const hasBulkActions = selectedProducts.size > 0 && (
  //   <DataTable.BulkActions
  //     checkbox={{
  //       name: "check-all",
  //       checked: headerCheckboxStatus,
  //       onChange: handleHeaderCheckboxClick,
  //       indeterminate: headerIndeterminateStatus,
  //     }}
  //     label={`${selectedProducts.size} ${
  //       selectedProducts.size === 1 ? "seleccionado" : "seleccionados"
  //     }`}
  //     action={
  //       <Box display="flex" gap="1">
  //         <Button appearance="danger" onClick={removeSelectedProducts}>
  //           Eliminar
  //         </Button>
  //       </Box>
  //     }
  //   />
  // );

  const mobileContent = (
    <>
      <Box px="4">
        <Link as="button" onClick={handleEditMode}>
          {editMode ? "Cancelar" : "Editar"}
        </Link>
      </Box>
      <DataList>
        {/* {hasBulkActions} */}
        {displayedRows.map((row) => {
          const { id } = row;

          return (
            <DataList.Row
              key={id}
              // backgroundColor={
              //   selectedProducts.has(row.id)
              //     ? "primary-surface"
              //     : "neutral-background"
              // }
              flexDirection="row"
              gap="2"
            >
              {editMode && (
                <Checkbox
                  name={`check-${id}`}
                  // checked={selectedProducts.has(row.id)}

                  onChange={() => console.log("hiii")}
                  // onChange={() => handleRowClick(id)}
                />
              )}
              <Box display="flex" gap="2" flex="1 1 auto">
                <Thumbnail src={row.image} width="54px" alt={row.name} />
                <Box display="flex" flexDirection="column">
                  <Text>{row.name}</Text>
                  <Text>{row.stock} en stock</Text>
                  <Text>{row.price}</Text>
                </Box>
              </Box>
              <Box display="flex" gap="2">
                <IconButton
                  onClick={() => console.log("hiii")}
                  // onClick={() => handleRemoveProduct(row.id)}
                  source={<TrashIcon />}
                  size="2rem"
                />
                <IconButton source={<ExternalLinkIcon />} size="2rem" />
              </Box>
            </DataList.Row>
          );
        })}
      </DataList>
    </>
  );

  const desktopContent = (
    <DataTable
      header={tableHeader}
      footer={tableFooter}
      // bulkActions={hasBulkActions}
    >
      {displayedRows.map((row) => {
        const { id } = row;

        return (
          <DataTable.Row
            key={id}
            // backgroundColor={
            //   selectedProducts.has(row.id)
            //     ? {
            //         rest: "primary-surface",
            //         hover: "primary-surfaceHighlight",
            //       }
            //     : {
            //         rest: "neutral-background",
            //         hover: "neutral-surface",
            //       }
            // }
            checkbox={{
              name: `check-${id}`,
              // checked: selectedProducts.has(row.id),

              onChange: () => console.log("hiii"),
              // onChange: () => handleRowClick(id),
            }}
          >
            <Table.Cell>
              <Box display="flex" gap="2">
                <Thumbnail src={row.image} width="36px" alt={row.name} />
                {row.name}
              </Box>
            </Table.Cell>
            <Table.Cell>{row.stock}</Table.Cell>
            <Table.Cell>{row.price}</Table.Cell>
            <Table.Cell>-</Table.Cell>
            <Table.Cell>
              <Box display="flex" gap="2">
                <IconButton
                  onClick={() => console.log("hiii")}
                  // onClick={() => handleRemoveProduct(row.id)}
                  source={<TrashIcon />}
                  size="2rem"
                />
                <IconButton source={<ExternalLinkIcon />} size="2rem" />
              </Box>
            </Table.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );

  return (
    <Page maxWidth="1200px">
      <Page.Header title="Productos de Tienda Demo" />
      <Page.Body px={{ xs: "none", md: "6" }}>
        <Layout columns="1">
          <Layout.Section>
            <ResponsiveComponent
              mobileContent={mobileContent}
              desktopContent={desktopContent}
            />
          </Layout.Section>
        </Layout>
      </Page.Body>
    </Page>
  );
};

export default ExamplesPage;
