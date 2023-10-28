import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './PopUp.styles'
import { setSelectedItems, toggleAuthorSelection, toggleSelectedGenres, toggleSelectedSort } from '../../pages/store/playerSlice';


export function PopupComponent ({ isOpen, content, performersPopup, genrePopup, year })  {
  const dispatch = useDispatch();

  const selectedAuthors = useSelector((state) => state.player.selectedAuthors);
  const selectedGenres = useSelector((state) => state.player.selectedGenres);
  const selectedSort = useSelector((state) => state.player.selectedSort);

  const handleSortClick = (el) => {
    if (performersPopup) {
      dispatch(toggleAuthorSelection(el));
    }
    if (genrePopup) {
      dispatch(toggleSelectedGenres(el))
    }
    if (year) {
      dispatch(toggleSelectedSort(el))
    }
   
  }

  return isOpen ? (
    <S.PopupContainer>
      <S.PopupContent>
        <S.PopupList>
          {content.map((el, i) => (
            <S.PopupListItem key={i} 
            onClick={() => {
              handleSortClick(el)
              //dispatch(setSelectedItems(el))
              }}
              style={{ color: selectedAuthors.includes(el) || selectedGenres.includes(el) || selectedSort.includes(el) ? 'rgba(182, 114, 255, 1)' : '#ffffff' }}
              >

              {el}

            </S.PopupListItem>
          ))}
        </S.PopupList>
    </S.PopupContent>
    </S.PopupContainer>
  ) : null;
};
