import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { useEffect, useState } from 'react';


function HorseAndRiders() {
        // useState hook to initialize the diagnosticData state variable to store the fetched data
        const [horseAndRiderData, setHorseAndRiderData] = useState([]);
        const [horseData, setHorseData] = useState([]);
        const [riderData, setRiderData] = useState([]);
        const [selectedHorseAndRider, setSelectedHorseAndRider] = useState(null)
  
        const [addHorseID, setAddHorseID] = useState('');
        const [addRiderID, setAddRiderID] = useState('');

        const [updateHorseID, setUpdateHorseID] = useState('');
        const [updateRiderID, setUpdateRiderID] = useState('');

        // Define a function to fetch diagnostic data from the API
        const fetchHorseAndRiderData = async () => {
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

          const fetchRiderData = async () => {
            try {
              const URL = import.meta.env.VITE_API_URL + 'riders';
              const response = await axios.get(URL);
              setRiderData(response.data);
            } catch (error) {
              console.error('Error fetching rider data:', error);
              alert('Error fetching rider data from the server.');
            }
          };
      
        // useEffect hook to trigger the fetchDiagnosticData function when the component mounts
        useEffect(() => {
          fetchHorseAndRiderData();
          fetchHorseData();
          fetchRiderData();
        }, []);
      
        const horseAndRiderDelete = async (HAndRID) => {
            try {
              const URL = import.meta.env.VITE_API_URL + 'horseAndRiders/' + HAndRID;
              const response = await axios.delete(URL);
              if (response.status === 204) {
                alert("Horse and Rider deleted successfully");
                fetchHorseAndRiderData(); // Fetch updated horse data
              } else {
                console.error(`Unexpected response status: ${response.status}`);
                alert('Error deleting horseAndRider. Please try again.');
              }
            } catch (error) {
              console.error('Error deleting horse:', error);
              alert('Error deleting horseAndRider. Please try again.');
            }
          };

          const HAndRSubmit = (event) => {
            event.preventDefault();
            axios.post(import.meta.env.VITE_API_URL + "horseAndRiders", {
              RiderID: addRiderID,
              HorseID: addHorseID
            })
            .then(res => {
              console.log(res);
              fetchHorseAndRiderData();
            }).catch(err => console.log(err))
          };

          const HAndRUpdate = (event) => {
            event.preventDefault();
            axios.put(import.meta.env.VITE_API_URL + `horseAndRiders/${selectedHorseAndRider.HAndRID}`, {
              HAndRID: selectedHorseAndRider.HAndRID,
              RiderID: updateRiderID,
              HorseID: updateHorseID
            })
            .then(res => {
              console.log(res);
              fetchHorseAndRiderData();
            })
          }

          const handleHAndRSelect = (HAndRID) => {
            const selected = horseAndRiderData.find((horseAndRiders) => horseAndRiders.HAndRID === parseInt(HAndRID));
            setSelectedHorseAndRider(selected);
            setUpdateRiderID(selected.RiderID)
            setUpdateHorseID(selected.HorseID)
          }

    return (
        <>
        <h2>Horses and Riders</h2>
        <div className="table-padding">
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">HorseAndRiderID</th>
                        <th scope="col">Horse Name</th>
                        <th scope="col">Rider Name</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {horseAndRiderData.map((horseAndRider, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{horseAndRider.HAndRID}</td>
                            <td>{horseAndRider.HorseName}</td>
                            <td>{horseAndRider.RiderName}</td>
                            <td><button className="btn btn-danger btn-sm ml-1" onClick={() => horseAndRiderDelete(horseAndRider.HAndRID)}><FaDeleteLeft /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="d-flex justify-content-between">
        <div className="form-size">
            <div className="container form-background">
                <h2>Add Horse And Rider</h2>
                <form onSubmit={HAndRSubmit}>
                <div className="form-group form-padding">
                <label htmlFor="addOwnerID">Owner</label>
                <select className="form-control" id="addOwnerID" value={addHorseID} onChange={e => setAddHorseID(e.target.value)}>
                  <option value="">Select Owner</option>
                  {horseData.map((horse) => (
                    <option key={horse.HorseID} value={horse.HorseID}>
                      {`${horse.ShowName}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group form-padding">
                <label htmlFor="addOwnerID">Rider</label>
                <select className="form-control" id="addRiderID" value={addRiderID} onChange={e => setAddRiderID(e.target.value)}>
                  <option value="">Select Owner</option>
                  {riderData.map((rider) => (
                    <option key={rider.RiderID} value={rider.RiderID}>
                      {`${rider.FirstName} ${rider.LastName}` }
                    </option>
                  ))}
                </select>
              </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
        <div className="form-size">
          <div className="form-background container">
            <div className="App">
              <h2>Update Horse</h2>
              <label htmlFor="horseSelect">Select Horse And Rider</label>
              <select className="form-control" id="horseSelect" onChange={(e) => handleHAndRSelect(e.target.value)}>
                <option value="">Select a HAndRID</option>
                {horseAndRiderData.map((horseAndRider) => (
                  <option key={horseAndRider.HAndRID} value={horseAndRider.HAndRID}>
                    {horseAndRider.HAndRID}
                  </option>
                ))}
              </select>
            </div>
            {/* Form fields for editing selected horse */}
            {selectedHorseAndRider && (
              <form onSubmit={HAndRUpdate}>
                <input type="hidden" value={selectedHorseAndRider.HAndRID} />
                <div className="form-group form-padding">
                  <label htmlFor="updateHorseID">Horse</label>
                  <select className="form-control" id="updateHorseID" value={updateHorseID} onChange={(e) => setUpdateHorseID(e.target.value)}>
                    <option value="">Select Horse</option>
                    {horseData.map((horse) => (
                      <option key={horse.HorseID} value={horse.HorseID}>
                        {`${horse.ShowName}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="updateOwnerID">Rider</label>
                  <select className="form-control" id="updateRiderID" value={updateRiderID} onChange={(e) => setUpdateRiderID(e.target.value)}>
                    <option value="">Select Rider</option>
                    {riderData.map((rider) => (
                      <option key={rider.RiderID} value={rider.RiderID}>
                        {`${rider.FirstName} ${rider.LastName}`}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </form>
            )}
          </div>
        </div>
    </div>
        </>
    )
};

export default HorseAndRiders;
