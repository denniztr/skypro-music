import React from 'react';
import * as S from './PopUp.styles'

export function PopupComponent ({ isOpen, content })  {

  return isOpen ? (
    <S.PopupContainer>
      <S.PopupContent>
        <S.PopupList>
          {content.map((el, i) => (
            <S.PopupListItem key={i}>
              {el}
            </S.PopupListItem>
          ))}
        </S.PopupList>
    </S.PopupContent>
    </S.PopupContainer>
  ) : null;
};
