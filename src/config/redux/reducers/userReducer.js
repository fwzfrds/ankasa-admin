const initialState = {
    user: {
        fullname: '',
        email: '',
        role: ''
    },
    isLoading: false
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'USER_LOGIN_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }
        case 'USER_LOGIN_ERROR':
            return {
                ...state,
                isLoading: false
            }

        case 'USER_SIGNUP_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'USER_SIGNUP_SUCCESS':
            return {
                ...state,
                isLoading: false
            }
        case 'USER_SIGNUP_ERROR':
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
    }
}

export default userReducer