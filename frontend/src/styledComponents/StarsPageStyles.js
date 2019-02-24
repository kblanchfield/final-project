import styled from "styled-components"

export const StarsPageWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 30px);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  @media (max-width: 900px) {
    height: auto;
    flex-direction: column;
  }
`

export const StarsLeftWrapper = styled.div`
  width: 50%;
  background-color: #EFEFEF;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
  }
`

export const StarsBackground = styled.div`
  width: 50%;
  height: 100%;
  overflow: scroll;
  line-height: 0px;
  background-image: url("http://cdn.eso.org/images/screen/magellan-ch17-bardon-cc.jpg");
  background-position: left top;
  text-align: center;
  @media (max-width: 900px) {
    width: 100%;
  }
`
