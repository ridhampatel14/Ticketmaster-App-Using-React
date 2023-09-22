import './App.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Home from './components/Home';
import EventList from './components/EventList';
import AttractionsList from './components/AttractionsList';
import VenuesList from './components/VenuesList';
import Event from './components/Event';
import Attraction from './components/Attraction';
import Venue from './components/Venue';
import logo from './images/Ticketmaster-Logo.png';



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className='App-logo' alt='logo'/><br></br>
          <Link className='showlink' to='/'>Home</Link>
          <Link className='showlink' to={`/events/page/${1}`}>Events</Link>
          <Link className='showlink' to={`/attractions/page/${1}`}>Attractions</Link>
          <Link className='showlink' to={`/venues/page/${1}`}>Venues</Link>
        </header>
        <div className='App-body'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/events/page/:page' element={<EventList/>} />
            <Route path='/events/:id' element={<Event/>}/>
            <Route path='/attractions/page/:page' element={<AttractionsList/>} />
            <Route path='/attractions/:id' element={<Attraction/>}/>
            <Route path='/venues/page/:page' element={<VenuesList/>} />
            <Route path='/venues/:id' element={<Venue/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
