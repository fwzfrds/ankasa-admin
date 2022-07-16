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

export const getActiveAirlines = () => async (dispatch) => {
    try {

        dispatch({ type: 'GET_AIRLINES_PENDING' })
        const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}/airlines/1`)
        console.log(result.data)
        const activeAirlines = result.data.data

        dispatch({ type: 'GET_AIRLINES_SUCCESS', payload: activeAirlines })

    } catch (error) {
        console.log(error)
        dispatch({ type: 'GET_AIRLINES_ERROR' })
        swal({
            title: "Get Airlines Error!",
            text: `${error.response.data.message}`,
            icon: "error",
        })
    }
}

export const addAirline = (formData) => async (dispatch) => {
    try {
        dispatch({ type: 'ADD_AIRLINE_PENDING' })

        const result = await axios.post(`${process.env.REACT_APP_API_BACKEND}/airlines`, formData)
        console.log(result.data)
        swal({
            title: "Good job!",
            text: `Data Tersimpan`,
            icon: "success"
        });

        const resultGet = await axios.get(`${process.env.REACT_APP_API_BACKEND}/airlines`)
        const airlines = resultGet.data.data

        dispatch({ type: 'ADD_AIRLINE_SUCCESS', payload: airlines })

    } catch (error) {
        console.log(error.response.data.message);
        dispatch({ type: 'ADD_AIRLINE_ERROR' })
        swal({
            title: "Add Airline Error!",
            text: `${error.response.data.message}`,
            icon: "error",
        });
    }
}

export const updateAirline = (formData, id) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_AIRLINE_PENDING' })

        const result = await axios.put(`${process.env.REACT_APP_API_BACKEND}/airlines/${id}`, formData)
        console.log(result);
        swal({
            title: "Good job!",
            text: `${result.data.message}`,
            icon: "success"
        });

        const resultGet = await axios.get(`${process.env.REACT_APP_API_BACKEND}/airlines`)
        const airlines = resultGet.data.data

        dispatch({ type: 'UPDATE_AIRLINE_SUCCESS', payload: airlines })

    } catch (error) {
        console.log(error);
        console.log('Update Data Error!');
    }
}

export const deleteAirline = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_AIRLINE_PENDING' })

        await axios.delete(`${process.env.REACT_APP_API_BACKEND}/airlines/${id}`)
        swal({
            title: "Success",
            text: 'Delete Product Success',
            icon: "success",
            button: "OK!",
        });

        const resultGet = await axios.get(`${process.env.REACT_APP_API_BACKEND}/airlines`)
        const airlines = resultGet.data.data

        dispatch({ type: 'DELETE_AIRLINE_SUCCESS', payload: airlines })

        // navigate('/')

    } catch (error) {
        console.log(error);
        swal({
            title: "Delete Airline Error!",
            text: `${error.response.data.message}`,
            icon: "error",
        });
    }
}