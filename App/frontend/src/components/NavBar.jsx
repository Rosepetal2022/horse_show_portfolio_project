import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function NavBar() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <img src={logo} alt="" height="100" className="d-inline-block align-top" />
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                        <   Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/horses">Horses</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/riders">Riders</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/owner">Owners</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/betters">Betters</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/horseShows">Horse Shows</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/horseAndRider">Horses And Riders</Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="/bets">Placed Bets</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
};

export default NavBar;