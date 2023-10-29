import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PopupComponent } from '../PopupComponent/PopUpComponent';
import {
  DEFAULT_SORT_VALUE,
  ASC_SORT_VALUE,
  DESC_SORT_VALUE,
} from '../../constants';

import * as S from './SortButtons.styles';

export function SortButtonsComponent() {
  const selectedItemsContainer = {
    position: 'absolute',
    right: '0',
    top: '0',
  };

  const selectedItemsContent = {
    position: 'relative',
  };

  const selectedItemsAmount = {
    position: 'absolute',
    left: '8.5px',
    top: '2px',
  };

  const tracks = useSelector((state) => state.player.tracks);
  const selectedAuthors = useSelector((state) => state.player.selectedAuthors);
  const selectedGenres = useSelector((state) => state.player.selectedGenres);
  const selectedSort = useSelector((state) => state.player.selectedSort);

  const unfilteredPerformersList = tracks.map((authors) => authors.author);
  const performersList = [...new Set(unfilteredPerformersList)];
  const year = [DEFAULT_SORT_VALUE, ASC_SORT_VALUE, DESC_SORT_VALUE];

  const unfilteredGenreSorting = tracks.map((genres) => genres.genre);
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
        <S.FilterButton
          className={`${performersPopup.isOpen ? 'opened' : ''}`}
          onClick={() => handlePerformersPopupToggle(performersList)}
        >
          исполнителю
        </S.FilterButton>
        {selectedAuthors.length > 0 ? (
          <div style={selectedItemsContainer}>
            <div style={selectedItemsContent}>
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="13" cy="12.75" rx="13" ry="12.75" fill="#AD61FF" />
              </svg>

              <div style={selectedItemsAmount}>{selectedAuthors.length}</div>
            </div>
          </div>
        ) : null}
        <PopupComponent
          performersPopup={performersPopup}
          isOpen={performersPopup.isOpen}
          content={performersPopup.content}
        />
      </S.FilterContainer>
      <p style={{position: 'absolute', right: '160px', paddingTop: '10px'}}>Сортировка: </p>
      <S.FilterContainer style={{order: '1', position: 'absolute', right: '0'}}>
      
        <S.FilterButton
          className={`${sortingPopup.isOpen ? 'opened' : ''}`}
          onClick={() => handleSortingPopupToggle(year)}
          
        >
          году выпуска
        </S.FilterButton>
        {selectedSort.length > 0 ? (
          <div style={selectedItemsContainer}>
            <div>
              <div style={selectedItemsContent}>
                <div>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="13"
                      cy="12.75"
                      rx="13"
                      ry="12.75"
                      fill="#AD61FF"
                    />
                  </svg>

                  <div style={selectedItemsAmount}>{selectedSort.length}</div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <PopupComponent
          year={year}
          isOpen={sortingPopup.isOpen}
          content={sortingPopup.content}
        />
      </S.FilterContainer>

      <S.FilterContainer>
        <S.FilterButton
          className={`${genrePopup.isOpen ? 'opened' : ''}`}
          onClick={() => handleGenrePopupToggle(genreSorting)}
        >
          жанру
        </S.FilterButton>
        {selectedGenres.length > 0 ? (
          <div style={selectedItemsContainer}>
            <div>
              <div style={selectedItemsContent}>
                <div>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="13"
                      cy="12.75"
                      rx="13"
                      ry="12.75"
                      fill="#AD61FF"
                    />
                  </svg>

                  <div style={selectedItemsAmount}>{selectedGenres.length}</div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <PopupComponent
          genrePopup={genrePopup}
          isOpen={genrePopup.isOpen}
          content={genrePopup.content}
        />
      </S.FilterContainer>

    </S.CenterblockFilter>
  );
}
