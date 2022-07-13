import {combineReducers} from 'redux'
import userReducer from './userReducer'
import adminReducer from './adminReducer'
import { productsReducer, detailProdReducer } from './productsReducer'
import { airlinesReducer } from './airlineReducer'

const rootReducer = combineReducers({
    user: userReducer,
    airlines: airlinesReducer,
    admin: adminReducer,
    products: productsReducer,
    productDetail: detailProdReducer
})

export default rootReducer