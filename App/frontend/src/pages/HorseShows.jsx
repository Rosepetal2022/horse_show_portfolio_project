import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from 'react';


function HorseShows() {
        // useState hook to initialize the diagnosticData state variable to store the fetched data
        const [horseShowsData, setHorseShowData] = useState([]);
  
        // Define a function to fetch diagnostic data from the API
        const fetchHorseData = async () => {
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
      
        // useEffect hook to trigger the fetchDiagnosticData function when the component mounts
        useEffect(() => {
          fetchHorseData();
        }, []);

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
                    <th scope="col">Edit</th>
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
      <h2>Add Horse Show</h2>
      <form>
        <div className="form-group form-padding">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Name" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="date">Date</label>
          <input type="date" className="form-control" id="date" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="discipline">Location</label>
          <input type="text" className="form-control" id="discipline" defaultValue="City, State" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="prizeMoney">Prize Money Offered</label>
          <input type="text" className="form-control" id="prizeMoney" defaultValue="Prize Money Offered" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="prizeMoney">Number of Horses</label>
          <input type="number" className="form-control" id="prizeMoney" defaultValue="0" />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
    </div>
    </div>
    </>
    );
};

export default HorseShows;