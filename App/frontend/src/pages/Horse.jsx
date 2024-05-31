import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from 'react';

function Horse() {
  const [horseData, setHorseData] = useState([]);
  const [ownerData, setOwnerData] = useState([]); // State for owner data
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [ShowName, setShowName] = useState('');
  const [Breed, setBreed] = useState('');
  const [Age, setAge] = useState('');
  const [Discipline, setDiscipline] = useState('');
  const [PrizeMoneyWon, setPrizeMoneyWon] = useState('');
  const [OwnerID, setOwnerID] = useState(''); // State for selected owner ID

  const fetchHorseData = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + 'horses';
      console.log(URL);
      const response = await axios.get(URL);
      console.log("data log from home", response);
      setHorseData(response.data);
    } catch (error) {
      console.error('Error fetching horse data:', error);
      alert('Error fetching horse data from the server.');
    }
  };

  const fetchOwnerData = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + 'owners';
      console.log(URL);
      const response = await axios.get(URL);
      console.log("data log from home", response);
      setOwnerData(response.data);
    } catch (error) {
      console.error('Error fetching owner data:', error);
      alert('Error fetching owner data from the server.');
    }
  };

  useEffect(() => {
    fetchHorseData();
    fetchOwnerData();
  }, []);

  const horseSubmit = (event) => {
    event.preventDefault();
    axios.post(import.meta.env.VITE_API_URL + 'horses', { ShowName, Breed, Age, Discipline, PrizeMoneyWon, OwnerID })
      .then(res => {
        console.log(OwnerID)
        console.log(res);
        window.location.reload();
      }).catch(err => console.log(err));
  };

  const horseUpdate = (event, horseId) => {
    event.preventDefault();
    console.log(horseId);

    const showName = event.target.elements.showName.value;
    const breed = event.target.elements.breed.value;
    const age = event.target.elements.age.value;
    const discipline = event.target.elements.discipline.value;
    const prizeMoneyWon = event.target.elements.prizeMoney.value;
    const ownerID = event.target.elements.ownerID.value; // Capture owner ID

    axios.put(import.meta.env.VITE_API_URL + `horses/${horseId}`, { HorseID: horseId, ShowName: showName, Breed: breed, Age: age, Discipline: discipline, PrizeMoneyWon: prizeMoneyWon, OwnerID: ownerID })
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => {
        console.error('Error updating horse:', err);
      });
  };

  const horseDelete = async (HorseID) => {
    console.log(HorseID);
    try {
      const URL = import.meta.env.VITE_API_URL + 'horses/' + HorseID;
      console.log(URL);
      const response = await axios.delete(URL);

      if (response.status === 204) {
        alert("Horse deleted successfully");
        window.location.reload();
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        alert('Error deleting horse. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting horse:', error);
      alert('Error deleting horse. Please try again.');
    }
  };

  const handleHorseSelect = (horseId) => {
    const selected = horseData.find((horse) => horse.HorseID === parseInt(horseId));
    setSelectedHorse(selected);
    setShowName(selected.ShowName);
    setBreed(selected.Breed);
    setAge(selected.Age);
    setDiscipline(selected.Discipline);
    setPrizeMoneyWon(selected.PrizeMoneyWon);
    setOwnerID(selected.OwnerID); // Set the owner ID
  };



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
                <td><button className="btn btn-danger btn-sm ml-1" onClick={() => horseDelete(horse.HorseID)}><FaDeleteLeft /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between">
        <div className="form-size">
          <div className="container form-background">
            <h2>Add Horse</h2>
            <form onSubmit={horseSubmit}>
              <div className="form-group form-padding">
                <label htmlFor="showName">Name</label>
                <input type="text" className="form-control" id="showName" placeholder="Show Name" value={ShowName} onChange={e => setShowName(e.target.value)} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="breed">Breed</label>
                <input type="text" className="form-control" id="breed" placeholder="Breed" value={Breed} onChange={e => setBreed(e.target.value)} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="age">Age</label>
                <input type="number" className="form-control" id="age" placeholder="Age" value={Age} onChange={e => setAge(e.target.value)} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="discipline">Discipline</label>
                <input type="text" className="form-control" id="discipline" placeholder="Discipline" value={Discipline} onChange={e => setDiscipline(e.target.value)} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="prizeMoney">Prize Money</label>
                <input type="text" className="form-control" id="prizeMoney" placeholder="Prize Money" value={PrizeMoneyWon} onChange={e => setPrizeMoneyWon(e.target.value)} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="ownerID">Owner</label>
                <select className="form-control" id="ownerID" value={OwnerID} onChange={e => setOwnerID(e.target.value)}>
                  <option value="">Select Owner</option>
                  {ownerData.map((owner) => (
                    <option key={owner.OwnerID} value={owner.OwnerID}>
                      {owner.FirstName}
                      {owner.LastName}
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
            {/* Dropdown menu to select a horse */}
            <div className="form-group form-padding">
            <h2>Update Horse</h2>
              <label htmlFor="horseSelect">Select Horse</label>
              <select className="form-control" id="horseSelect" onChange={(e) => handleHorseSelect(e.target.value)}>
                <option value="">Select a horse</option>
                {horseData.map((horse) => (
                  <option key={horse.HorseID} value={horse.HorseID}>
                    {horse.ShowName}
                  </option>
                ))}
              </select>
            </div>
            {/* Form fields for editing selected horse */}
            {selectedHorse && (
              <form onSubmit={(e) => horseUpdate(e, selectedHorse.HorseID)}>
                {/* Hidden input field to store HorseID */}
                <input type="hidden" value={selectedHorse.HorseID} />
                <div className="form-group form-padding">
                  <label htmlFor="showName">Show Name</label>
                  <input type="text" className="form-control" id="showName" value={ShowName} onChange={(e) => setShowName(e.target.value)} />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="breed">Breed</label>
                  <input type="text" className="form-control" id="breed" value={Breed} onChange={(e) => setBreed(e.target.value)} />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="age">Age</label>
                  <input type="number" className="form-control" id="age" value={Age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="discipline">Discipline</label>
                  <input type="text" className="form-control" id="discipline" value={Discipline} onChange={(e) => setDiscipline(e.target.value)} />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="prizeMoney">Prize Money</label>
                  <input type="text" className="form-control" id="prizeMoney" value={PrizeMoneyWon} onChange={(e) => setPrizeMoneyWon(e.target.value)} />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="ownerID">Owner</label>
                  <select className="form-control" id="ownerID" value={OwnerID} onChange={(e) => setOwnerID(e.target.value)}>
                    <option value="">Select Owner</option>
                    {ownerData.map((owner) => (
                      <option key={owner.OwnerID} value={owner.OwnerID}>
                        {`${owner.FirstName} ${owner.LastName}`}
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
  );
}

export default Horse;