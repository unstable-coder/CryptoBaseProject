import React, { useEffect, useState } from "react";
import { cryptoList } from "../redux/CryptoAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const MyWallet = () => {
  const [balance, setBalance] = useState(1000000);
  const latestData = useSelector((state) => state.cryptoData);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const getProducts = async () => {
    try {
      const userID = JSON.parse(localStorage.getItem('cryptouser'))._id
      let result = await fetch(`http://127.0.0.1:5000/mywallet?userID=${userID}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      setProducts(result);
    } catch (error) {
      navigate('/login')
    }

  };

  
  const deleteProduct = async (id, price) => {
    let remaining = balance + (price);
    console.log(remaining)
    console.log(balance)
   
    setBalance(remaining);
    let result = await fetch(`http://127.0.0.1:5000/mywallet/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    getProducts();
  };
  const getCurrentPrice = (cryptoName, quantity) => {
    const crypto = latestData.find((crypto) => crypto.id === cryptoName);
    return crypto ? Math.ceil(crypto.current_price * quantity) : 0;
  };
  useEffect(() => {
    getProducts();
    dispatch(cryptoList());
  }, [dispatch]);
  const getpnl = (buyPrice, curprice) => {
    return curprice - buyPrice;
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, item) => total + (+item.price), 0);
  };

  return (
    <div className="container my-5">
      <table className="table table-bordered table-striped">
  <thead className="bg-secondary text-white font-weight-bold">
    <tr>
      <th className="col-2 fw-bold">Quantity</th>
      <th className="col-2 fw-bold">Name</th>
      <th className="col-2 fw-bold">Buy Price</th>
      <th className="col-2 fw-bold">Delete</th>
      <th className="col-2 fw-bold">Current Price</th>
      <th className="col-2 fw-bold">P&L</th>
    </tr>
  </thead>
  <tbody>
    {products.map((item, index) => (
      <tr className="border" key={index}>
        <td className="col-2">{item.quantity}</td>
        <td className="col-2">{item.name}</td>
        <td className="col-2">${item.price}</td>
        <td className="col-2">
          <button className="btn btn-danger" onClick={() => deleteProduct(item._id, getCurrentPrice(item.name, item.quantity))}>
            Sell
          </button>
        </td>
        <td className="col-2">${getCurrentPrice(item.name, item.quantity)}</td>
        <td className="col-2">{getpnl(item.price, getCurrentPrice(item.name, item.quantity))}</td>
      </tr>
    ))}
  </tbody>
</table>

      <h2 className="mt-4">Remaining Price: ${balance - calculateTotalPrice()}</h2>
    </div>

  );
};

export default MyWallet;
