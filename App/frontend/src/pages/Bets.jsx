import { bets_data } from '../utils/sampleData';
import axios from "axios"
import { useEffect, useState } from 'react';

function Bets(){
          // useState hook to initialize the diagnosticData state variable to store the fetched data
          const [betData, setBetData] = useState([]);

          // Define a function to fetch diagnostic data from the API
          const fetchHorseData = async () => {
            try {
              // Construct the URL for the API call
              const URL = import.meta.env.VITE_API_URL + 'bets';
              console.log(URL)
              // Use Axios to make the GET request
              const response = await axios.get(URL);
              console.log("data log from home", response)
              // Update state with the response data
              setBetData(response.data);
            } catch (error) {
              // Handle any errors that occur during the fetch operation
              console.error('Error fetching diagnostic data:', error);
              alert('Error fetching diagnostic data from the server.');
            }
          };
        
          // useEffect hook to trigger the fetchDiagnosticData function when the component mounts
          useEffect(() => {
            fetchHorseData();
          }, []);

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="d-flex justify-content-between">
        <div className="form-size">
            <div className="container form-background">
                <h2>Add Placed Bet</h2>
                <form>
                    <div className="form-group form-padding">
                        <label htmlFor="name">First Name</label>
                        <input type="text" className="form-control" id="firstName" defaultValue="First Name" />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="name">Last Name</label>
                        <input type="text" className="form-control" id="lastName" defaultValue="Last Name" />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="name">Horse Show</label>
                        <input type="text" className="form-control" id="horseShow" defaultValue="Horse Show" />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="name">Horse</label>
                        <input type="text" className="form-control" id="horseName" defaultValue="Horse Name" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    </div>
        </>
    )
};

export default Bets;