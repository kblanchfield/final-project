import styled from "styled-components"

export const FooterWrapper = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #EFEFEF;
  z-index: 2px;
  a {
    font-family: "Space Mono", sans-serif;
    color: black;
    text-decoration: none;
    &:active {
      border: 1px solid black;
    }
  }
`
