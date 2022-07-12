import axios from 'axios'
import swal from 'sweetalert';

export const loginUser = (loginData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_LOGIN_PENDING' })
        const result = await axios.post(`${process.env.REACT_APP_API_BACKEND}/v1/users/login`, loginData)
        const user = result.data.data

        const dataLocal = {
            firstName: result.data.data.first_name,
            lastName: result.data.data.last_name,
            id: result.data.data.id,
            email: result.data.data.email,
            role: result.data.data.role,
            token: result.data.data.token,
            refreshToken: result.data.data.RefreshToken,
        }

        console.log(dataLocal)
        localStorage.setItem('BlanjaUser', JSON.stringify(dataLocal))

        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: user })

        swal({
            title: "Good job!",
            text: `${result.data.message}`,
            icon: "success"
        });
        navigate('/')

    } catch (error) {
        console.log(error);
        dispatch({ type: 'USER_LOGIN_ERROR' })
        swal({
            title: "Good job!",
            text: `${error.response.data.message}`,
            icon: "error",
        });
    }
}