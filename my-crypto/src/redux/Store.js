import { configureStore } from "@reduxjs/toolkit";
import Rootreducer from './Rootreducer'
import CryptoSaga from "./CryptoSaga";
import createSagaMiddleware from 'redux-saga'
const sagamiddleware = createSagaMiddleware()
const Store = configureStore(
    {
        reducer:Rootreducer,
        middleware: ()=>[sagamiddleware]
    })
    sagamiddleware.run(CryptoSaga)
export default Store;