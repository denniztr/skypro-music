import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'

import { PopupComponent } from '../PopupComponent/PopUpComponent';
import { DEFAULT_SORT_VALUE, ASC_SORT_VALUE, DESC_SORT_VALUE } from '../../constants';
// import { toggleSelectedSort } from '../../pages/store/playerSlice';

import * as S from './SortButtons.styles';

export function SortButtonsComponent() {
    const dispatch = useDispatch();

    const tracks = useSelector((state) => state.player.tracks);

    const unfilteredPerformersList = tracks.map(authors => authors.author);
    const performersList = [...new Set(unfilteredPerformersList)];
    const year = [DEFAULT_SORT_VALUE, ASC_SORT_VALUE, DESC_SORT_VALUE];

    

      const sortingList = [
        'По умолчанию', 
        'Сначала новые', 
        'Сначала старые'
      ];
    
    const unfilteredGenreSorting = tracks.map(genres => genres.genre);
    const genreSorting = [...new Set(unfilteredGenreSorting)];

    const [performersPopup, setPerformersPopup] = useState({ 
        isOpen: false, 
        content: [],
    });
    
    const [sortingPopup, setSortingPopup] = useState({
         isOpen: false, 
         content: [], 
        });

    const [genrePopup, setGenrePopup] = useState({ 
        isOpen: false, 
        content: [], 
    });

      const handlePerformersPopupToggle = (content) => {
        if (performersPopup.isOpen) {
          setPerformersPopup({ isOpen: false, content });
        } else {
          setPerformersPopup({ isOpen: true, content });
          setSortingPopup({ isOpen: false, content: [] });
          setGenrePopup({ isOpen: false, content: [] }); 
        }
      };
    
      const handleSortingPopupToggle = (content) => {
        if (sortingPopup.isOpen) {
          setSortingPopup({ isOpen: false, content });
        } else {
          setSortingPopup({ isOpen: true, content });
          setPerformersPopup({ isOpen: false, content: [] });
          setGenrePopup({ isOpen: false, content: [] });
        }
      };
    
      const handleGenrePopupToggle = (content) => {
        if (genrePopup.isOpen) {
          setGenrePopup({ isOpen: false, content });
        } else {
          setGenrePopup({ isOpen: true, content });
          setPerformersPopup({ isOpen: false, content: [] });
          setSortingPopup({ isOpen: false, content: [] });
        }
      };

    return (
    <S.CenterblockFilter>
        <S.FilterTitle>Искать по:</S.FilterTitle>
            <S.FilterContainer>
                <S.FilterButton className="button-author _btn-text" onClick={() => handlePerformersPopupToggle(performersList)}>исполнителю</S.FilterButton>
                <PopupComponent
                    performersPopup={performersPopup}
                    isOpen={performersPopup.isOpen}
                    content={performersPopup.content}
                    />
            </S.FilterContainer>
            <S.FilterContainer>
                <S.FilterButton className="button-year _btn-text" onClick={() => handleSortingPopupToggle(year)}>году выпуска</S.FilterButton>
                <PopupComponent
                    year={year}
                    isOpen={sortingPopup.isOpen}
                    content={sortingPopup.content}
                />
            </S.FilterContainer>
            <S.FilterContainer>
                <S.FilterButton className="button-genre _btn-text" onClick={() => handleGenrePopupToggle(genreSorting)}>жанру</S.FilterButton>
                <PopupComponent
                    genrePopup={genrePopup}
                    isOpen={genrePopup.isOpen}
                    content={genrePopup.content}
                />
          </S.FilterContainer>
    </S.CenterblockFilter>
  );
}

