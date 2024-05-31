import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from 'react';


function UpdateHorse() {
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

            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateHorse;