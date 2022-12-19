import styled from "styled-components";
import Link from "next/link";
import Text from "./Text";
import Stack from "./Stack";
import Image from "next/image";

const StyledProject = styled.div`
    width: 100%;
    height: 600px;
    border-radius: ${props => props.theme.cornerRadius.l};
    background-color: ${props => props.backgroundColor ? props.backgroundColor : '#f5f4f4'};
    display: flex;
    align-items: flex-end;
    padding: ${props => props.theme.space.m};
    position: relative;

`

const Description = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: ${props => props.theme.color.colorFgPrimary}
`



function Project({ projectPath, projectName, company, cover, backgroundColor }) {
    return (
        <Link href={projectPath}> 
            <StyledProject cover={cover} backgroundColor={backgroundColor}>
                <Stack direction='row' justifyContent='space-between' fullWidth>
                    {cover ? <Image src={cover} fill /> : null}
                    <Text Tag='p' type='BodyLarge'>{projectName}</Text>
                    <Text tag='span' type='BodyLarge'>{ company }</Text>  
                </Stack>
            </StyledProject>
        </Link>
     );
}

export { Project };