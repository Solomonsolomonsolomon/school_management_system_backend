import  { useState, useRef } from 'react';
import axios from '../../api/axios';

const POST_URL = '/admin';

const AddAdmin = () => {
    const role = localStorage.getItem('user').role<string>
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const errRef = useRef<HTMLParagraphElement>(null);

    const Submit = async (e) => {
        e.preventDefault();
        console.log(role)
        try {
            const res = await axios.post(`${POST_URL}/add/admin`, {
                name,
                email,
                password,
                role
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                withCredentials: false
            })
            console.log(res.data)
            if(res.data.status === 200) {
                setName("")
                setEmail("")
                setPassword("")
                setError(null)
            }
        } catch(err) {
            console.log(err)
            setError(err)
        }
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <p className={error ? "text-red-700 text-center block": "none"} ref={errRef} aria-live='assertive'>{error}</p>
                <section>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name'
                     placeholder="Enter Name" 
                     value={name}
                     onChange={(e)=> setName(e.target.value)}
                     required />
                </section>
                <section>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email'
                     placeholder="Enter Email"
                     value={email}
                     onChange={(e)=> setEmail(e.target.value)}
                      required />
                </section>
                <section>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' 
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e)=> setPassword(e.target.value)} 
                    required />
                </section>
                <button>ADD ADMIN</button>
            </form>
        </div>
    )
}

export default AddAdmin