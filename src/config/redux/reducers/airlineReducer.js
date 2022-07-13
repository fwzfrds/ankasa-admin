const initialState = {
    airlines: {},
    isLoading: false,
    isError: false
}

export const airlinesReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_AIRLINE_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'ADD_AIRLINE_SUCCESS':
            return {
                ...state,
                airlines: action.payload,
                isLoading: false
            }
        case 'ADD_AIRLINE_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_AIRLINE_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_AIRLINE_SUCCESS':
            return {
                ...state,
                airlines: action.payload,
                isLoading: false
            }
        case 'GET_AIRLINE_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'UPDATE_AIRLINE_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'UPDATE_AIRLINE_SUCCESS':
            return {
                ...state,
                airlines: action.payload,
                isLoading: false
            }
        case 'UPDATE_AIRLINE_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'DELETE_PRODUCT_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'DELETE_PRODUCT_SUCCESS':
            return {
                ...state,
                airlines: action.payload,
                isLoading: false
            }
        case 'DELETE_PRODUCT_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state
    }

}