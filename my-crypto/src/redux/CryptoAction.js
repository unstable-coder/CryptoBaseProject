import { CRYPTO_LIST } from "./Constant"
import { SEARCH_CRYPTO} from "./Constant"

export const cryptoList =  () => {
    return {
        type: CRYPTO_LIST,
    }
}
export const searchCrypto =  (query) => {
    return {
        type: SEARCH_CRYPTO,
        query
    }
}