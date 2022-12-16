import styled from "styled-components";
const StyledStack = styled.div`
    display: flex;
    flex-direction:${props => props.direction};
    gap: ${props => props.theme.space[props.gap]};
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    width: ${props => props.fullWidth ? '100%': ''};
`

function Stack({ flexDirection, gap, alignItems, justifyContent, children, fullWidth}) {
    return ( 
        <StyledStack 
            direction={flexDirection} 
            gap={gap} 
            alignItems={alignItems} 
            justifyContent={justifyContent} 
            fullWidth={fullWidth}
            >
            { children }
        </StyledStack>
     );
}

export default Stack;