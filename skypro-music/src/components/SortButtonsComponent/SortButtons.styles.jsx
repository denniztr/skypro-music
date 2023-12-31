import { styled } from 'styled-components';

export const CenterblockFilter = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 51px;
    gap: 10px;
    position: relative;
`
export const FilterTitle = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-right: 15px;
`
export const FilterContainer = styled.div`
    position: relative;
    padding-top: 10px;
`
export const FilterButton = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    border: 1px solid #ffffff;
    border-radius: 60px;
    padding: 6px 20px;
    &:hover {
        color: rgba(182, 114, 255, 1);
        text-decoration-color: rgba(182, 114, 255, 1);  
        cursor: pointer;
        border-color: rgba(182, 114, 255, 1); 
    }
        &.opened {
        cursor: pointer; 
        color: rgba(182, 114, 255, 1);
        text-decoration-color: rgba(182, 114, 255, 1);  
        border-color: rgba(182, 114, 255, 1);  
    }
`

