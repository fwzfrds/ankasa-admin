import axios from 'axios'
import swal from 'sweetalert';

export const loginUser = (loginData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_LOGIN_PENDING' })
        const result = await axios.post(`${process.env.REACT_APP_API_BACKEND}/auth/login`, loginData)
        const user = result.data.data

        const dataLocal = user

        console.log(dataLocal)
        localStorage.setItem('AnkasaAdmin', JSON.stringify(dataLocal))

        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: user })

        swal({
            title: "Good job!",
            text: `${result.data.message}`,
            icon: "success"
        });
        navigate('/')

    } catch (error) {
        console.log(error);
        swal({
            title: "Good job!",
            text: `${error.response.data.message}`,
            icon: "error",
        })
        dispatch({ type: 'USER_LOGIN_ERROR' })
        throw error
    }
}

export const signUp = (signUpData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_SIGNUP_PENDING' })
        const result = await axios.post(`${process.env.REACT_APP_API_BACKEND}/auth/register`, signUpData)

        dispatch({ type: 'USER_SIGNUP_SUCCESS'})

        swal({
            title: "Good job!",
            text: `${result.data.message}`,
            icon: "success"
        });
        navigate('/auth/sign-in')

    } catch (error) {
        console.log(error);
        swal({
            title: "Error!",
            text: `${error.response.data.message}`,
            icon: "error",
        })
        dispatch({ type: 'USER_SIGNUP_ERROR' })
        throw error
    }
}