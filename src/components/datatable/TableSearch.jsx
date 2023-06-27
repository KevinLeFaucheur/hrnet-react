import { styled } from "styled-components"

const Search = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TableSearch = () => {
  return (
    <Search><label>Search:&nbsp;<input /></label></Search>
  )
}
