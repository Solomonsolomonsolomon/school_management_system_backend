import {useRef, useState, useEffect} from 'react'

function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLSelectElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        if (error) {
            setEmail("");
        }
    },[email, password])

    const Auth = async () => {
        setLoading(true);
        const res = await fetch("http://localhost:2020/v1/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await res.json();
        if (data.error) {
            setError(data.error);
        }
        setLoading(false);

    }

    
    return (
        <>
        <div className=" w-full bg-slate-200 h-screen m-0 pt-[10%]">
        <header>
                <h1 className="text-4xl text-center mb-10">School Management Portal</h1>
            </header>
            <div className="container bg-white w-[40%] flex flex-col m-auto rounded-2xl shadow-white p-10 ">
                <h1 className="text-2xl text-center">Login To Your Account</h1>
                <div className="m-auto mt-10 w-[80%]">
                    <p className={error ? "text-red-700 text-center block": "none"} ref={errRef} aria-live='assertive'>{error}</p>
                    <form  className='flex flex-col gap-5'>
                        <section>
                            <select name="roles" id="roles" className='w-full text-xl' ref={roleRef}>
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
                            ref={emailRef} 
                            className='w-100% bg-slate-200 p-3 text-xl'
                            autoComplete='on'
                            />
                        </section>
                        <section className="flex flex-col">
                            <label htmlFor="password" className='text-xl'>Password</label>
                            <input type="password" id='password' placeholder="Enter Password" ref={passwordRef} className='w-100% bg-slate-200 p-3 text-xl'/>
                        </section>
                        <a href="#" className='text-xl text-right text-blue-700 underline'>Forgot Passsword?</a>
                        <button className="block w-full bg-blue-700 p-3 text-white text-xl" onClick={Auth}>Login</button>
                    </form>
                </div>
            </div>
        </div>

        </>
    )
}

export default Login;