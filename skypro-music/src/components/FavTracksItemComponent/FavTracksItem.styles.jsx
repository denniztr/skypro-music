import  { keyframes, styled } from 'styled-components';

export const ContentPlaylist = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: auto;
`
export const PlaylistItem = styled.div`
    width: 100%;
    display: block;
    margin-bottom: 12px;
    cursor: pointer;
`
export const PlaylistTrack = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
`
export const TrackTitle = styled.div`
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
    width: 447px;
`
export const TrackTitleImage = styled.div`
    width: 51px;
    height: 51px;
    padding: 16px;
    background: #313131;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-right: 17px;
`

export const TrackTitleSvgStarred = styled.svg`
    width: 18px;
    height: 17px;
    fill: transparent;
    stroke: #4e4e4e;
`
const bubble_out = keyframes`
   0%,
  to {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
`

export const PlayingDot = styled.svg`
    width: 16px;
    height: 16px;
    background-color: #b672ff;
    border-radius: 8px;
    display: block;
    animation: ${bubble_out} 0.6s ease-in-out infinite both;
`

export const TrackTitleLink = styled.a`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
`
export const TrackTitleText = styled.div`
    width: 100%;
    height: 20px;
`
export const TrackTitleSpan = styled.span`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #4e4e4e;
`
export const TrackAuthor = styled.div`
    width: 321px;
    height: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
`
export const TrackAuthorLink = styled.a`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    text-align: left;   
`
export const TrackAlbum = styled.div`
    width: 245px;
    height: 20px;
`
export const TrackAlbumLink = styled.a`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #696969;
`
export const TrackTime = styled.div``

export const TrackTimeSvg = styled.svg`
    width: 16px;
    height: 14px;
    margin-right: 17px;
    fill: transparent;
    stroke: #696969;
`
export const TrackTimeText = styled.span`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    color: #696969;
`
