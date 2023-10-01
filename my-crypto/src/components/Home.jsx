import React from 'react';
import LOGO from '../image/bitcoin-15482.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TradingViewComponent from './TradingViewComponent';
const Home = () => {
  const navigate = useNavigate()
  const handleclick = () => {
    navigate('/coin')
  }
  return (
    <div style={{ backgroundColor: "black" }}>
      <div className='image' >
        <img src={LOGO}  alt='floating bitcoin'/>
        <div className="txt-on-img ">
          <div className="typing">
            <h1 className="text-uppercase">CryptBase</h1>
          </div>
        </div>
        <div className="txt-on-img " style={{ margin: "15% 0 0 0" }}>
          <button className='btn btn-lg btn-danger' onClick={handleclick}>EXPLORE COINS</button>
        </div>

      </div>
      <div className='row'>
        <div className='col-6'>
          <TradingViewComponent />
        </div><div className='col-6 text-white'>
          <h3 className='text-warning'>Crypto Data Analyser</h3>
          <h4>Unlock the potential of the crypto world with our real-time data analyzer.
             Stay ahead of the game, making informed decisions in the fast-paced realm of 
             cryptocurrencies. Dive into live updates, insights, and trends to navigate the markets like a pro.</h4>
            
        </div>
      </div>

      <div className='footer'>
        <div className=' container row'>
          <div className='col-3' >
            <img style={{ height: "20vh", width: "20vh", margin: "30px 40px" }} src={LOGO} alt='logo' />
          </div>
          <div className='col-3'>
            <h3 className='fw-bold' style={{ margin: "30px 40px" }}>CryptoBase</h3>
          </div>
          <div className='col-3'>
            <h3 className='fw-bold' style={{ margin: "30px 0 0 40px" }}>Links</h3>
            <ul className='list-unstyled' style={{ margin: "30px 40px" }}>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Signup</Link></li>
              <li><Link to='/exchange'>Exchanges</Link></li>
            </ul>
          </div>
          <div className='col-3'>
            <h3 className='fw-bold' style={{ margin: "30px 0 0 40px" }}>About US </h3>
            <p>Patel Nagar Road No.5</p>
            <p>Patna, Bihar</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
