import axios from 'axios'
import swal from 'sweetalert';

export const getAirlines = () => async (dispatch) => {
    try {

        dispatch({ type: 'GET_AIRLINE_PENDING' })
        const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}/airlines`)
        console.log(result.data)
        const airlines = result.data.data

        dispatch({ type: 'GET_AIRLINE_SUCCESS', payload: airlines })

    } catch (error) {
        console.log(error)
        dispatch({ type: 'GET_AIRLINE_ERROR' })
        swal({
            title: "Get Airlines Error!",
            text: `${error.response.data.message}`,
            icon: "error",
        })
    }
}