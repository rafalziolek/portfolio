import styled from "styled-components";
import Container from "./Container";


// const StyledHeader = styled.header`
//     padding: ${props => props.theme.space.xl} 0;
// `


function Header({ children }) {
    return (
        <Container top='xl' bottom='xxl'>
                { children }
        </Container>
        
    );
}

export default Header;