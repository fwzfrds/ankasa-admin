import {combineReducers} from 'redux'
import userReducer from './userReducer'
import adminReducer from './adminReducer'
import { productsReducer, detailProdReducer } from './productsReducer'
import { activeAirlinesReducer, airlinesReducer } from './airlineReducer'
import { ticketsReducer } from './ticketReducer'

const rootReducer = combineReducers({
    user: userReducer,
    airlines: airlinesReducer,
    activeAirlines: activeAirlinesReducer,
    tickets: ticketsReducer,
    admin: adminReducer,
    products: productsReducer,
    productDetail: detailProdReducer
})

export default rootReducer