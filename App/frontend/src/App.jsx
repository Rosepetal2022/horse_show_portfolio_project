import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Horse from './pages/Horse';
import Riders from './pages/Riders';
import HorseShows from './pages/HorseShows';
import Owner from './pages/Owner';
import Betters from './pages/Betters';
import HorseAndRiders from './pages/HorseAndRiders';
import Bets from './pages/Bets';
import Navbar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <Navbar />
    <main>
        <section>
            <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/horses" element={<Horse />} />
                <Route path="/riders" element={<Riders />} />
                <Route path="/betters" element={<Betters />} />
                <Route path="/horseshows" element={<HorseShows />} />
                <Route path="/owner" element={<Owner />} />
                <Route path="/horseAndRider" element={<HorseAndRiders />} />
                <Route path="/bets" element={<Bets />} />
            </Routes>
        </section>
    </main>
    </>
  );
}

export default App;

