import { styled } from "styled-components"
import { TableEntriesSelect } from "./TableEntriesSelect"
import { TableSearch } from "./TableSearch"
import { TableRow } from "./TableRow"
import { TableNav } from "./TableNav"
import { Separator } from "./Separator"
import { TableHead } from "./TableHead"
import { createContext, useEffect, useState } from "react"

const TableContainer = styled.div`
  width: 890px;
  font-size: 16px;
`

const TableHeader = styled.header`
  display: flex;
  justify-content: space-between;
  height: 30px;

  label, p {
    margin: 0;
  }  
`

const Table = styled.table`
  width: 100%;
  border-spacing: 0 0;
`

export const SortingContext = createContext(null);
export const DataContext = createContext(null);

export const DataTable = ({ table }) => {
  const { data, columns } = table;
  const [sortBy, setSortBy] = useState(null); 


  useEffect(() => {
    if(sortBy) {
      let desc = sortBy.desc ? -1 : 1;
      data.sort((a, b) => { 
        return  a[sortBy.col] < b[sortBy.col] ? 1 * desc :
                a[sortBy.col] > b[sortBy.col] ? -1 * desc : 0;
      });
    }
  }, [data, sortBy])

  return (
    <DataContext.Provider value={data}>
      <SortingContext.Provider value={setSortBy}>
        <TableContainer id="employee-table" className="display" >

          <TableHeader>
            <TableEntriesSelect />
            <TableSearch />
          </TableHeader>

          <Table>
            <TableHead columns={columns} />

            <tbody>
              { data?.map((rowData, index) => <TableRow key={`row-${index}`} rowData={rowData} columns={columns} />)}
            </tbody>
          </Table>

          <Separator />

          <TableNav />

        </TableContainer>  
      </SortingContext.Provider>      
    </DataContext.Provider>
  )
}
