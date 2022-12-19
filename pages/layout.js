import styled  from 'styled-components';
import Navigation from '../Components/Navigation';

const StyledLayout = styled.div`
    padding: ${props => props.theme.space.m}};
    max-width: 1680px;
    margin: 0 auto;
    padding-bottom: ${props => props.theme.space.xl};
`


export default function Layout({handleThemeChange, children, isDarkTheme}) {
    return (
      <StyledLayout>
        <main>{children}</main>
        <Navigation handleThemeChange={handleThemeChange} isDarkTheme={isDarkTheme}/>
      </StyledLayout>
    )
  }