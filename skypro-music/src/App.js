import './App.css';
import AudioPlayerComponent from './components/AudioPlayerComponent';
import SideBarComponent from './components/SideBarComponent';
import TrackListComponent from './components/TrackListComponent';
import NavMenuComponent from './components/NavMenuComponent';

const App = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <NavMenuComponent />
          <TrackListComponent />
          <SideBarComponent />
        </main>
        <AudioPlayerComponent />
        <footer className="footer"></footer>
      </div>
    </div>
  );
};

export default App;
