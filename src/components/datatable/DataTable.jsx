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
  border-spacing: 0 0;
  table-layout: fixed;
`

export const SortingContext = createContext(null);
export const DataContext = createContext(null);
export const EntriesContext = createContext(10);
export const PaginationContext = createContext({ current: 0, total: 1 });

export const DataTable = ({ table }) => {
  const { data, columns } = table;
  const [sortBy, setSortBy] = useState(null); 
  const [entries, setEntries] = useState(10);
  const [selected, setSelected] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [displayData, setDisplayData] = useState(data);

  /**
   * TODO:
   * - CSS
   * - Accessibility:   * 
   *  - Col Width based on th
   */

  useEffect(() => {
    setDisplayData(displayData ? displayData : data);

    console.log('rendering: ', displayData);
    
    /** */
    if(sortBy) {
      let desc = sortBy.desc ? -1 : 1;
      displayData.sort((a, b) => { 
        return  a[sortBy.col] < b[sortBy.col] ? 1 * desc :
                a[sortBy.col] > b[sortBy.col] ? -1 * desc : 0;
      });
    }

    /** */
    setSelected(displayData.slice((pageIndex) * entries, pageIndex * entries + entries));

    /** */
    setPageCount(Math.ceil(displayData.length / entries));
    
  }, [data, displayData, entries, pageIndex, sortBy]);

  return (
    <DataContext.Provider value={data}>
      <SortingContext.Provider value={setSortBy}>
        <EntriesContext.Provider value={setEntries}>
          <PaginationContext.Provider value={{ pageIndex, setPageIndex, pageCount }}>

            <TableContainer id="employee-table" className="display" >

              <TableHeader>
                <TableEntriesSelect />
                <TableSearch onChange={setDisplayData} />
              </TableHeader>

              <Table>
                <TableHead columns={columns} />

                <tbody>
                  { selected?.map((rowData, index) => <TableRow key={`row-${index}`} rowData={rowData} columns={columns} />)}
                </tbody>
              </Table>

              <Separator />

              <TableNav entries={entries} totalEntries={displayData.length} />

            </TableContainer>   

          </PaginationContext.Provider>
        </EntriesContext.Provider>
      </SortingContext.Provider>      
    </DataContext.Provider>
  )
}
