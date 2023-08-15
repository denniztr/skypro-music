import React, { useState, useEffect } from 'react';
import LoadingComponent from '../components/LoadingComponent'
import '../PlayList.css';
import '../App.css';


const PlayListComponent = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loading = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loading)

  }, []);

  return (
    <div className="sidebar__list">
      <div className="sidebar__item">
        <a className="sidebar__link" href="#">
          {isLoading ? (
            <LoadingComponent/> 
          ) : (
            <img
            className="sidebar__img"
            src="./img/playlist01.png"
            alt="day's playlist"
          />
          )}
        </a>
      </div>
      <div className="sidebar__item">
        <a className="sidebar__link" href="#">
        {isLoading ? (
            <LoadingComponent/> 
          ) : (
            <img
            className="sidebar__img"
            src="./img/playlist02.png"
            alt="day's playlist"
          />
          )}
        </a>
      </div>
      <div className="sidebar__item">
      {isLoading ? (
            <LoadingComponent/> 
          ) : (
            <img
            className="sidebar__img"
            src="./img/playlist03.png"
            alt="day's playlist"
          />
          )}
      </div>
    </div>
  );
};

export default PlayListComponent;
