import styled from 'styled-components'

const Container = styled.div`
	${props => props.top ? `margin-top: ${props.theme.space[props.top]}` : ''};
	${props => props.bottom ? `margin-bottom: ${props.theme.space[props.bottom]}` : ''};
	${props => props.left ? `margin-left: ${props.theme.space[props.left]}` : ''};
	${props => props.right ? `margin-right: ${props.theme.space[props.right]}` : ''};

`

export default Container