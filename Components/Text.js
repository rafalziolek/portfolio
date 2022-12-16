import styled from "styled-components";
import { css } from "styled-components";
const TextStyles = {
    MainHeading: css`
        font-size: ${props => props.theme.fontSize.xl};
        font-weight: 400;
        line-height: 1.1;
    `,
    SectionHeading: css`
        font-size: ${props => props.theme.fontSize.l};
        font-weight: 400;
        line-height: 1.1;
    `,
    SubSectionHeading: css`
        font-size: ${props => props.theme.fontSize.m};
        font-weight: 400;
        line-height: 1.1;
    `,

    BodyLarge: css`
        font-size: ${props => props.theme.fontSize.s};
        font-weight: 400;
        line-height: 1.25;
    `,

    Body: css`
        font-size: ${props => props.theme.fontSize.xs};
        font-weight: 400;
        line-height: 1.5;
    `,

}

const StyledText = styled.div`
  ${(props) => TextStyles[props.type]};
  max-width: 60ch;
`;

function Text(props) {
    return ( 
        <StyledText as={props.tag} type={props.type}>
           {props.children}
        </StyledText>
     );
};

Text.defaultProps = {
    tag: 'p',
    type: 'Body'
}

export default Text;