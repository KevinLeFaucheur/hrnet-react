import { styled } from "styled-components"
import { TableEntriesSelect } from "./TableEntriesSelect"
import { TableSearch } from "./TableSearch"
import { TableRow } from "./TableRow"
import { TableNav } from "./TableNav"
import { Separator } from "./Separator"
import { TableHead } from "./TableHead"
import { createContext, useEffect, useState } from "react"

export const TableContext = createContext(null);
export const SortingContext = createContext(null);
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
   */
  useEffect(() => {
    setDisplayData(displayData ? displayData : data);
    
    /** Sorting Rows to Display */
    if(sortBy) {
      let desc = sortBy.desc ? -1 : 1;
      displayData.sort((a, b) => { 
        return  a[sortBy.col] < b[sortBy.col] ? 1 * desc :
                a[sortBy.col] > b[sortBy.col] ? -1 * desc : 0;
      });
    }

    /** Selecting Rows by Page Index and Number of entries */
    setSelected(displayData.slice((pageIndex) * entries, pageIndex * entries + entries));

    setPageCount(Math.ceil(displayData.length / entries));
    
  }, [data, displayData, entries, pageIndex, sortBy]);

  return (
    <TableContext.Provider value={data}>
      <SortingContext.Provider value={setSortBy}>
        <EntriesContext.Provider value={setEntries}>
          <PaginationContext.Provider value={{ pageIndex, setPageIndex, pageCount }}>

            <TableContainer id="employee-table" className="display" >

              <TableHeader>
                <TableEntriesSelect />
                <TableSearch onChange={setDisplayData} />
              </TableHeader>

              <TableScrollContainer>
                <Table>
                  <TableHead columns={columns} />

                  <tbody>
                    { selected?.map((rowData, index) => <TableRow key={`row-${index}`} rowData={rowData} columns={columns} />)}
                  </tbody>
                </Table>                
              </TableScrollContainer>

              <Separator />

              <TableNav entries={entries} totalEntries={displayData.length} />

            </TableContainer>   

          </PaginationContext.Provider>
        </EntriesContext.Provider>
      </SortingContext.Provider>      
    </TableContext.Provider>
  )
}


/**
 * Styled Components
 */
const TableContainer = styled.div`
  font-size: 16px;
  align-self: start;
  width: 100%;
`

const TableHeader = styled.header`
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 0.5rem;

  label, p {
    margin: 0;
  }  
`
const TableScrollContainer = styled.div`
  overflow-x: scroll;
`

const Table = styled.table`
  border-spacing: 0 0;
  table-layout: fixed;
  border-collapse: collapse;
  position: sticky;
  top: 0;
  width: 100%;
`