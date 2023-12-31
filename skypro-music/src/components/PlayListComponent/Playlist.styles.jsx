import { styled } from 'styled-components';

export const SidebarList = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
`
export const SidebarItem = styled.div`
    width: 250px;
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`
export const SidebarLink = styled.a`
    width: 100%;
    height: 100%;
`
export const SidebarImg = styled.img`
    width: 100%;
    height: auto;
    
`