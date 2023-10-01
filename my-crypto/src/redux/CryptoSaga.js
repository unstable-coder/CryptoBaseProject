import {takeEvery,put} from 'redux-saga/effects'
import { CRYPTO_LIST, SEARCH_CRYPTO,SET_CRYPTO_LIST } from './Constant'
function* getCrypto(){
    let data = yield fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    data = yield data.json();
  yield put({type:SET_CRYPTO_LIST, data} )
  
}
function*searchCrypto(data){
  console.log("query here", data)
  let result = yield fetch(`https://api.coingecko.com/api/v3/coins/${data}`);
   result = yield result.json();
  yield put({type:SET_CRYPTO_LIST, result} )
}
function* CryptoSaga(){
yield takeEvery(CRYPTO_LIST, getCrypto)
yield takeEvery(SEARCH_CRYPTO, searchCrypto)
}
export default CryptoSaga