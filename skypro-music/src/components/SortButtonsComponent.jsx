import React, { useState } from 'react';
import '../TrackList.css';
import '../App.css'
import PopupComponent from './PopUpComponent';

export default function SortButtonsComponent() {

  const performersList = [
    'Lindsey Stirling',
    'Frank Sinatra',
    'Calvin Harris',
    'Zhu',
    'Arctic Monkeys',
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
    'Инди'
    ];

  const [popupData, setPopupData] = useState({
    isOpen: false,
    title: '',
    content: [],
  });

  const handlePopupToggle = (content) => {
    setPopupData({ isOpen: !popupData.isOpen, content });
  };

  return (
    <div className="centerblock__filter filter">
        <div className="filter__title">Искать по:</div>
        <div className="filter__button button-author _btn-text" onClick={() => handlePopupToggle(performersList)}>исполнителю</div>
        <div className="filter__button button-year _btn-text" onClick={() => handlePopupToggle(sortingList)}>году выпуска</div>
        <div className="filter__button button-genre _btn-text" onClick={() => handlePopupToggle(genreSorting)}>жанру</div>
        <div className='popup'>
        <PopupComponent
            isOpen={popupData.isOpen}
            content={popupData.content} 
        />
        </div>
    </div>
  );
}

