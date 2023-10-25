import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as S from './PopUp.styles'
import { toggleAuthorSelection, setFoundTracksLength } from '../../pages/store/playerSlice';

export function PopupComponent ({ isOpen, content, sortParameter })  {
  const dispatch = useDispatch();

  const selectedAuthors = useSelector((state) => state.player.selectedAuthors);

  return isOpen ? (
    <S.PopupContainer>
      <S.PopupContent>
        <S.PopupList>
          {content.map((el, i) => (
            <S.PopupListItem key={i} 
            onClick={() => {
                dispatch(toggleAuthorSelection(el));
                dispatch(setFoundTracksLength(content.length))
              }}
              style={{ color: selectedAuthors.includes(el) ? 'rgba(182, 114, 255, 1)' : '#ffffff' }}
              >
              {el}
            </S.PopupListItem>
          ))}
        </S.PopupList>
    </S.PopupContent>
    </S.PopupContainer>
  ) : null;
};
