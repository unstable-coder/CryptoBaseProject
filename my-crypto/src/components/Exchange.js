import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Error from './Error';
import { useNavigate } from "react-router-dom";

const Exchange = () => {
  const [exdata, setExdata] = useState('');
  const [loading, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const fetchExchangeData = async () => {
    try {
      let result = await fetch('https://api.coingecko.com/api/v3/exchanges');
      result = await result.json();
      setExdata(result);
      setLoader(false);
      //console.log(result);
    } catch (error) {
      setError(true);
      setLoader(false);
      
    }
  };

  useEffect(() => {
    fetchExchangeData();
  }, []);
  if (error)
  return <Error message={"Error While Fetching Exchanges"} />;

  return (
    <div>
    
      {loading ? <Loader /> : (
        <div className="coins">
          {exdata && exdata.map((exchange, index) => (
            <div className="containerxy" key={index} onClick={() => window.open(exchange.url, 'blank')}>
              <img src={exchange.image} alt="logo" />
              <h2>{exchange.symbol}</h2>
             <p> {exchange.name}</p>
              <p>Trust Rank {exchange.trust_score_rank}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exchange;
