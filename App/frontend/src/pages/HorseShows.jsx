import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from 'react';


function HorseShows() {
        const [horseShowsData, setHorseShowData] = useState([]);
  
        // Fetch data functions
        const fetchHorseShowData = async () => {
          try {
            // Construct the URL for the API call
            const URL = import.meta.env.VITE_API_URL + 'horseShows';
            console.log(URL)
            // Use Axios to make the GET request
            const response = await axios.get(URL);
            console.log("data log from home", response)
            // Update state with the response data
            setHorseShowData(response.data);
          } catch (error) {
            // Handle any errors that occur during the fetch operation
            console.error('Error fetching diagnostic data:', error);
            alert('Error fetching diagnostic data from the server.');
          }
        };
      
        // useEffect hook to trigger fetching horse show data
        useEffect(() => {
          fetchHorseShowData();
        }, []);

    const [HorseShowID, setHorseShowID] = useState('')
    const [selectedHorseShow, setSelectedHorseShow] = useState(null);
    const [HorseShowName, setHorseShowName] = useState('')
    const [ShowDate, setShowDate] = useState('')
    const [Location, setLocation] = useState('')
    const [PrizeMoneyOffered, setPrizeMoneyOffered] = useState('')
    const [NumEnteredHorse, setNumEnteredHorse] = useState('')

    function horseShowSubmit(event){
        event.preventDefault();
         axios.post( import.meta.env.VITE_API_URL + 'horseShows', {HorseShowName, ShowDate, Location, PrizeMoneyOffered, NumEnteredHorse})
        .then(res => {
            console.log(res)
            window.location.reload()
        }).catch(err => console.log(err))
    }

    function horseShowUpdate(event, horseShowId) {
        event.preventDefault();
        console.log(horseShowId)

        
        // Gather form data
        const horseShowName = event.target.elements.horseShowName.value;
        const showDate = event.target.elements.showDate.value;
        const location = event.target.elements.location.value;
        const prizeMoneyOffered = event.target.elements.prizeMoneyOffered.value;
        const numEnteredHorse = event.target.elements.numEnteredHorse.value;
    
        // Make PUT request to update horseShow
        axios.put( import.meta.env.VITE_API_URL + `horseShows/${horseShowId}`, { HorseShowID: horseShowId, HorseShowName: horseShowName, ShowDate: showDate, Location: location, PrizeMoneyOffered: prizeMoneyOffered, NumEnteredHorse: numEnteredHorse })
            .then(res => {
                console.log(res);
                // Optionally, handle success (e.g., display a success message)
            })
            .catch(err => {
                console.error('Error updating horseShow:', err.response.data);
                // Optionally, handle error (e.g., display an error message)
            });
    }

    const horseShowDelete = async (HorseShowID) => {
        console.log(HorseShowID)
        try {
        const URL =  import.meta.env.VITE_API_URL + 'horseShows/' + HorseShowID;
        console.log(URL)
        const response = await axios.delete(URL);
          
          // Handle success
        if (response.status === 204) {
            alert("HorseShow deleted successfully");
            window.location.reload()
        }
        } catch (error) {
          console.error('Error deleting horseShow:', error);
          // Handle error
        }
      };

      const handleHorseShowSelect = (horseShowId) => {
        const selected = horseShowsData.find((horseShow) => horseShow.HorseShowID === parseInt(horseShowId));
        setSelectedHorseShow(selected);
        setHorseShowName(selected.HorseShowName);
        setShowDate(selected.ShowDate);
        setLocation(selected.Location);
        setPrizeMoneyOffered(selected.PrizeMoneyOffered);
        setNumEnteredHorse(selected.NumEnteredHorse)
    };

    return (
        <>
        <h2>View All Horse Shows</h2>
        <div className="table-padding">
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">Prize Money Offered</th>
                    <th scope="col"># of Horses Entered</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {horseShowsData.map((horseShow, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{horseShow.HorseShowName}</td>
                        <td>{horseShow.ShowDate}</td>
                        <td>{horseShow.Location}</td>
                        <td>{horseShow.PrizeMoneyOffered}</td>
                        <td>{horseShow.NumEnteredHorse}</td>
                        <td><button className="btn btn-danger btn-sm ml-1" onClick={e => horseShowDelete(horseShow.HorseShowID)}><FaDeleteLeft /></button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <div className="d-flex justify-content-between">
      <div className="form-size">
      <div className="container form-background">
      <h2>Add Horse Show</h2>
      <form onSubmit={horseShowSubmit}>
        <div className="form-group form-padding">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Name" 
          onChange={e => setHorseShowName(e.target.value)}
          />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="date">Date</label>
          <input type="date" className="form-control" id="date" 
          onChange={e => setShowDate(e.target.value)}
          />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="discipline">Location</label>
          <input type="text" className="form-control" id="discipline" defaultValue="City, State" 
          onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="prizeMoney">Prize Money Offered</label>
          <input type="number" className="form-control" id="prizeMoney" defaultValue="Prize Money Offered" 
          onChange={e => setPrizeMoneyOffered(e.target.value)}
          />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="prizeMoney">Number of Horses</label>
          <input type="number" className="form-control" id="prizeMoney" defaultValue="0" 
          onChange={e => setNumEnteredHorse(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
    </div>
    <div className="form-size">
        <div className="form-background container">
          <div className="form-group form-padding">
          <h2>Update Horse Show</h2>
                      <label htmlFor="horseShowSelect">Select HorseShow</label>
                      <select className="form-control" id="horseShowSelect" onChange={(e) => handleHorseShowSelect(e.target.value)}>
                          <option value="">Select a Horse Show</option>
                            {horseShowsData.map((horseShow) => (
                                <option key={horseShow.HorseShowID} value={horseShow.HorseShowID}>
                                    {`${horseShow.HorseShowName}`}
                                </option>
                            ))}
                        </select>
                    </div>
                {selectedHorseShow && (
                       <form onSubmit={(e) => horseShowUpdate(e, selectedHorseShow.HorseShowID)}>
                       {/* Hidden input field to store HorseShowID */}
                       <input type="hidden" value={selectedHorseShow.HorseShowID} />
                       <div className="form-group form-padding">
                    <label htmlFor="horseShowName">Name</label>
                    <input type="text" className="form-control" id="horseShowName" defaultValue="Name" 
                    value={HorseShowName}
                    onChange={e => setHorseShowName(e.target.value)}
                    />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="showDate">Date</label>
                  <input type="date" className="form-control" id="showDate" 
                  value={ShowDate}
                  onChange={e => setShowDate(e.target.value)}
                  />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="location">Location</label>
                  <input type="text" className="form-control" id="location" defaultValue="City, State" 
                  value={Location}
                  onChange={e => setLocation(e.target.value)}
                  />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="prizeMoneyOffered">Prize Money Offered</label>
                  <input type="number" className="form-control" id="prizeMoneyOffered" defaultValue="Prize Money Offered" 
                  value={PrizeMoneyOffered}
                  onChange={e => setPrizeMoneyOffered(e.target.value)}
                  />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="numEnteredHorse">Number of Horses</label>
                  <input type="number" className="form-control" id="numEnteredHorse" defaultValue="0" 
                  value={NumEnteredHorse}
                  onChange={e => setNumEnteredHorse(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    )}
              </div>
          </div>
    </div>
    </>
    );
};

export default HorseShows;
