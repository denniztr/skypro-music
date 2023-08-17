import '../App.css';
import '../Sidebar.css'
import PlayListComponent from './PlayListComponent';


export default function SideBarComponent () {
  return (
    <div className="main__sidebar sidebar">
      <div className="sidebar__personal">
        <p className="sidebar__personal-name">Sergey.Ivanov</p>
        <div className="sidebar__icon">
          <svg alt="logout">
            <use xlinkHref="img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className="sidebar__block">
        <PlayListComponent />
      </div>
    </div>
  );
};

