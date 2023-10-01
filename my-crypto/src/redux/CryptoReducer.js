import { SET_CRYPTO_LIST } from "./Constant";
export const cryptoData = (data= [], action)=>{
    switch(action.type){
        case SET_CRYPTO_LIST:
         return [...action.data]

         default:
            return data
    }
}
