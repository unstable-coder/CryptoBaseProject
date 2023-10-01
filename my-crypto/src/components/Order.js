import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const Order = () => {
    const params = useParams();
    const [name, setName] = useState(params.id);  // Set name to params.id
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const navigate = useNavigate();
console.log("this is check", params)
    const addData = async () => {
        let UserId = JSON.parse(localStorage.getItem('cryptouser'))._id;
        console.log(UserId)
        let result = await fetch('http://127.0.0.1:5000/add-crypto', {
            method: 'post',
            body: JSON.stringify({ name, quantity, price, UserId }),
            headers: { "Content-Type": "application/json" }
        });
        result = await result.json();
        navigate('/mywallet');
    };
    

    return (
        <div className="register">
            <h1>ADD PRODUCTS</h1>
            <p>Please fill in this form to create an account.</p>
            <div>
                <input className="inputbox" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" /><br />
                <input className="inputbox" type="text" value={name} readOnly placeholder={params.id} /><br />
                <input className="inputbox" type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" /><br />
                <button className="btn btn-primary" onClick={addData}>Add crypto</button>
            </div>
        </div>
    );
};

export default Order;
