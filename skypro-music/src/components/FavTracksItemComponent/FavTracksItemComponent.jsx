// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState, useContext } from 'react';
// import { LoadingComponent } from '../LoadingComponent/LoadingComponent';

// import * as S from './FavTracksItem.styles';

// import { setCurrentTrack, setIsPlaying, setCurrentPlaylist } from '../../pages/store/playerSlice';

// import { getFavoriteTracks, unStarred } from '../../pages/store/authSlice';

// import { UserContext } from '../../context';

// import { toggleTrackStarred } from '../../pages/store/playerSlice';


// export function FavTracksItemComponent({ isLoading }) {
//   const [user] = useContext(UserContext);
//   const currentUser = user;

//   const dispatch = useDispatch();


//   // const tracks = useSelector((state) => state.player.tracks);
//   const currentTrack = useSelector((state) => state.player.currentTrack);
//   const isPlaying = useSelector((state) => state.player.isPlaying);
//   const accessToken = useSelector((state) => state.auth.accessToken);
//   // dispatch(getFavoriteTracks(accessToken))
 
//   const favorites = useSelector((state) => state.player.favorites);
  
  
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;

//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//     return `${formattedMinutes}:${formattedSeconds}`;
//   };

//   // const favorites = tracks.filter((track) => {
//   //   return track.stared_user.find((user) => user.id === currentUser.id);
//   //  });

//   const handleUnStarred = (track) => {
//     dispatch(unStarred({ track, accessToken }))
//     dispatch(getFavoriteTracks(accessToken))
//   }

//   // const handleUnStarred = (track) => {
//   //   if (track.stared_user.some((user) => user.id === currentUser.id)) {
//   //     dispatch(unStarred({ track, accessToken }))
//   //   }
//   //     dispatch(toggleTrackStarred({ track, currentUser }));
//   // };


//   return (
//     <S.ContentPlaylist>
//       {favorites ? (
//         favorites.map((track) => {
//           return (
//             <S.PlaylistItem
//               key={track.id}
//               onClick={() => {
//                 dispatch(setCurrentTrack(track));
//                 dispatch(setIsPlaying(true));
//                 dispatch(setCurrentPlaylist(favorites));
//               }}
//             >
//               <S.PlaylistTrack>
//                 <S.TrackTitle>
//                   <S.TrackTitleImage>
//                     {currentTrack && currentTrack.id === track.id ? (
//                       isPlaying ? (
//                         <S.PlayingDot></S.PlayingDot>
//                       ) : (
//                         <svg
//                           width="16"
//                           height="16"
//                           viewBox="0 0 16 16"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
//                             fill="#B672FF"
//                           />
//                         </svg>
//                       )
//                     ) : (
//                       <S.TrackTitleSvgStarred alt="music">
//                         <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
//                       </S.TrackTitleSvgStarred>
//                     )}
//                   </S.TrackTitleImage>
//                   <S.TrackTitleText>
//                     {isLoading ? (
//                       <LoadingComponent />
//                     ) : (
//                       <S.TrackTitleLink href="http://">
//                         {track.name} <S.TrackTitleSpan></S.TrackTitleSpan>
//                       </S.TrackTitleLink>
//                     )}
//                   </S.TrackTitleText>
//                 </S.TrackTitle>
//                 <S.TrackAuthor>
//                   {isLoading ? (
//                     <LoadingComponent />
//                   ) : (
//                     <S.TrackAuthorLink href="http://">
//                       {track.author}
//                     </S.TrackAuthorLink>
//                   )}
//                 </S.TrackAuthor>
//                 <S.TrackAlbum>
//                   {isLoading ? (
//                     <LoadingComponent />
//                   ) : (
//                     <S.TrackAlbumLink href="http://">
//                       {track.album}
//                     </S.TrackAlbumLink>
//                   )}
//                 </S.TrackAlbum>

//                 <S.TrackTime>
//                   <S.TrackTimeSvg
//                     key={track.id}
//                     onClick={(e) => {
//                       handleUnStarred(track);
//                       e.stopPropagation();
//                     }}
//                     alt="time"
//                   >
//                      <svg
//                         width="16"
//                         height="14"
//                         viewBox="0 0 16 14"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M8.36529 12.751C14.2458 9.25098 17.3111 3.96019 13.9565 1.51832C11.7563 -0.0832586 9.29718 1.19273 8.36529 2.00669H8.34378H8.34372H8.32221C7.39032 1.19273 4.93121 -0.0832586 2.73102 1.51832C-0.623552 3.96019 2.44172 9.25098 8.32221 12.751H8.34372H8.34378H8.36529Z"
//                           fill="#B672FF"
//                         />
//                         <path
//                           d="M8.34372 2.00669H8.36529C9.29718 1.19273 11.7563 -0.0832586 13.9565 1.51832C17.3111 3.96019 14.2458 9.25098 8.36529 12.751H8.34372M8.34378 2.00669H8.32221C7.39032 1.19273 4.93121 -0.0832586 2.73102 1.51832C-0.623552 3.96019 2.44172 9.25098 8.32221 12.751H8.34378"
//                           stroke="#B672FF"
//                         />
//                       </svg>

//                      {/* {track.stared_user.find((user) => user.id === currentUser.id) ? (
//                       <svg
//                         width="16"
//                         height="14"
//                         viewBox="0 0 16 14"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M8.36529 12.751C14.2458 9.25098 17.3111 3.96019 13.9565 1.51832C11.7563 -0.0832586 9.29718 1.19273 8.36529 2.00669H8.34378H8.34372H8.32221C7.39032 1.19273 4.93121 -0.0832586 2.73102 1.51832C-0.623552 3.96019 2.44172 9.25098 8.32221 12.751H8.34372H8.34378H8.36529Z"
//                           fill="#B672FF"
//                         />
//                         <path
//                           d="M8.34372 2.00669H8.36529C9.29718 1.19273 11.7563 -0.0832586 13.9565 1.51832C17.3111 3.96019 14.2458 9.25098 8.36529 12.751H8.34372M8.34378 2.00669H8.32221C7.39032 1.19273 4.93121 -0.0832586 2.73102 1.51832C-0.623552 3.96019 2.44172 9.25098 8.32221 12.751H8.34378"
//                           stroke="#B672FF"
//                         />
//                       </svg>
//                      ) : ( 
//                       <use xlinkHref="img/icon/sprite.svg#icon-like"></use> 
//                     )}  */}

//                   </S.TrackTimeSvg>

//                   <S.TrackTimeText>
//                     {formatTime(track.duration_in_seconds)}
//                   </S.TrackTimeText>
//                 </S.TrackTime>
//               </S.PlaylistTrack>
//             </S.PlaylistItem>
//           );
//         })
//       ) : (
//         <h2 style={{ color: '#696969' }}>Loading...</h2>
//       )}
//     </S.ContentPlaylist>
//   );
// }
