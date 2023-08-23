import React, { useState } from 'react';
import '../TrackList.css';
import '../App.css'
import PopupComponent from './PopUpComponent';

export default function SortButtonsComponent() {

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
    <div className="centerblock__filter filter">
        <div className="filter__title">Искать по:</div>
            <div className='filter__container'>
                <div className="filter__button button-author _btn-text" onClick={() => handlePerformersPopupToggle(performersList)}>исполнителю</div>
                <PopupComponent
                    isOpen={performersPopup.isOpen}
                    content={performersPopup.content}
                    />
            </div>
            <div className='filter__container'>
                <div className="filter__button button-year _btn-text" onClick={() => handleSortingPopupToggle(sortingList)}>году выпуска</div>
                <PopupComponent
                    isOpen={sortingPopup.isOpen}
                    content={sortingPopup.content}
                />
            </div>
            <div className='filter__container'>
                <div className="filter__button button-genre _btn-text" onClick={() => handleGenrePopupToggle(genreSorting)}>жанру</div>
                <PopupComponent
                    isOpen={genrePopup.isOpen}
                    content={genrePopup.content}
                />
            </div>
    </div>
  );
}

