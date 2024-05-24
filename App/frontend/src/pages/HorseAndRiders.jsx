import { horseAndRider_data } from '../utils/sampleData';



function HorseAndRiders() {
    return (
        <>
        <h2>Horses and Riders</h2>
        <div className="table-padding">
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Horse</th>
                        <th scope="col">Rider</th>
                    </tr>
                </thead>
                <tbody>
                    {horseAndRider_data.map((horseAndRider, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{horseAndRider.horse}</td>
                            <td>{horseAndRider.RfirstName} {horseAndRider.RlastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="d-flex justify-content-between">
        <div className="form-size">
            <div className="container form-background">
                <h2>Add Horse And Rider</h2>
                <form>
                    <div className="form-group form-padding">
                        <label htmlFor="name">First Name</label>
                        <input type="text" className="form-control" id="firstName" defaultValue="First Name" />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="name">Last Name</label>
                        <input type="text" className="form-control" id="lastName" defaultValue="Last Name" />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="name">Horse</label>
                        <input type="text" className="form-control" id="horseName" defaultValue="Horse Name" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    </div>
        </>
    )
};

export default HorseAndRiders;