import { styled } from "styled-components"

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #111;
`

export const Separator = () => {
  return (
    <Line />
  )
}
