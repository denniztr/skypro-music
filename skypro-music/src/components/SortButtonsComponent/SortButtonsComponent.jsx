import React, { useState } from 'react';
// import './TrackList.css';
import * as S from './SortButtons.styles'
import { PopupComponent } from '../PopupComponent/PopUpComponent';

export function SortButtonsComponent() {

    const performersList = [
        'Ariana Grande',
        'Arctic Monkeys',
        'Blind Channel',
        'Calvin Harris',
        'Frank Sinatra',
        'Lindsey Stirling',
        'Madilyn Bailey',
        'Zhu',
    ];
    
      const sortingList = [
        'По умолчанию', 
        'Сначала новые', 
        'Сначала старые'
    ];
    
      const genreSorting = [
        'Рок', 
        'Хип-хоп', 
        'Поп-музыка', 
        'Техно', 
        'Инди',
        'Классика',
        'Электронная',
        'Джаз',
        'Блюз',
    ];

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
                    isOpen={performersPopup.isOpen}
                    content={performersPopup.content}
                    />
            </S.FilterContainer>
            <S.FilterContainer>
                <S.FilterButton className="button-year _btn-text" onClick={() => handleSortingPopupToggle(sortingList)}>году выпуска</S.FilterButton>
                <PopupComponent
                    isOpen={sortingPopup.isOpen}
                    content={sortingPopup.content}
                />
            </S.FilterContainer>
            <S.FilterContainer>
                <S.FilterButton className="button-genre _btn-text" onClick={() => handleGenrePopupToggle(genreSorting)}>жанру</S.FilterButton>
                <PopupComponent
                    isOpen={genrePopup.isOpen}
                    content={genrePopup.content}
                />
          </S.FilterContainer>
    </S.CenterblockFilter>
  );
}

