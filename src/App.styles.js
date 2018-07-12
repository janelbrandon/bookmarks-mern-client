import styled, { css, injectGlobal } from 'styled-components'
import { Link } from 'react-router-dom'

injectGlobal`
  body {
    font-family: cursive;
  }
`

const defaultStyles = {
  primaryColor: 'palevioletred'
}

const setColors = (foreground, background) => css`
  background-color: ${background};
  color: ${foreground};
`

const Title = styled.h4`
  font-size: 1.5em;
  text-align: center;
  ${setColors('blue', 'white')}
  ${props => props.primary && setColors('white', 'red')}
  ${props => props.warning && setColors('black', 'yellow')}
`

const BigTitle = Title.extend`
  font-size: 3em;
  border: 2px dotted green;
`

const phone = (content) => css`
  @media (max-width: 600px) {
    ${content}
  }
`

const StyledLink = styled(Link)`
  color: #0d0;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: red;
  }

  ${phone`
    font-size: 3em;
  `}
`

export { Title, BigTitle, StyledLink }
