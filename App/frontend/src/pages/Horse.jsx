// import { horse_data } from '../utils/sampleData';

import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { useEffect, useState } from 'react';



function Horse() {
      // useState hook to initialize the diagnosticData state variable to store the fetched data
      const [horseData, setHorseData] = useState([]);

      // Define a function to fetch diagnostic data from the API
      const fetchHorseData = async () => {
        try {
          // Construct the URL for the API call
          const URL = import.meta.env.VITE_API_URL + 'horses';
          console.log(URL)
          // Use Axios to make the GET request
          const response = await axios.get(URL);
          console.log("data log from home", response)
          // Update state with the response data
          setHorseData(response.data);
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
    <h2>Add/Edit/Delete Horses</h2>
      <div className="table-padding">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">ID #</th>
              <th scope="col">Name</th>
              <th scope="col">Breed</th>
              <th scope="col">Age</th>
              <th scope="col">Discipline</th>
              <th scope="col">Prize Money</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {horseData.map((horse, index) => (
              <tr key={index}>
                <th scope="row">{horse.HorseID}</th>
                <td>{horse.ShowName}</td>
                <td>{horse.Breed}</td>
                <td>{horse.Age}</td>
                <td>{horse.Discipline}</td>
                <td>{horse.PrizeMoneyWon}</td>
                <td><button className="btn btn-danger btn-sm ml-1"><FaDeleteLeft /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between">
      <div className="form-size">
      <div className="container form-background">
      <h2>Add Horse</h2>
      <form>
        <div className="form-group form-padding">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Show Name" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="breed">Breed</label>
          <input type="text" className="form-control" id="breed" defaultValue="Breed" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="age">Age</label>
          <input type="number" className="form-control" id="age" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="discipline">Discipline</label>
          <input type="text" className="form-control" id="discipline" defaultValue="Discipline" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="prizeMoney">Prize Money</label>
          <input type="text" className="form-control" id="prizeMoney" defaultValue="Prize Money" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="name">Owner First Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Owner First Name" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="name">Owner Last Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Owner Last Name" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="name">Rider First Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Rider First Name" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="name">Rider Last Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Rider Last Name" />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
    </div>
    <div className="form-size">
      <div className="form-background container">
      <h2>Edit Horse</h2>
      <form>
        <div className="form-group form-padding">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Show Name" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="breed">Breed</label>
          <input type="text" className="form-control" id="breed" defaultValue="Breed" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="age">Age</label>
          <input type="number" className="form-control" id="age" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="discipline">Discipline</label>
          <input type="text" className="form-control" id="discipline" defaultValue="Discipline" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="prizeMoney">Prize Money</label>
          <input type="text" className="form-control" id="prizeMoney" defaultValue="Prize Money" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="name">Owner First Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Owner First Name" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="name">Owner Last Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Owner Last Name" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="name">Rider First Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Rider First Name" />
        </div>
        <div className="form-group form-padding">
          <label htmlFor="name">Rider Last Name</label>
          <input type="text" className="form-control" id="name" defaultValue="Rider Last Name" />
        </div>
        <button type="submit" className="btn btn-primary">Save changes</button>
      </form>
    </div>
    </div>
    </div>
    </>
  );
}

export default Horse;