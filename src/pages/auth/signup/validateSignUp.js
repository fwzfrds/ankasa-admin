export const validateSignUp = (values) => {
    const errors = {}
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const isStringOnly = /^[A-Za-z\s]*$/

    if (!values.name) {
        errors.name = 'Name is required!'
    } else if (isStringOnly.test(values.name) === false) {
        console.log(values.name)
        console.log(isStringOnly.test(values.name))
        errors.name = 'Name should be letter only!'
    }

    if (!values.email) {
        errors.email = 'email is required!'
    } else if (!regEx.test(values.email)) {
        errors.email = 'email is invalid!'
    }

    if (!values.password) {
        errors.password = 'password is required!'
    } else if ((values.password).length < 8) {
        errors.password = 'password must be more than 8 characters!'
    }

    return errors
}