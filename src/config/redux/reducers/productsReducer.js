const initialState = {
    products: {},
    isLoading: false
}

export const productsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'ADD_PRODUCT_SUCCESS':
            return {
                ...state,
                products: action.payload,
                isLoading: false
            }
        case 'GET_PRODUCTS_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_PRODUCTS_SUCCESS':
            return {
                ...state,
                products: action.payload,
                isLoading: false
            }
        case 'UPDATE_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'UPDATE_PRODUCT_SUCCESS':
            return {
                ...state,
                products: action.payload,
                isLoading: false
            }
        case 'DELETE_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'DELETE_PRODUCT_SUCCESS':
            return {
                ...state,
                products: action.payload,
                isLoading: false
            }

        default:
            return state
    }

}

const searchState = {
    productDetail: {},
    isLoading: false
}

export const detailProdReducer = (state = searchState, action) => {
    switch (action.type) {
        case 'DETAIL_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'DETAIL_PRODUCT_SUCCESS':
            // console.log(state.products)
            return {
                ...state,
                productDetail: action.payload,
                isLoading: false
            }
    
        default:
            return state
    }
}

