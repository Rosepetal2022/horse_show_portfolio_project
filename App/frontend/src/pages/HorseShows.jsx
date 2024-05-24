import { horseShows_data } from '../utils/sampleData';
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

function HorseShows() {
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
                {horseShows_data.map((horseShow, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{horseShow.name}</td>
                        <td>{horseShow.date}</td>
                        <td>{horseShow.location}</td>
                        <td>{horseShow.moneyOffered}</td>
                        <td>{horseShow.horsesEntered}</td>
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