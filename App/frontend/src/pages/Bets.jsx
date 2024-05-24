import { bets_data } from '../utils/sampleData';


function Bets(){
    return (
        <>
        <h2>Bets Placed</h2>
        <div className="table-padding">
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Better</th>
                        <th scope="col">Horse Show</th>
                        <th scope="col">Horse</th>
                    </tr>
                </thead>
                <tbody>
                    {bets_data.map((bet, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{bet.firstName} {bet.lastName}</td>
                            <td>{bet.horseShow}</td>
                            <td>{bet.horse}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="d-flex justify-content-between">
        <div className="form-size">
            <div className="container form-background">
                <h2>Add Placed Bet</h2>
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
                        <label htmlFor="name">Horse Show</label>
                        <input type="text" className="form-control" id="horseShow" defaultValue="Horse Show" />
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

export default Bets;