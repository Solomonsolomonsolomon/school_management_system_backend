import axios from '../api/axios'
import React, {useContext, useEffect, useRef, useState} from 'react'
import AuthContext from '../context/AuthProvider'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'

 const  Admin = ()=> {
    // useEffect(() => {

    //     // axios.get('/admin')
    //     // .then(res => {
    //     //     console.log(res.data)
    //     // })
    //     // .catch(err => {
    //     //     console.log(err.response)
    //     // })
    // }, [])

    const logout=()=> {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        window.location.reload()
    }


    return (
        <div className='container grid  '>
        <Navbar />
        <main className='container '>
            <section>
                <p>Admin</p>
                <button onClick={logout}>log out</button>
            </section>
            <section>

            </section>
            <section>

            </section>
            <section>

            </section>
            <section>

            </section>
        </main>
        </div>
        

    ) 
}

export default Admin