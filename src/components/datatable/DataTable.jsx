import { styled } from "styled-components"
import { TableEntriesSelect } from "./TableEntriesSelect"
import { TableSearch } from "./TableSearch"
import { TableRow } from "./TableRow"
import { TableNav } from "./TableNav"
import { Separator } from "./Separator"
import { TableHead } from "./TableHead"
import { createContext, useEffect, useState } from "react"

const TableContainer = styled.div`
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
export const EntriesContext = createContext(10);

export const DataTable = ({ table }) => {
  const { data, columns } = table;
  const [sortBy, setSortBy] = useState(null); 
  const [entries, setEntries] = useState(1);
  const [selected, setSelected] = useState(null);


  useEffect(() => {
    if(sortBy) {
      let desc = sortBy.desc ? -1 : 1;
      data.sort((a, b) => { 
        return  a[sortBy.col] < b[sortBy.col] ? 1 * desc :
                a[sortBy.col] > b[sortBy.col] ? -1 * desc : 0;
      });
    }
    setSelected(data.slice(0, entries));
  }, [data, entries, sortBy])

  return (
    <DataContext.Provider value={data}>
      <SortingContext.Provider value={setSortBy}>
        <EntriesContext.Provider value={setEntries}>
          <TableContainer id="employee-table" className="display" >

            <TableHeader>
              <TableEntriesSelect />
              <TableSearch />
            </TableHeader>

            <Table>
              <TableHead columns={columns} />

              <tbody>
                { selected?.map((rowData, index) => <TableRow key={`row-${index}`} rowData={rowData} columns={columns} />)}
              </tbody>
            </Table>

            <Separator />

            <TableNav />

          </TableContainer>    
        </EntriesContext.Provider>
 
      </SortingContext.Provider>      
    </DataContext.Provider>
  )
}
