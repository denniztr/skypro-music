import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './PopUp.styles'
import { toggleAuthorSelection, setToggleSelection, toggleSelectedGenres } from '../../pages/store/playerSlice';


export function PopupComponent ({ isOpen, content, performersPopup, genrePopup, year })  {
  const dispatch = useDispatch();

  const selectedAuthors = useSelector((state) => state.player.selectedAuthors);
  const selectedGenres = useSelector((state) => state.player.selectedGenres);

  

  return isOpen ? (
    <S.PopupContainer>
      <S.PopupContent>
        <S.PopupList>
          {content.map((el, i) => (
            <S.PopupListItem key={i} 
            onClick={() => {




              if (performersPopup) {
                dispatch(toggleAuthorSelection(el));

              } else if (genrePopup) {
                dispatch(toggleSelectedGenres(el))
              } else if (year) {
                console.log(year)
              }

              }}
              style={{ color: selectedAuthors.includes(el) || selectedGenres.includes(el) ? 'rgba(182, 114, 255, 1)' : '#ffffff' }}
              >

              {el}
              
            </S.PopupListItem>
          ))}
        </S.PopupList>
    </S.PopupContent>
    </S.PopupContainer>
  ) : null;
};
