import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { cryptoList } from '../redux/CryptoAction'
import Loader from './Loader'
const Coin = () => {
  const result = useSelector((state) => state.cryptoData)
  const auth =  localStorage.getItem('cryptouser')
  const [loading, setLoader] = useState(true)
  const [val, setValue] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(cryptoList());
    setLoader(false)
  }, [])
  

  const sendData = (id) => {
      auth ?  navigate(`/coin/${id}`) : navigate('/login')
}

  return (
    <div>
   
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search Coin"
                aria-label="Search"
                aria-describedby="search-button"
                value={val} onChange={(e) => { setValue(e.target.value) }}
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (<Loader />) : (
        <div className="coins">
          {val ? (
            result.filter(coin => coin.name.toLowerCase() === val.toLowerCase()).map((coin, index) => (
              <div className="containerxy" key={index} onClick={() => { sendData(coin.id) }}>
                <img src={coin.image} alt="logo"></img>
                <h2>{coin.symbol}</h2>
                {coin.name}
                <p>${coin.current_price}</p>
              </div>
            ))
          ) : (

            result.map((coin, index) => (
              <div className="containerxy" key={index} onClick={() => { sendData(coin.id) }}>
                <img src={coin.image} alt="logo"></img>
                <h2>{coin.symbol}</h2>
                         {coin.name}
                <p>${coin.current_price}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Coin;
