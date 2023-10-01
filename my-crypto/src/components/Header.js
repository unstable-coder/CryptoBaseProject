import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const auth = localStorage.getItem('cryptouser');
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };
  
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger" >
      <Link to="/" className="navbar-brand fw-bold" style={{ margin: '0 30px' }}>
        CryptBase
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
   
        <ul className="navbar-nav mr-auto">
          <li className="nav-item fw-bold">
            <Link to="/" className={`nav-link`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/coin" className={`nav-link `}>
              Coin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/exchange" className={`nav-link`}>
              Exchanges
            </Link>
          </li>
          <li className="nav-item" >
            <Link to="/mywallet" className={`nav-link` }>
              MyWallet
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {auth ? (
            <li className="nav-item">
              <Link onClick={logout} to="/register" className="nav-link" >
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>
            
           ) 
           
         : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link fw-bold">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link fw-bold">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
