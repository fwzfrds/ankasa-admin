import React from 'react'
import styles from './Page404.module.css'
import {Link} from 'react-router-dom'
// import Navbar from '../../components/module/navbar/Navbar'

const Page404 = () => {
  return (
    <>
    {/* <Navbar /> */}
    <div className={`${styles['page404-container']}`}>
      <h1>Page Not Found | <span className={`${styles.notfound}`}>404</span></h1>
      <Link to={'/'} className={`${styles.redirect}`}>Back to Home</Link>
    </div>
    </>
  )
}

export default Page404