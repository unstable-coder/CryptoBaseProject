import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { cryptoList } from "../redux/CryptoAction";
import { Card } from "react-bootstrap";
import Chart from "./Chart";

const CoinDetail = () => {
  const result = useSelector((state) => state.cryptoData);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [days, setDays] = useState("24h");
  const btns = ["24h", "7d", "14d", "30d", "60d"];

  const chartData = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=${days}`);
      const data = await response.json();
      setData(data.prices);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
   
    dispatch(cryptoList());
    chartData();
  }, [dispatch, params.id, days]);

  const BuyButton = (id) => {
    navigate(`/add-crypto/${id}`);
  };
  let item = result.filter(coin => coin.id === params.id)
  const handledays=(key)=>{
setDays(key)
  }
  return (
    <div className="container my-4">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="chartcss">
            <Chart Data={Data} days={days} ID={params.id} />
          </div>

          {btns.map((i) => (
            <button
              key={i}
              className="btn btn-warning m-2"
              onClick={() => handledays(i)}
            >
              {i}
            </button>
          ))}

          <div>
            <div className="row bg-danger text-white p-2">
              <div className="col-2">NAME</div>
              <div className="col-2">MARKET PRICE</div>
              <div className="col-2">24H High</div>
              <div className="col-2">24H Low</div>
              <div className="col-2">MAX SUPPLY</div>
            </div>

            {item.map((ele) => (
              <div key={ele.id} className="row border py-2">
                <div className="col-2">{ele.name}</div>
                <div className="col-2">${ele.current_price}</div>
                <div className="col-2">${ele.high_24h}</div>
                <div className="col-2">${ele.low_24h}</div>
                <div className="col-2">{ele.max_supply}</div>

                <Card className="w-100 my-2">
                  <Card.Body>
                    <Card.Title>Coin Details</Card.Title>
                    <ul className="list-unstyled">
                      <li>
                        <strong>Market Cap Rank:</strong> {ele.market_cap_rank}
                      </li>
                      <li>
                        <strong>Circulating Supply:</strong> {ele.circulating_supply}
                      </li>
                      <li>
                        <strong>Price Change 24h:</strong> {ele.price_change_24h}
                      </li>
                      <li>
                        <strong>Total Supply:</strong> {ele.total_supply}
                      </li>
                      <li>
                        <strong>Total Volume:</strong> {ele.total_volume}
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </div>
            ))}

            <button
              type="submit"
              className="btn btn-primary my-3" style={{margin:"80vh"}}
              onClick={() => BuyButton(params.id)}
            >
              BUY {params.id}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinDetail;
