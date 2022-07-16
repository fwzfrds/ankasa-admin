const initialState = {
    tickets: {},
    isLoading: false,
    isError: false
}

export const ticketsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_TICKET_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'ADD_TICKET_SUCCESS':
            return {
                ...state,
                tickets: action.payload,
                isLoading: false
            }
        case 'ADD_TICKET_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'GET_TICKET_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_TICKET_SUCCESS':
            return {
                ...state,
                tickets: action.payload,
                isLoading: false
            }
        case 'GET_TICKET_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'UPDATE_TICKET_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'UPDATE_TICKET_SUCCESS':
            return {
                ...state,
                tickets: action.payload,
                isLoading: false
            }
        case 'UPDATE_TICKET_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case 'DELETE_TICKET_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'DELETE_TICKET_SUCCESS':
            return {
                ...state,
                tickets: action.payload,
                isLoading: false
            }
        case 'DELETE_TICKET_ERROR':
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state
    }

}