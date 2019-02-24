import styled from "styled-components"

export const Box = styled.div`
  height: 10px;
  width: 10px;
  display: inline-block;
  background-color: ${props => props.collected ? "#a0ced9" : "#83a9b2"};
`

export const Label = styled.div`
  display: inline-block;
  font-family: "Space Mono", sans-serif;
  font-size: 12px;
`
