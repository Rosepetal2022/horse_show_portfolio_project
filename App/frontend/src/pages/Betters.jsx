import { betters_data } from '../utils/sampleData';
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { useEffect, useState } from 'react';

function Betters() {
          // useState hook to initialize the diagnosticData state variable to store the fetched data
          const [betterData, setBetterData] = useState([]);

          // Define a function to fetch diagnostic data from the API
          const fetchHorseData = async () => {
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
            fetchHorseData();
          }, []);

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
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {betterData.map((better, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{better.BetterAmount}</td>
                            <td>{better.FirstName}</td>
                            <td>{better.LastName}</td>
                            <td><button className="btn btn-primary btn-sm" ><FaEdit /></button></td>
                            <td><button className="btn btn-danger btn-sm ml-1"><FaDeleteLeft /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="d-flex justify-content-between">
            <div className="form-size">
                <div className="container form-background">
                    <h2>Add Better</h2>
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
                            <label htmlFor="breed">Amount</label>
                            <input type="number" className="form-control" id="amount" />
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
            <div className="form-size">
                <div className="form-background container">
                    <h2>Update Better</h2>
                    <form>
                        <div className="form-group form-padding">
                            <label htmlFor="name">First Name</label>
                            <input type="text" className="form-control" id="firstName" defaultValue="First Name" />
                        </div>
                        <div className="form-group form-padding">
                            <label htmlFor="breed">Last Name</label>
                            <input type="text" className="form-control" id="lastName" defaultValue="Last Name" />
                        </div>
                        <div className="form-group form-padding">
                            <label htmlFor="age">Amount</label>
                            <input type="number" className="form-control" id="amount"  />
                        </div>
                        <button type="submit" className="btn btn-primary">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default Betters;