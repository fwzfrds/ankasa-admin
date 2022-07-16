import axios from 'axios'
import swal from 'sweetalert';

export const addTicket = (ticketData) => async (dispatch) => {
    try {
        dispatch({ type: 'ADD_TICKET_PENDING' })

        const result = await axios.post(`${process.env.REACT_APP_API_BACKEND}/ticket`, ticketData)
        console.log(result.data)
        swal({
            title: "Good job!",
            text: `Data Tersimpan`,
            icon: "success"
        });

        const resultGet = await axios.get(`${process.env.REACT_APP_API_BACKEND}/ticket`)
        const tickets = resultGet.data.data

        dispatch({ type: 'ADD_TICKET_SUCCESS', payload: tickets })

    } catch (error) {
        console.log(error);
        swal({
            title: "Add Ticket Error!",
            text: `Erro Adding Ticket`,
            icon: "error",
        });
        dispatch({ type: 'ADD_TICKET_ERROR' })
    }
}

export const updateTicket = (ticketData, id) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_TICKET_PENDING' })

        const result = await axios.put(`${process.env.REACT_APP_API_BACKEND}/ticket/${id}`, ticketData)
        console.log(result);
        swal({
            title: "Good job!",
            text: `${result.data.message}`,
            icon: "success"
        })

        const resultGet = await axios.get(`${process.env.REACT_APP_API_BACKEND}/ticket`)
        const tickets = resultGet.data.data

        dispatch({ type: 'UPDATE_TICKET_SUCCESS', payload: tickets })

    } catch (error) {
        console.log(error);
        swal({
            title: "Error!",
            text: `Update Ticket Error`,
            icon: "warning"
        })
    }
}

export const deleteTicket = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_TICKET_PENDING' })

        await axios.delete(`${process.env.REACT_APP_API_BACKEND}/ticket/${id}`)

        const resultGet = await axios.get(`${process.env.REACT_APP_API_BACKEND}/ticket`)
        const tickets = resultGet.data.data

        dispatch({ type: 'DELETE_TICKET_SUCCESS', payload: tickets })

        // navigate('/')

    } catch (error) {
        console.log(error);
        swal({
            title: "Delete Ticket Error!",
            text: `${error.response.data.message}`,
            icon: "error",
        });
    }
}