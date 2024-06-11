import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { useEffect, useState } from 'react';


function Rider() {
    const [riderData, setRiderData] = useState([]);
  
        // Define a function to fetch horse data from API
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
      
        // useEffect hook to trigger the fetching horse data when component mounts
        useEffect(() => {
          fetchHorseData();
        }, []);

    const [RiderID, setRiderID] = useState('')
    const [selectedRider, setSelectedRider] = useState(null);
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Address, setAddress] = useState('')

    function riderSubmit(event){
        event.preventDefault();
         axios.post( import.meta.env.VITE_API_URL + 'riders', {FirstName, LastName, Email, Address})
        .then(res => {
            console.log(res)
            window.location.reload()
        }).catch(err => console.log(err))
    }

    function riderUpdate(event, riderId) {
        event.preventDefault();
        console.log(riderId)
        
        // Gather form data
        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const email = event.target.elements.email.value;
        const address = event.target.elements.address.value;
    
        // Make PUT request to update rider
        axios.put( import.meta.env.VITE_API_URL + `riders/${riderId}`, { RiderID: riderId, FirstName: firstName, LastName: lastName, Email: email, Address: address })
            .then(res => {
                console.log(res);
                // Optionally, handle success (e.g., display a success message)
            })
            .catch(err => {
                console.error('Error updating rider:', err);
                // Optionally, handle error (e.g., display an error message)
            });
    }

    const riderDelete = async (RiderID) => {
        console.log(RiderID)
        try {
        const URL =  import.meta.env.VITE_API_URL + 'riders/' + RiderID;
        console.log(URL)
        const response = await axios.delete(URL);
          
          // Handle success
        if (response.status === 204) {
            alert("Rider deleted successfully");
            window.location.reload()
        }
        } catch (error) {
          console.error('Error deleting rider:', error);
          // Handle error
        }
      };

      const handleRiderSelect = (riderId) => {
        const selected = riderData.find((rider) => rider.RiderID === parseInt(riderId));
        setSelectedRider(selected);
        setFirstName(selected.FirstName);
        setLastName(selected.LastName);
        setEmail(selected.Email);
        setAddress(selected.Address);
    };
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
                            <td><button className="btn btn-danger btn-sm ml-1" onClick={e => riderDelete(rider.RiderID)}><FaDeleteLeft /></button></td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="d-flex justify-content-between">
        <div className="form-size">
            <div className="container form-background">
                <h2>Add Rider</h2>
                <form onSubmit={riderSubmit}>
                    <div className="form-group form-padding">
                        <label htmlFor="name">First Name</label>
                        <input type="text" className="form-control" id="firstName" defaultValue="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="name">Last Name</label>
                        <input type="text" className="form-control" id="lastName" defaultValue="Last Name" 
                        onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="breed">Email</label>
                        <input type="email" className="form-control" id="email" defaultValue="me@me.com" 
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="age">Address</label>
                        <input type="text" className="form-control" id="address" defaultValue="Address" 
                        onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
        <div className="form-size">
            <div className="form-background container">
            <div className="form-group form-padding">
                <h2>Update Rider</h2>
                        <label htmlFor="riderSelect">Select Rider</label>
                        <select className="form-control" id="riderSelect" onChange={(e) => handleRiderSelect(e.target.value)}>
                            <option value="">Select a rider</option>
                            {riderData.map((rider) => (
                                <option key={rider.RiderID} value={rider.RiderID}>
                                    {`${rider.FirstName} ${rider.LastName}`}
                                </option>
                            ))}
                        </select>
                    </div>
                {selectedRider && (
                       <form onSubmit={(e) => riderUpdate(e, selectedRider.RiderID)}>
                       {/* Hidden input field to store RiderID */}
                       <input type="hidden" value={selectedRider.RiderID} />
                            <div className="form-group form-padding">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" id="firstName" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="form-group form-padding">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" id="lastName" value={LastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="form-group form-padding">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group form-padding">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" value={Address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </form>
                    )}
            </div>
        </div>
    </div>
        </>
    );
};

export default Rider;
