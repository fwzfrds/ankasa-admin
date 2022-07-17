import React, { useEffect, useState } from 'react'
import styles from './SignIn.module.css'
import { motion } from 'framer-motion'
import Input from '../../../components/base/input/input'
import { Link, useNavigate } from 'react-router-dom'
import { validateLogin } from './validateLogin'
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../../config/redux/actions/userAction'

const SignIn = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [isLoginError, setIsLoginError] = useState('')
    const [buttonDisable, setButtonDisable] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)


    const handleInputLogin = (e) => {
        e.persist()
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
        if(isLoginError) {
            setIsLoginError('')
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        setFormErrors(validateLogin(loginData))
        setIsSubmit(true)
    }

    useEffect(() => {

        const reqLogin = async () => {
            setButtonDisable(true)

            dispatch(loginUser(loginData, navigate)).then(() => {
                setButtonDisable(false)
                setIsSubmit(false)
            }).catch(error => {
                setButtonDisable(false)
                setIsSubmit(false)
                setIsLoginError(`${error.response.data.message}`)
            })
        }

        if (isSubmit) {

            if (Object.keys(formErrors).length === 0 && isSubmit) {
                reqLogin()
            }
        }
    }, [formErrors, isSubmit, dispatch, loginData, navigate])

    return (
        <div className={`${styles.sign_in}`}>
            <motion.div initial="hidden" animate="visible"
                variants={{
                    hidden: {
                        scale: 0.8,
                        opacity: 0
                    },
                    visible: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                            delay: 0.2
                        }
                    }
                }}
            >
                <div className={`${styles.signin_container}`}>
                    <h3>Sign <span>In</span></h3>
                    <p>Welcome, have a nice day <span>Ankasaria</span></p>
                    <form id='login-form' className={`${styles.signin_forms}`}
                        onSubmit={handleLogin}
                    >
                        {isLoginError &&
                            <p
                                style={{
                                    color: 'red',
                                    fontWeight: 400,
                                    margin: 0
                                }}
                            >
                                {isLoginError}
                            </p>
                        }
                        <Input
                            label={'Email Address'}
                            placeholder={'youremail@gmail.com'}
                            type={'text'}
                            name={'email'}
                            id={'email'}
                            onChange={handleInputLogin}
                        >
                            {formErrors.email &&
                                <p
                                    style={{
                                        color: 'red',
                                        fontWeight: 400,
                                        margin: 0
                                    }}
                                >
                                    {formErrors.email}
                                </p>
                            }
                        </Input>
                        <Input
                            label={'Secure Password'}
                            placeholder={'Your secure password'}
                            type={'password'}
                            name={'password'}
                            id={'password'}
                            onChange={handleInputLogin}
                        >
                            {formErrors.password &&
                                <p
                                    style={{
                                        color: 'red',
                                        fontWeight: 400,
                                        margin: 0
                                    }}
                                >
                                    {formErrors.password}
                                </p>
                            }
                        </Input>
                    </form>
                    <Link to={'#'} className={`${styles.forgot}`}>Forgot Password?</Link>
                    <button
                        type='submit'
                        style={buttonDisable ? { pointerEvents: 'none' } : {}}
                        form='login-form'
                    >
                        {buttonDisable ? 'Loading...' : 'Sign In'}
                    </button>
                    <p className={`${styles.redirect}`}>Don't have an account? <Link to={'/auth/sign-up'}>Sign Up</Link></p>
                </div>
            </motion.div>
        </div>
    )
}

export default SignIn