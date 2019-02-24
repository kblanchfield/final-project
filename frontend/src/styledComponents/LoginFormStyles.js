import styled from "styled-components"

export const Heading = styled.h4`
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: right;
  margin: 10px;
`

export const Label = styled.label`
  font-family: "Lily Script One", cursive;
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  text-align: left;
  margin: 0px;
`

export const Input = styled.input`
  padding: 7px;
  margin: 7px 0px;
  @media (max-width: 600px) {
    width: 80%
  }
`

export const Button = styled.button`
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  border: 1px solid black;
  border-radius: 20px;
  padding: 10px;
  margin: 7px 0px;
  &:hover {
    color: #EFEFEF;
    background-color: black;
  }
`
