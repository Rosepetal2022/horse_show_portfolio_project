import axios from "axios";
import { useEffect, useState } from 'react';
import { FaDeleteLeft } from "react-icons/fa6";

function Bets() {
    // State hooks to store fetched data
    const [betData, setBetData] = useState([]);
    const [horseData, setHorseData] = useState([]);
    const [betterData, setBetterData] = useState([]);
    const [horseShowData, setHorseShowData] = useState([]);
    const [selectedBet, setSelectedBet] = useState(null);

    const [addHorseID, setAddHorseID] = useState('');
    const [addBetterID, setAddBetterID] = useState('');
    const [addHorseShowID, setAddHorseShowID] = useState('');

    const [updateHorseID, setUpdateHorseID] = useState('');
    const [updateBetterID, setUpdateBetterID] = useState('');
    const [updateHorseShowID, setUpdateHorseShowID] = useState('');

    // Fetch data functions
    const fetchBetsData = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + 'bets';
            const response = await axios.get(URL);
            setBetData(response.data);
        } catch (error) {
            console.error('Error fetching bets data:', error);
            alert('Error fetching bets data from the server.');
        }
    };

    const fetchHorseData = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + 'horses';
            const response = await axios.get(URL);
            setHorseData(response.data);
        } catch (error) {
            console.error('Error fetching horse data:', error);
            alert('Error fetching horse data from the server.');
        }
    };

    const fetchBetterData = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + 'betters';
            const response = await axios.get(URL);
            setBetterData(response.data);
        } catch (error) {
            console.error('Error fetching better data:', error);
            alert('Error fetching better data from the server.');
        }
    };

    const fetchHorseShowData = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + 'horseShows';
            const response = await axios.get(URL);
            setHorseShowData(response.data);
        } catch (error) {
            console.error('Error fetching horse show data:', error);
            alert('Error fetching horse show data from the server.');
        }
    };

    // useEffect hook to fetch data when component mounts
    useEffect(() => {
        fetchBetsData();
        fetchBetterData();
        fetchHorseData();
        fetchHorseShowData();
    }, []);

    const betDelete = async (BetID) => {
        try {
            const URL = import.meta.env.VITE_API_URL + 'bets/' + BetID;
            const response = await axios.delete(URL);
            if (response.status === 204) {
                alert("Bet deleted successfully");
                fetchBetsData();
            } else {
                console.error(`Unexpected response status: ${response.status}`);
                alert('Error deleting bet. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting bet', error);
            alert('Error deleting bet. Please try again.');
        }
    };

    const betSubmit = (event) => {
        event.preventDefault();
        axios.post(import.meta.env.VITE_API_URL + "bets", {
            BetterID: addBetterID,
            HorseID: addHorseID,
            HorseShowID: addHorseShowID
        })
            .then(res => {
                console.log(res);
                fetchBetsData();
            }).catch(err => console.log(err))
    };

    const betUpdate = (event) => {
        event.preventDefault();
        axios.put(import.meta.env.VITE_API_URL + `bets/${selectedBet.BetID}`, {
            BetID: selectedBet.BetID,
            BetterID: updateBetterID,
            HorseID: updateHorseID,
            HorseShowID: updateHorseShowID
        })
            .then(res => {
                console.log(res);
                fetchBetsData();
            })
    };

    const handleBetSelect = (BetID) => {
        const selected = betData.find((bets) => bets.BetID === parseInt(BetID));
        setSelectedBet(selected);
        setUpdateBetterID(selected.BetterID);
        setUpdateHorseID(selected.HorseID);
        setUpdateHorseShowID(selected.HorseShowID);
    };

    return (
        <>
            <h2>Bets Placed</h2>
            <div className="table-padding">
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Better</th>
                            <th scope="col">Horse Show</th>
                            <th scope="col">Horse</th>
                        </tr>
                    </thead>
                    <tbody>
                        {betData.map((bet, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{bet.BetID} {bet.lastName}</td>
                                <td>{bet.HorseShowID}</td>
                                <td>{bet.HorseID}</td>
                                <td><button className="btn btn-danger btn-sm ml-1" onClick={() => betDelete(bet.BetID)}><FaDeleteLeft /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between">
                <div className="form-size">
                    <div className="container form-background">
                        <h2>Add Placed Bet</h2>
                        <form onSubmit={betSubmit}>
                            <div className="form-group form-padding">
                                <label htmlFor="better">Better</label>
                                <select
                                    className="form-control"
                                    id="better"
                                    value={addBetterID}
                                    onChange={(e) => setAddBetterID(e.target.value)}
                                >
                                    <option value="">Select Better</option>
                                    {betterData.map(better => (
                                        <option key={better.BetterID} value={better.BetterID}>
                                            {better.firstName} {better.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group form-padding">
                                <label htmlFor="horseShow">Horse Show</label>
                                <select
                                    className="form-control"
                                    id="horseShow"
                                    value={addHorseShowID}
                                    onChange={(e) => setAddHorseShowID(e.target.value)}
                                >
                                    <option value="">Select Horse Show</option>
                                    {horseShowData.map(show => (
                                        <option key={show.HorseShowID} value={show.HorseShowID}>
                                            {show.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group form-padding">
                                <label htmlFor="horse">Horse</label>
                                <select
                                    className="form-control"
                                    id="horse"
                                    value={addHorseID}
                                    onChange={(e) => setAddHorseID(e.target.value)}
                                >
                                    <option value="">Select Horse</option>
                                    {horseData.map(horse => (
                                        <option key={horse.HorseID} value={horse.HorseID}>
                                            {horse.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bets;