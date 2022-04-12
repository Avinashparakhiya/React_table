import { Button, Center, Flex, Heading, Image, Spinner, Table, Th, Thead, Tr } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useTable ,useSortBy,usePagination} from 'react-table'


//face dat agenrate api
const url = "https://fakestoreapi.com/products"




const App = () => {

  const [product, setProduct] = useState([]);

  const tableColum = [
    {
      Header: "ID",
      accessor: "id"
    },
    {
      Header: "Title",
      accessor: "title"
    },
    {
      Header: "Image",
      accessor: "image",
      Cell:({row})=><Image src={row.values.image} h={100} />

    },
    {
      Header: "Category",
      accessor: "category"
    },
    {
      Header: "Description",
      accessor: "description"
    },
    {
      Header: "Price",
      accessor: "price",
      Cell:({row})=>`$${row.values.price}`

    },
  ]



  useEffect(() => {
    const fatchProduct = async () => {
      try {
        const { data } = await axios.get(url);
        setProduct(data)
      } catch (error) {
        console.log(error);
      }
    }
    fatchProduct();
  }, [])

  const columns = useMemo(() => tableColum, [])
  const data = useMemo(() => product, [product])


  const {
    getTableProps, getTableBodyProps, headerGroups, page, prepareRow,   gotoPage,pageCount,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    initialState:{pageIndex:0}
  },useSortBy,usePagination);

  console.log("produys", product);

  if (product.length === 0)
    return (
      <Center>
        <Spinner />
      </Center>
    )

  return (
    <>
      <Heading>React Table</Heading>
      <Table variant='striped' colorScheme="orange" {...getTableProps} >
        <Thead>
          {headerGroups.map(headerGroups => (
            <Tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map(column=>
                (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  {}
                  </Th>
                ))}
            </Tr>
          ))}

        </Thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
      </Table>
      <Flex justify="space-between" align="center"> 
      <Flex gap='4'>
        <Button onClick={() => gotoPage(0)}>
          First Page
        </Button>
        <Button onClick={() => previousPage()}>
          Prev Page
        </Button>
      </Flex>


      <Flex gap='4'>
        <Button onClick={() => nextPage()}>
          Next Page
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} >
          Last Page
        </Button>
      </Flex>
       </Flex>
    </>
  )
}

export default App

