import Link from "next/link";
import styled from "styled-components";
import { useRouter } from 'next/router';
import Stack from "./Stack";
import Icon from "./Icon";

const StyledNav = styled.nav`
    border-radius: ${props => props.theme.cornerRadius.l};
    position: fixed;
    bottom: ${props => props.theme.space.m};
    left: ${props => props.theme.space.m};
    right: ${props => props.theme.space.m};
    list-style: none;
    font-size: ${props => props.theme.fontSize.xs};
    padding: ${props => props.theme.space.xxs};
    line-height: 100%;
    width: calc(100% - (2 * ${props => props.theme.space.m}));
`
const StyledNavItem = styled.a`
    padding: ${props => props.theme.space.xs} ${props => props.theme.space.s} ;
    border-radius: ${props => props.theme.cornerRadius.m};
    color: ${(props) => (props.href === props.pathName ? 'black' : 'white')};
    background-color: ${(props) => props.href === props.pathName ? props.theme.color.colorBgNavActive : props.theme.color.colorBgNav};
    backdrop-filter: blur(10px);
    border: none;
`

const StyledNavButton = styled.button`
    padding: ${props => props.theme.space.xs} ${props => props.theme.space.xs} ;
    border-radius: ${props => props.theme.cornerRadius.m};
    color: ${(props) => (props.href === props.pathName ? 'black' : 'white')};
    background-color: ${props => props.theme.color.colorBgNav};
    backdrop-filter: blur(10px);
    border: none;
    cursor: pointer;
`


function NavLink({link, label}) {
    const router = useRouter();

    return ( 
        <Link href={link} passHref legacyBehavior>
            <StyledNavItem pathName={router.pathname}>{label}</StyledNavItem>
        </Link>
     );
};

export function NavButton({handleThemeChange, icon, color}) {


    return (  
        <StyledNavButton onClick={handleThemeChange}><Icon name='darkMode' size='24' color={color}/></StyledNavButton>
    );
}



function Navigation({ handleThemeChange }){
    return ( 
        <StyledNav>
            <Stack direction='row' gap='xs' justifyContent='space-between' fullWidth>
                <Stack direction='row' gap='xs'>
                    <NavLink link='/' label='Work'/>
                    <NavLink link='/me' label='Me'/>
                    <NavLink link='/playground' label='Playground'/>
                </Stack>
                <NavButton handleThemeChange={handleThemeChange} icon color='white'/>
            </Stack>
               
        </StyledNav>
     );
}
 
export default Navigation;