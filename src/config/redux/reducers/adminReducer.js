const initialState = {
    admin: {
        fullname: '',
        email: '',
        role: ''
    },
    isLoading: false
}

const adminReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADMIN_LOGIN_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'ADMIN_LOGIN_SUCCESS':
            return {
                ...state,
                admin: action.payload,
                isLoading: false
            }
        case 'ADMIN_LOGIN_ERROR':
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
    }

}

export default adminReducer