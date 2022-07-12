import axios from 'axios'
import swal from 'sweetalert'

export const getProducts = (page = 1, sortorder = 'asc') => async (dispatch) => {
    try {
        dispatch({ type: 'GET_PRODUCTS_PENDING' })
        console.log(sortorder)
        const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}/v1/products?sortby=price&sortorder=${sortorder}&page=${page}&limit=10`)
        console.log(result.data)
        const products = result.data

        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: products })
        // navigate('/home')

    } catch (error) {
        console.log(error);
    }
}

export const detailProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DETAIL_PRODUCT_PENDING' })
        console.log('get detail product run...')

        const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}/v1/products//detail/${id}`)
        // console.log(result.data.data)
        const productDetail = result.data.data

        dispatch({ type: 'DETAIL_PRODUCT_SUCCESS', payload: productDetail })
        // navigate('/home')

    } catch (error) {
        console.log(error);
        swal({
            title: "Get Detail Product Error!",
            text: `${error.response.data.message}`,
            icon: "error",
        });
    }
}

export const searchProducts = (search) => async (dispatch) => {
    try {
        dispatch({ type: 'GET_PRODUCTS_PENDING' })

        const result = await axios.get(`${process.env.REACT_APP_API_BACKEND}/v1/products?search=${search}`)
        console.log(result.data)
        const products = result.data

        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: products })
        // navigate('/home')

    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = (formData, localData, id) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_PRODUCT_PENDING' })

        const result = await axios.put(`http://localhost:5000/v1/products/edit/${id}`, formData, {
            headers: { Authorization: `Bearer ${localData}` }
        })
        console.log(result);
        swal({
            title: "Good job!",
            text: `${result.data.message}`,
            icon: "success"
        });

        const resultGet = await axios.get(`${process.env.REACT_APP_API_BACKEND}/v1/products?sortby=price&sortorder=desc&page=1&limit=10`)
        const products = resultGet.data

        dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: products })

    } catch (error) {
        console.log(error);
        console.log('Update Data Error!');
    }
}

export const addProduct = (formData, authToken) => async (dispatch) => {
    try {
        dispatch({ type: 'ADD_PRODUCT_PENDING' })

        const result = await axios.post(`${process.env.REACT_APP_API_BACKEND}/v1/products/add`, formData, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
        console.log(result);
        swal({
            title: "Good job!",
            text: `Data Tersimpan`,
            icon: "success"
        });

        const resultGet = await axios.get(`${process.env.REACT_APP_API_BACKEND}/v1/products?sortby=price&sortorder=desc&page=1&limit=10`)
        const products = resultGet.data

        dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: products })

        // navigate('/')

    } catch (error) {
        console.log(error.response.data.message);
        swal({
            title: "Add Product Error!",
            text: `${error.response.data.message}`,
            icon: "error",
        });
    }
}

export const deleteProduct = (authToken, id) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_PRODUCT_PENDING' })

        await axios.delete(`http://localhost:5000/v1/products/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        })
        swal({
            title: "Success",
            text: 'Delete Product Success',
            icon: "success",
            button: "OK!",
        });

        const resultGet = await axios.get(`${process.env.REACT_APP_API_BACKEND}/v1/products?sortby=price&sortorder=desc&page=1&limit=10`)
        const products = resultGet.data

        dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: products })

        // navigate('/')

    } catch (error) {
        console.log(error.response.data.message);
        swal({
            title: "Delete Product Error!",
            text: `${error.response.data.message}`,
            icon: "error",
        });
    }
}