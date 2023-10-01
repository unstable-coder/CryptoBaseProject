import './App.css';
import Header from './components/Header';
import Home from './components/Home'
import Coin from './components/Coin'
import Exchange from './components/Exchange'
import CoinDetail from './components/CoinDetail';
import Error from './components/Error';
import Login from './components/Login';
import Register from './components/Register';
import {Routes, Route} from 'react-router-dom'
import Order from './components/Order';
import MyWallet from './components/MyWallet';
import Buying from './components/Buying';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/coin' element={<Coin />}/>
      <Route path='/exchange' element={<Exchange />}/>
      <Route path='/mywallet' element={<MyWallet />}/>
      <Route path='/coin/:id' element={<CoinDetail/>}/>
      <Route path='/add-crypto/:id' element={<Buying />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/error' element={<Error />}/>
      <Route path='/order/:id' element={<Order />}/>
    </Routes>
    </>
  );
}

export default App;
