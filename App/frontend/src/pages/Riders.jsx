import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { useEffect, useState } from 'react';


function Rider() {
    const [riderData, setRiderData] = useState([]);
  
        // Define a function to fetch diagnostic data from the API
        const fetchHorseData = async () => {
          try {
            // Construct the URL for the API call
            const URL = import.meta.env.VITE_API_URL + 'riders';
            console.log(URL)
            // Use Axios to make the GET request
            const response = await axios.get(URL);
            console.log("data log from home", response)
            // Update state with the response data
            setRiderData(response.data);
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
        <h2>Add/Edit/Delete Riders</h2>
        <div className="table-padding">
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {riderData.map((rider, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{rider.FirstName}</td>
                            <td>{rider.LastName}</td>
                            <td>{rider.Email}</td>
                            <td>{rider.Address}</td>
                            <td><button className="btn btn-danger btn-sm ml-1"><FaDeleteLeft /></button></td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="d-flex justify-content-between">
        <div className="form-size">
            <div className="container form-background">
                <h2>Add Rider</h2>
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
                        <label htmlFor="breed">Email</label>
                        <input type="email" className="form-control" id="email" defaultValue="me@me.com" />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="age">Address</label>
                        <input type="text" className="form-control" id="address" defaultValue="Address" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
        <div className="form-size">
            <div className="form-background container">
                <h2>Edit Rider</h2>
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
                        <label htmlFor="age">Email</label>
                        <input type="email" className="form-control" id="email" defaultValue="me@me.com" />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="discipline">Address</label>
                        <input type="text" className="form-control" id="address" defaultValue="Address" />
                    </div>
                    <button type="submit" className="btn btn-primary">Save changes</button>
                </form>
            </div>
        </div>
    </div>
        </>
    );
};

export default Rider;