import React from "react";
import { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { cryptoList } from '../redux/CryptoAction'
const Buying = ()=>{
    const params= useParams()
    const result = useSelector((state) => state.cryptoData)
     const dispatch = useDispatch()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(0)
  const [price, setPrice] = useState(0)
  const [name, setName] = useState(params.id);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(cryptoList());
  }, []);
 
  let item = result.filter(coin => coin.id === params.id)
 
  const addData = async () => {
    setPrice(total)
    if(quantity!=null && quantity!=0){
    let UserId = JSON.parse(localStorage.getItem('cryptouser'))._id;
    let result = await fetch(`http://127.0.0.1:5000/add-crypto/${params.id}`, {
      method: 'post',
      body: JSON.stringify({ name, quantity, price, UserId }),
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
        "Content-Type": "application/json"
      }
    });
    result = await result.json();
    navigate('/mywallet');
  }
   else{alert("enter Quanity")
  }
  };
 
  useEffect(() => {
    const calculateTotal = () => {
       let{ current_price}=item[0]
      const totalprice = Math.ceil(quantity * current_price);
      setTotal(totalprice);
      setPrice(totalprice);
    };
    calculateTotal();
  }, [quantity]);
    return (
        <div>
<div className="register">
        <h1>ADD CRYPTO</h1>
        <p>Enter Quantity</p>
        <div>
          <input className="inputbox" type="text" onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" /><br />
          <input className="inputbox" type="text" readOnly placeholder={params.id} /><br />
          <input className="inputbox" type="text" onChange={() => setPrice(total)} placeholder={total} /><br />
          <button className="btn btn-primary" onClick={addData}>Add crypto</button>
        </div>
      </div>
        </div>
    )
}
export default Buying