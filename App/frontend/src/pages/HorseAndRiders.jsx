import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { useEffect, useState } from 'react';


function HorseAndRiders() {
        // useState hook to initialize the diagnosticData state variable to store the fetched data
        const [horseAndRiderData, setHorseAndRiderData] = useState([]);
  
        // Define a function to fetch diagnostic data from the API
        const fetchHorseData = async () => {
          try {
            // Construct the URL for the API call
            const URL = import.meta.env.VITE_API_URL + 'horseAndRiders';
            console.log(URL)
            // Use Axios to make the GET request
            const response = await axios.get(URL);
            console.log("data log from home", response)
            // Update state with the response data
            setHorseAndRiderData(response.data);
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
        <h2>Horses and Riders</h2>
        <div className="table-padding">
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">HorseAndRiderID</th>
                        <th scope="col">RiderID</th>
                    </tr>
                </thead>
                <tbody>
                    {horseAndRiderData.map((horseAndRider, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{horseAndRider.HAndRID}</td>
                            <td>{horseAndRider.RiderID} {horseAndRider.RlastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="d-flex justify-content-between">
        <div className="form-size">
            <div className="container form-background">
                <h2>Add Horse And Rider</h2>
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

export default HorseAndRiders;