import React, { useState, useEffect } from 'react'
import styles from './SignUp.module.css'
import { motion } from 'framer-motion'
import Input from '../../../components/base/input/input'
import { Link, useNavigate } from 'react-router-dom'
import { validateSignUp } from './validateSignUp'
import { useDispatch } from 'react-redux'
import { signUp } from '../../../config/redux/actions/userAction'

const SignUp = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        password: '',
        role: 1
    })

    const [buttonDisable, setButtonDisable] = useState(false)
    const [signUpError, setSignUpError] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [formErrors, setFormErrors] = useState({})

    const handleInputSignUp = (e) => {
        e.persist()
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
        if (signUpError) {
            setSignUpError('')
        }

        if(formErrors.email === 'Email already exists') {
            setFormErrors({...formErrors, email: ''})
        }
    }


    const handleSignUp = (e) => {
        e.preventDefault()
        setFormErrors(validateSignUp(signUpData))
        setIsSubmit(true)
    }

    useEffect(() => {

        const postSignUp = async () => {
            setButtonDisable(true)

            dispatch(signUp(signUpData, navigate)).then(() => {
                setButtonDisable(false)
                setIsSubmit(false)
            }).catch(error => {
                setButtonDisable(false)
                setIsSubmit(false)
                const errMessage = error.response.data.message
                setSignUpError(errMessage)
                if (errMessage === 'Email already exists') {
                    setFormErrors({ ...formErrors, email: errMessage })
                }
            })
        }

        if (isSubmit) {

            if (Object.keys(formErrors).length === 0 && isSubmit) {
                postSignUp()
            }
        }
    }, [formErrors, isSubmit, dispatch, signUpData, navigate])

    console.log(signUpData)

    return (
        <div className={`${styles.sign_up}`}>
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
                <div className={`${styles.signup_container}`}>
                    <h3>Sign <span>Up</span></h3>
                    <p>Hello, have a nice day <span>Ankasaria</span></p>
                    <form className={`${styles.signup_forms}`}
                        onSubmit={handleSignUp}
                    >

                        {signUpError &&
                            <p
                                style={{
                                    color: 'red',
                                    fontWeight: 400,
                                    margin: 0
                                }}
                            >
                                {signUpError}
                            </p>
                        }
                        <Input
                            label={'Full Name'}
                            placeholder={'Your Full Name'}
                            type={'text'}
                            name={'name'}
                            id={'name'}
                            onChange={handleInputSignUp}
                        >
                            {formErrors.name &&
                                <p
                                    style={{
                                        color: 'red',
                                        fontWeight: 400,
                                        margin: 0
                                    }}
                                >
                                    {formErrors.name}
                                </p>
                            }
                        </Input>
                        <Input
                            label={'Email Address'}
                            placeholder={'youremail@gmail.com'}
                            type={'text'}
                            name={'email'}
                            id={'email'}
                            onChange={handleInputSignUp}
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
                            onChange={handleInputSignUp}
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
                        <button type='submit'
                            style={buttonDisable ? { pointerEvents: 'none' } : {}}
                        >
                            {buttonDisable ? 'Loading...' : 'Sign Up'}
                        </button>
                        <p>Already have account? <Link to={'/auth/sign-in'}>Sign In</Link></p>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default SignUp