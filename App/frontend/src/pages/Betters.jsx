import { betters_data } from '../utils/sampleData';
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { useEffect, useState } from 'react';

function Betters() {
    // useState hook to initialize the diagnosticData state variable to store the fetched data
    const [betterData, setBetterData] = useState([]);

    // Define a function to fetch diagnostic data from the API
    const fetchBetterData = async () => {
        try {
            // Construct the URL for the API call
            const URL = import.meta.env.VITE_API_URL + 'betters';
            console.log(URL)
            // Use Axios to make the GET request
            const response = await axios.get(URL);
            console.log("data log from home", response)
            // Update state with the response data
            setBetterData(response.data);
        } catch (error) {
            // Handle any errors that occur during the fetch operation
            console.error('Error fetching diagnostic data:', error);
            alert('Error fetching diagnostic data from the server.');
        }
    };

    // useEffect hook to trigger the fetchDiagnosticData function when the component mounts
    useEffect(() => {
        fetchBetterData();
    }, []);

    const [BetterID, setBetterID] = useState('')
    const [selectedBetter, setSelectedBetter] = useState(null);
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [BetterAmount, setBetterAmount] = useState('')

    function betterSubmit(event) {
        event.preventDefault();
        axios.post(import.meta.env.VITE_API_URL + 'betters', { FirstName, LastName, BetterAmount })
            .then(res => {
                console.log(res)
                window.location.reload()
            }).catch(err => console.log(err))
    }

    function betterUpdate(event, betterId) {
        event.preventDefault();
        console.log(betterId)

        // Gather form data
        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const amount = event.target.elements.amount.value;

        // Make PUT request to update owner
        axios.put(import.meta.env.VITE_API_URL + `betters/${betterId}`, { BetterID: betterId, FirstName: firstName, LastName: lastName, Amount: amount })
            .then(res => {
                console.log(res);
                window.location.reload()
                // Optionally, handle success (e.g., display a success message)
            })
            .catch(err => {
                console.error('Error updating better:', err);
                // Optionally, handle error (e.g., display an error message)
            });
    }

    const betterDelete = async (BetterID) => {
        console.log(BetterID)
        try {
            const URL = import.meta.env.VITE_API_URL + 'betters/' + BetterID;;
            console.log(URL)
            const response = await axios.delete(URL);

            // Handle success
            if (response.status === 204) {
                alert("better deleted successfully");
                window.location.reload()
            }
        } catch (error) {
            console.error('Error deleting better:', error);
            // Handle error
        }
    };

    const handleBetterSelect = (betterId) => {
        const selected = betterData.find((better) => better.BetterID === parseInt(betterId));
        setSelectedBetter(selected);
        setFirstName(selected.FirstName);
        setLastName(selected.LastName);
        setBetterAmount(selected.BetterAmount);
    };

    return (
        <>
            <h2>Add/Edit/Delete Betters</h2>
            <div className="table-padding">
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Amout</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {betterData.map((better, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>${better.BetterAmount}</td>
                                <td>{better.FirstName}</td>
                                <td>{better.LastName}</td>
                                <td><button className="btn btn-danger btn-sm ml-1" onClick={e => betterDelete(better.BetterID)}><FaDeleteLeft /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between">
                <div className="form-size">
                    <div className="container form-background">
                        <h2>Add Better</h2>
                        <form onSubmit={betterSubmit}>
                            <div className="form-group form-padding">
                                <label htmlFor="name">First Name</label>
                                <input type="text" className="form-control" id="firstName" placeholder="First Name"
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="form-group form-padding">
                                <label htmlFor="name">Last Name</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Last Name"
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="form-group form-padding">
                                <label htmlFor="betterAmount">$ Amount</label>
                                <input type="number" className="form-control" id="updateAmount" value={BetterAmount} onChange={(e) => setBetterAmount(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Betters;