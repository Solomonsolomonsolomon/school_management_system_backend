
import axios from '../api/axios'
import React, {useContext, useEffect, useRef, useState} from 'react'
import AuthContext from '../context/AuthProvider'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
// import axios from '../api/axios'
// import { useNavigate , useLocation} from 'react-router-dom'
// import React, { useContext, useEffect, useRef, useState} from 'react'
// import AuthContext from '../context/AuthProvider'
// import { Link } from 'react-router-dom';
import Navbar from './Admin/Navbar'
import Profile from './Admin/Profile';
import SubAdmin from './Admin/SubAdmin';
// const GET_URL = '/admin'
 const  Admin = ()=> {
    // const location = useLocation()
    const getUserData = (user) => {
        const data = sessionStorage.getItem(user);
        if (!data) {
          return {};
        }
        return JSON.parse(data);
      };
    
      const user = getUserData("user");


    return (
        <div className='grid md:grid-cols-[25%_75%] lg:grid-cols-[20%_80%] w-screen '>
        <Navbar/>
        <main className='container '>
            <Profile />
            <SubAdmin />
        </main>
        </div> 

    ) 
}

export default Admin

