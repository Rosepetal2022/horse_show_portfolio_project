// import { owner_data } from '../utils/sampleData';
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { useEffect, useState } from 'react';



function Owner() {
     // useState hook to initialize the diagnosticData state variable to store the fetched data
     const [ownerData, setOwnerData] = useState([]);

     // Define a function to fetch diagnostic data from the API
     const fetchOwnerData = async () => {
       try {
         // Construct the URL for the API call
         const URL = import.meta.env.VITE_API_URL + 'owners';
         console.log(URL)
         // Use Axios to make the GET request
         const response = await axios.get(URL);
         console.log("data log from home", response)
         // Update state with the response data
         setOwnerData(response.data);
       } catch (error) {
         // Handle any errors that occur during the fetch operation
         console.error('Error fetching diagnostic data:', error);
         alert('Error fetching diagnostic data from the server.');
       }
     };
   
     // useEffect hook to trigger the fetchDiagnosticData function when the component mounts
     useEffect(() => {
       fetchOwnerData();
     }, []);
    
    const [OwnerID, setOwnerID] = useState('')
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Address, setAddress] = useState('')

    function ownerSubmit(event){
        event.preventDefault();
        axios.post(import.meta.env.VITE_API_URL + 'owners', {FirstName, LastName, Email, Address})
        .then(res => {
            console.log(res)
            window.location.reload()
        }).catch(err => console.log(err))
    }

    function ownerUpdate(event, ownerId) {
        event.preventDefault();
        
        // Gather form data
        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const email = event.target.elements.email.value;
        const address = event.target.elements.address.value;
    
        // Make PUT request to update owner
        axios.put(`http://classwork.engr.oregonstate.edu:3788/owners/${ownerId}`, { OwnerID: ownerId, FirstName: firstName, LastName: lastName, Email: email, Address: address })
            .then(res => {
                console.log(res);
                // Optionally, handle success (e.g., display a success message)
            })
            .catch(err => {
                console.error('Error updating owner:', err);
                // Optionally, handle error (e.g., display an error message)
            });
    }

    const ownerDelete = async (ownerId) => {
        try {
          const response = await axios.delete(`http://classwork.engr.oregonstate.edu:3788/owners/${ownerId}`);
          console.log('Owner deleted successfully');
          window.location.reload()
          // Handle success
        } catch (error) {
          console.error('Error deleting owner:', error);
          // Handle error
        }
      };

      const handleOwnerSelect = (ownerId) => {
        const selected = ownerData.find((owner) => owner.OwnerID === parseInt(ownerId));
        setSelectedOwner(selected);
        setFirstName(selected.FirstName);
        setLastName(selected.LastName);
        setEmail(selected.Email);
        setAddress(selected.Address);
    };
    return (
    <>
    <h2>View/Edit/Delete Owners</h2>
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
                {ownerData.map((data, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.FirstName}</td>
                        <td>{data.LastName}</td>
                        <td>{data.Email}</td>
                        <td>{data.Address}</td>
                        <td><button className="btn btn-danger btn-sm ml-1" onClick={e => ownerDelete(data.OwnerID)}><FaDeleteLeft /></button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <div className="d-flex justify-content-between">
        <div className="form-size">
            <div className="container form-background">
                <h2>Add Owner</h2>
                <form onSubmit={ownerSubmit}>
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
                        <label htmlFor="breed">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="me@me.com" 
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="age">Address</label>
                        <input type="text" className="form-control" id="address" placeholder="Address"
                        onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
        <div className="form-size">
                <div className="form-background container">
                    {/* Dropdown menu to select an owner */}
                    <div className="form-group form-padding">
                        <label htmlFor="ownerSelect">Select Owner</label>
                        <select className="form-control" id="ownerSelect" onChange={(e) => handleOwnerSelect(e.target.value)}>
                            <option value="">Select an owner</option>
                            {ownerData.map((owner) => (
                                <option key={owner.OwnerID} value={owner.OwnerID}>
                                    {`${owner.FirstName} ${owner.LastName}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Form fields for editing selected owner */}
                    {selectedOwner && (
                       <form onSubmit={(e) => ownerUpdate(e, selectedOwner.OwnerID)}>
                       {/* Hidden input field to store OwnerID */}
                       <input type="hidden" value={selectedOwner.OwnerID} />
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

export default Owner;
