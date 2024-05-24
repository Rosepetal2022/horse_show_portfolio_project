// import { owner_data } from '../utils/sampleData';
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios"
import { useEffect, useState } from 'react';



function Owner() {
    const [owner, setOwner] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8082/Owners')
        .then(res => setOwner(res.data))
        .catch(err => console.log(err))
    })
    
    const [OwnerID, setOwnerID] = useState('')
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Address, setAddress] = useState('')

    function ownerSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8082/Create', {FirstName, LastName, Email, Address})
        .then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    function ownerUpdate(event){
        event.preventDefault();
        axios.put('http://localhost:8082/Update/' + OwnerID, {OwnerID, FirstName, LastName, Email, Address})
        .then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    const ownerDelete = async (id) => {
        try {
            await axios.delete('http://localhost:8082/Owners/' + id)
            window.location.reload()
        }
        catch(err){
            console.log(err);
        }
    }

    return (
    <>
    <h2>View/Edit/Delete Owners</h2>
    <div className="table-padding">
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {owner.map((data, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.FirstName}</td>
                        <td>{data.LastName}</td>
                        <td>{data.Email}</td>
                        <td>{data.Address}</td>
                        <td><button className="btn btn-danger btn-sm ml-1" onClick={e => ownerDelete(data.OwnerID)}><FaDeleteLeft /></button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <div className="d-flex justify-content-between">
        <div className="form-size">
            <div className="container form-background">
                <h2>Add Owner</h2>
                <form onSubmit={ownerSubmit}>
                    <div className="form-group form-padding">
                        <label htmlFor="name">First Name</label>
                        <input type="text" className="form-control" id="firstName" defaultValue="First Name" 
                        onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="name">Last Name</label>
                        <input type="text" className="form-control" id="lastName" defaultValue="Last Name" 
                        onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="breed">Email</label>
                        <input type="email" className="form-control" id="email" defaultValue="me@me.com" 
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="age">Address</label>
                        <input type="text" className="form-control" id="address" defaultValue="Address"
                        onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
        <div className="form-size">
            <div className="form-background container">
                <h2>Edit Owner</h2>
                <form onSubmit={ownerUpdate}>
                    <div className="form-group form-padding">
                        <label htmlFor="name">OwnerID</label>
                        <input type="number" className="form-control" id="OwnerID" defaultValue="0" 
                        onChange={e => setOwnerID(e.target.value)}
                        />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="name">First Name</label>
                        <input type="text" className="form-control" id="firstName" defaultValue="First Name" 
                        onChange={e => setFirstName(e.target.value)} 
                        />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="breed">Last Name</label>
                        <input type="text" className="form-control" id="lastName" defaultValue="Last Name" 
                        onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="age">Email</label>
                        <input type="email" className="form-control" id="email" defaultValue="me@me.com" 
                        onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="form-group form-padding">
                        <label htmlFor="discipline">Address</label>
                        <input type="text" className="form-control" id="address" defaultValue="Address" 
                        onChange={e => setAddress(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Save changes</button>
                </form>
            </div>
        </div>
    </div>
    </>
    );
};

export default Owner;
