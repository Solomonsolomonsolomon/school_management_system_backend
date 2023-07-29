import {useRef, useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const LOGIN_URL = '/auth'

function Login() {
    const {setAuth} = useContext(AuthContext)
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLSelectElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
 
    const Auth = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${LOGIN_URL}/signin`, 
            JSON.stringify({
                email,
                password,
                role}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: false
            }
            )
            console.log(res.data)
            if(res.data.status == 200) {
                const accessToken = res.data.accessToken
                setAuth({email, password, role, accessToken})
                // setTimeout(()=> {
                //     setLoading(true);
                // }, 1000)
                setError('Successful Sign In')
            }

            setEmail("")
            setPassword("")
            setRole("")
        } catch(err) {
             if (err.response.status === 401) {
                setError("Invalid Credentials")
            } else if (err.response.status === 500) {
                setError("Server Error")
            } else if (err.response.status === 400) {
                setError("Invalid Request")
            } else {
                setError('Login Failed')
            }
 
        }

       

    }

    
    return (
        <div className=" w-full bg-slate-200 h-screen m-0 pt-[5%]">
        <header>
                <h1 className="text-4xl text-center mb-10">School Management Portal</h1>
            </header>
            <div className="container bg-white w-[40%] flex flex-col m-auto rounded-2xl shadow-white p-10 ">
                <h1 className="text-2xl text-center">Login To Your Account</h1>
                <div className="m-auto mt-10 sm:w-[90%] w-[80%]">
                    <p className={error ? "text-red-700 text-center block": "none"} ref={errRef} aria-live='assertive'>{error}</p>
                    <form  className='flex flex-col gap-5' onSubmit={Auth}>
                        <section>
                            <select name="roles" id="roles" className='w-full text-xl pointer'
                             ref={roleRef} 
                             onChange={(e)=> setRole(e.target.value)} 
                             required>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                        </section>
                        <section className="flex flex-col"> 
                            <label htmlFor="email" className='text-xl'>Email</label>
                            <input type="email" id='email'  
                            placeholder="Enter Staff Portal" 
                            required
                            ref={emailRef} 
                            className='w-100% bg-slate-200 p-3 text-xl'
                            autoComplete='on'
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            />
                        </section>
                        <section className="flex flex-col">
                            <label htmlFor="password" className='text-xl'>Password</label>
                            <input type="password" id='password' placeholder="Enter Password"
                             required  
                             onChange={(e)=> setPassword(e.target.value)}
                             value={password}
                             className='w-100% bg-slate-200 p-3 text-xl'/>
                        </section>
                        <a href="#" className='text-xl text-right text-blue-700 underline'>Forgot Passsword?</a>
                        <button className="block w-full bg-blue-700 p-3 text-white text-xl" >
                            <>
                            {
                                loading ? <span className="animate-spin"><i className="fas fa-spinner fa-spin"></i></span>
                                : <span>Login</span>
                            }
                            </>
                   
                             </button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default Login;