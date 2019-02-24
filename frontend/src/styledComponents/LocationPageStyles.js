import styled from "styled-components"

export const LocationPageWrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 30px);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const LocationLeftWrapper = styled.div`
  width: 50%;
  background-color: #EFEFEF;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
  }
`

export const ChartTitle = styled.div`
  margin: 20px 20px 0px 20px;
  font-family: "Space Mono", sans-serif;
  font-size: 14px;
  color: black;
  text-align: left;
`

export const LocationRightWrapper = styled.div`
  width: 50%;
  height: 100%;
  background-color: #EFEFEF;
  @media (max-width: 900px) {
    width: 100%;
  }
`
