
import axios from '../api/axios'
import Navbar from './Admin/Navbar'
import Profile from './Admin/Profile';
import SubAdmin from './Admin/SubAdmin';


   
const GET_URL = '/admin'

 const  Admin = ()=> {
    return (
        <div className='grid md:grid-cols-[25%_75%] lg:grid-cols-[20%_80%] w-screen '>
        <Navbar/>
        <main className='container'>
            <Profile />
            <SubAdmin />
        </main>
        </div> 

    ) 
}

export default Admin

