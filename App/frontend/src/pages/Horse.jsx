import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from 'react';

function Horse() {
  const [horseData, setHorseData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [selectedHorse, setSelectedHorse] = useState(null);

  // State for the add form
  const [addShowName, setAddShowName] = useState('');
  const [addBreed, setAddBreed] = useState('');
  const [addAge, setAddAge] = useState('');
  const [addDiscipline, setAddDiscipline] = useState('');
  const [addPrizeMoneyWon, setAddPrizeMoneyWon] = useState('');
  const [addOwnerID, setAddOwnerID] = useState('');

  // State for the update form
  const [updateShowName, setUpdateShowName] = useState('');
  const [updateBreed, setUpdateBreed] = useState('');
  const [updateAge, setUpdateAge] = useState('');
  const [updateDiscipline, setUpdateDiscipline] = useState('');
  const [updatePrizeMoneyWon, setUpdatePrizeMoneyWon] = useState('');
  const [updateOwnerID, setUpdateOwnerID] = useState('');

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

  const fetchOwnerData = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + 'owners';
      const response = await axios.get(URL);
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
    axios.post(import.meta.env.VITE_API_URL + 'horses', {
      ShowName: addShowName,
      Breed: addBreed,
      Age: addAge,
      Discipline: addDiscipline,
      PrizeMoneyWon: addPrizeMoneyWon,
      OwnerID: addOwnerID
    })
    .then(res => {
      console.log(res);
      fetchHorseData(); // Fetch updated horse data
      // Reset add form state
      setAddShowName('');
      setAddBreed('');
      setAddAge('');
      setAddDiscipline('');
      setAddPrizeMoneyWon('');
      setAddOwnerID('');
    }).catch(err => console.log(err));
  };

  const horseUpdate = (event) => {
    event.preventDefault();
    axios.put(import.meta.env.VITE_API_URL + `horses/${selectedHorse.HorseID}`, {
      HorseID: selectedHorse.HorseID,
      ShowName: updateShowName,
      Breed: updateBreed,
      Age: updateAge,
      Discipline: updateDiscipline,
      PrizeMoneyWon: updatePrizeMoneyWon,
      OwnerID: updateOwnerID
    })
    .then(res => {
      console.log(res);
      fetchHorseData(); // Fetch updated horse data
      // Reset update form state
      setSelectedHorse(null);
      setUpdateShowName('');
      setUpdateBreed('');
      setUpdateAge('');
      setUpdateDiscipline('');
      setUpdatePrizeMoneyWon('');
      setUpdateOwnerID('');
    })
    .catch(err => {
      console.error('Error updating horse:', err);
    });
  };

  const horseDelete = async (HorseID) => {
    try {
      const URL = import.meta.env.VITE_API_URL + 'horses/' + HorseID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Horse deleted successfully");
        fetchHorseData(); // Fetch updated horse data
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
    setUpdateShowName(selected.ShowName);
    setUpdateBreed(selected.Breed);
    setUpdateAge(selected.Age);
    setUpdateDiscipline(selected.Discipline);
    setUpdatePrizeMoneyWon(selected.PrizeMoneyWon);
    setUpdateOwnerID(selected.OwnerID);
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
                <label htmlFor="addShowName">Name</label>
                <input type="text" className="form-control" id="addShowName" placeholder="Show Name" value={addShowName} onChange={e => setAddShowName(e.target.value)} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="addBreed">Breed</label>
                <input type="text" className="form-control" id="addBreed" placeholder="Breed" value={addBreed} onChange={e => setAddBreed(e.target.value)} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="addAge">Age</label>
                <input type="number" className="form-control" id="addAge" placeholder="Age" value={addAge} onChange={e => setAddAge(e.target.value)} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="addDiscipline">Discipline</label>
                <input type="text" className="form-control" id="addDiscipline" placeholder="Discipline" value={addDiscipline} onChange={e => setAddDiscipline(e.target.value)} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="addPrizeMoney">Prize Money</label>
                <input type="text" className="form-control" id="addPrizeMoney" placeholder="Prize Money" value={addPrizeMoneyWon} onChange={e => setAddPrizeMoneyWon(e.target.value)} />
              </div>
              <div className="form-group form-padding">
                <label htmlFor="addOwnerID">Owner</label>
                <select className="form-control" id="addOwnerID" value={addOwnerID} onChange={e => setAddOwnerID(e.target.value)}>
                  <option value="">Select Owner</option>
                  {ownerData.map((owner) => (
                    <option key={owner.OwnerID} value={owner.OwnerID}>
                      {`${owner.FirstName} ${owner.LastName}`}
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
              <form onSubmit={horseUpdate}>
                <input type="hidden" value={selectedHorse.HorseID} />
                <div className="form-group form-padding">
                  <label htmlFor="updateShowName">Show Name</label>
                  <input type="text" className="form-control" id="updateShowName" value={updateShowName} onChange={(e) => setUpdateShowName(e.target.value)} />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="updateBreed">Breed</label>
                  <input type="text" className="form-control" id="updateBreed" value={updateBreed} onChange={(e) => setUpdateBreed(e.target.value)} />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="updateAge">Age</label>
                  <input type="number" className="form-control" id="updateAge" value={updateAge} onChange={(e) => setUpdateAge(e.target.value)} />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="updateDiscipline">Discipline</label>
                  <input type="text" className="form-control" id="updateDiscipline" value={updateDiscipline} onChange={(e) => setUpdateDiscipline(e.target.value)} />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="updatePrizeMoney">Prize Money</label>
                  <input type="text" className="form-control" id="updatePrizeMoney" value={updatePrizeMoneyWon} onChange={(e) => setUpdatePrizeMoneyWon(e.target.value)} />
                </div>
                <div className="form-group form-padding">
                  <label htmlFor="updateOwnerID">Owner</label>
                  <select className="form-control" id="updateOwnerID" value={updateOwnerID} onChange={(e) => setUpdateOwnerID(e.target.value)}>
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