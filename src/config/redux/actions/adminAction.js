import axios from 'axios'
import swal from 'sweetalert';

export const loginAdmin = (loginData, navigate) => async (dispatch) => {
    try {
        dispatch({ type: 'ADMIN_LOGIN_PENDING' })
        const result = await axios.post(`${process.env.REACT_APP_API_BACKEND}/v1/admin/login`, loginData)
        const admin = result.data.data

        const dataLocal = {
            name: result.data.data.name,
            id: result.data.data.id,
            email: result.data.data.email,
            role: result.data.data.role,
            token: result.data.data.token,
        }

        console.log(dataLocal)
        localStorage.setItem('BlanjaAdmin', JSON.stringify(dataLocal))

        dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: admin })

        swal({
            title: "Good job!",
            text: `${result.data.message}`,
            icon: "success"
        });
        navigate('/my-products')

    } catch (error) {
        console.log(error);
        dispatch({ type: 'ADMIN_LOGIN_ERROR' })
        swal({
            title: "Login Error!",
            text: `${error.response.data.message}`,
            icon: "error",
        });
    }
}