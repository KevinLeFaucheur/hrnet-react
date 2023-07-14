import { useContext } from "react"
import { styled } from "styled-components"
import { DataContext } from "./DataTable"
import { search } from './utils/search'

const Search = styled.div`
  display: flex;
  justify-content: space-between;
`

/**
 * Search:
 * - Send a regex to SearchContexts
 */

export const TableSearch = ({ onChange }) => {
  const data = useContext(DataContext);

  return (
    <Search><label>Search:&nbsp;<input onChange={(e) => onChange(search(data, e.target.value))} /></label></Search>
  )
}
