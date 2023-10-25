import { styled } from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    background-color: #383838;
`
export const Container = styled.div`
    max-width: 1920px;
    height: 100vh;
    margin: 0 auto;
    position: relative;
    background-color: #181818;
`
export const Main = styled.div`
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
`
export const MainCenterblock = styled.div`
    width: auto;
    -webkit-box-flex: 3;
    -ms-flex-positive: 3;
    flex-grow: 3;
    padding: 20px 40px 20px 111px;
`
export const CenterblockTitle = styled.h2`
    font-style: normal;
    font-weight: 400;
    font-size: 64px;
    line-height: 72px;
    letter-spacing: -0.8px;
    margin-bottom: 45px;
`
export const CenterblockContent = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
`
export const ContentTitle = styled.div`
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
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 24px;
`
export const PlaylistTitleCol = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 2px;
    color: #696969;
    text-transform: uppercase;
`
export const Col1 = styled(PlaylistTitleCol)`
    width: 447px;
`
export const Col2 = styled(PlaylistTitleCol)`
    width: 321px;
`
export const Col3 = styled(PlaylistTitleCol)`
    width: 245px;
`
export const Col4 = styled(PlaylistTitleCol)`
    width: 60px;
    text-align: end;
`
export const PlaylistTitleSvg = styled.svg`
    width: 12px;
    height: 12px;
    fill: transparent;
    stroke: #696969;
`

// @font-face {
//     font-family: 'StratosSkyeng';
//     src: local('StratosSkyeng'), local('StratosSkyeng'),
//       url('/public//fonts/StratosSkyeng.woff2') format('woff2'),
//       url('/public/fonts/StratosSkyeng.woff') format('woff');
//     font-weight: 400;
//     font-style: normal;
//   }

// .playlist__container {
//     width: 100vw;
//     height: 100vh;
//     background-color: #181818;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     position: relative;
// }

// .playlist__title {
//     font-style: normal;
//     font-weight: 400;
//     font-size: 64px;
//     line-height: 72px;
//     letter-spacing: -0.8px;
//     margin-bottom: 45px;
// } 

// .playlist__logo {
//     position: absolute;
//     left: 30px;
//     top: 30px;
// }

// .playlist__logo-src {
//     width: 113.33px;
//     height: 17px;
//     color: #181818;
// }

