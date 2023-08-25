import { styled } from 'styled-components';

export const PopupContainer = styled.div`
    border-radius: 12px;
    background-color: rgba(49, 49, 49, 1);
    display: flex;
    position: absolute;
    width: 248px;
    margin-top: 10px;
`
export const PopupContent = styled.div`
    padding: 34px;  
`
export const PopupList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 28px;
    width: 180px;
    overflow-y: auto;
    max-height: 305px;
`
export const PopupListItem = styled.li`
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    &:hover {
        cursor: pointer; 
        color: rgba(182, 114, 255, 1);
        text-decoration: underline;
        text-decoration-color: rgba(182, 114, 255, 1);   
    }
`