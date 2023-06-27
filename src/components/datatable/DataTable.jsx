import { styled } from "styled-components"
import { TableEntriesSelect } from "./TableEntriesSelect"
import { TableSearch } from "./TableSearch"
import { TableRow } from "./TableRow"
import { TableNav } from "./TableNav"
import { Separator } from "./Separator"
import { TableHead } from "./TableHead"

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

export const DataTable = ({ table }) => {
  const { data, columns } = table;

  return (
    <TableContainer id="employee-table" className="display" >

      <TableHeader>
        <TableEntriesSelect />
        <TableSearch />
      </TableHeader>

      <Table>
        <TableHead columns={columns} />

        <tbody>
          {data.map((rowData, index) => <TableRow key={`row-${index}`} rowData={rowData} columns={columns} />)}
        </tbody>
      </Table>

      <Separator />

      <TableNav />

    </TableContainer>
  )
}
