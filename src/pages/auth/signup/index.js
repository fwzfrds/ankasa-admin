import React, { useState } from 'react'
import styles from './SignUp.module.css'
import { motion } from 'framer-motion'
import Input from '../../../components/base/input/input'
import { Link } from 'react-router-dom'

const SignUp = () => {

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
                    <form className={`${styles.signup_forms}`}>
                        <Input
                            label={'Full Name'}
                            placeholder={'Your Full Name'}
                            type={'text'}
                        />
                        <Input
                            label={'Email Address'}
                            placeholder={'youremail@gmail.com'}
                            type={'email'}
                        />
                        <Input
                            label={'Secure Password'}
                            placeholder={'Your secure password'}
                            type={'password'}
                        />
                        <button>
                            Sign Up
                        </button>
                        <p>Already have account? <Link to={'/auth/sign-in'}>Sign In</Link></p>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default SignUp