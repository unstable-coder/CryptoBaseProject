import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate} from 'react-router-dom';
const Update =()=>{
const [name, setName] = useState()
const [price, setPrice] = useState()
const [category, setCategory] = useState()
const [company, setCompany] = useState()
const params = useParams();
const navigate = useNavigate()
useEffect(()=>{
    getproductdetail();
},[])
const getproductdetail = async ()=>{
    let result = await fetch(`http://127.0.0.1:5000/mywallet/${params.id}`)
    result = await result.json();
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)
}
 const UpdateData = async ()=>{  
   let result = await fetch(`http://127.0.0.1:5000/mywallet/${params.id}`,{
    method:'put',
    body:JSON.stringify({name,price,category,company}),
    headers: {'Content-Type':'application/json'}
   })
   result = await result.json();
   navigate('/')
   
 }
    return (
        <div className="register">
        <h1>Update PRODUCTS</h1>
        <div>
            <input className="inputbox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" ></input><br></br>
            <input className="inputbox" type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price" ></input><br></br>
            <input className="inputbox" type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Category" ></input><br></br>
            <input className="inputbox" type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Compnay" ></input><br></br>
            <button className="btn btn-primary" onClick={UpdateData}>Update product</button>
        </div>
        </div>
    )
}
export default Update