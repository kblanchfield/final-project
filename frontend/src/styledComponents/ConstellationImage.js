import styled from "styled-components"

export const ConstellationImage = styled.img`
  width: 33.33%;
  object-fit: contain;
  object-position: center;
  display: inline;
  min-width: 150px;
  filter: ${props => props.collectedStars ? "opacity(0.25)" : "opacity(1)"};
`
