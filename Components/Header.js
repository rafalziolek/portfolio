import styled from "styled-components";


const StyledHeader = styled.header`
    padding: ${props => props.theme.space.xl} 0;
`


function Header({ children }) {
    return (
        <StyledHeader>
                { children }
        </StyledHeader>
        
    );
}

export default Header;