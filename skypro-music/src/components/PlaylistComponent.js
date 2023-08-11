import React from 'react'
import '../PlayList.css';
import '../App.css';
import Playlist01 from '../components/playlist01.png'
import Playlist02 from '../components/playlist02.png'
import Playlist03 from '../components/playlist03.png'

const playListComponent = () => {
  return (
    <div className="sidebar__list">
      <div className="sidebar__item">
        <a className="sidebar__link" href="#">
          <img
            className="sidebar__img"
            src={Playlist01}
            alt="day's playlist"
          />
        </a>
      </div>
      <div className="sidebar__item">
        <a className="sidebar__link" href="#">
          <img
            className="sidebar__img"
            src={Playlist02}
            alt="day's playlist"
          />
        </a>
      </div>
      <div className="sidebar__item">
        <a className="sidebar__link" href="#">
          <img
            className="sidebar__img"
            src={Playlist03}
            alt="day's playlist"
          />
        </a>
      </div>
    </div>
  );
};

export default playListComponent;
