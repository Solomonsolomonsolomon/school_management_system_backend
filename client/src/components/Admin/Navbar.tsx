import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons'
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

const Navbar = ()=> {
    return (
        <nav className="bg-slate-50 shadow-lg h-screen py-5 relative fixed">
            <h1 className="text-center text-3xl font-bold">SMS|ADMIN</h1>
            <section className='my-10'>
            <ul className='grid gap-10'>
                <li className='cursor-pointer hover:shadow-lg hover:transition hover:bg-slate-300 p-5'>
                    <NavLink to='/admin'>
                        <FontAwesomeIcon icon={faGaugeHigh} size='2xl' className='mr-2'/>
                        <span className='text-slate-700'>Dashboard</span>
                    </NavLink>
                </li>
                <li className='cursor-pointer hover:shadow-lg hover:transition hover:bg-slate-300 p-5'>
                    <NavLink to='/admin/student'>
                        <FontAwesomeIcon icon={faGraduationCap} size='2xl' className='mr-2'/>
                        <span className='text-slate-700'>Students</span>
                    
                    </NavLink>
                </li>
                <li className='cursor-pointer hover:shadow-lg hover:transition hover:bg-slate-300 p-5'>
                    <NavLink to='/admin/teacher'>
                        <FontAwesomeIcon icon={faChalkboardUser} size='2xl' className='mr-2'/>
                        <span className='text-slate-700'>Teachers</span>
                    </NavLink>
                </li>
                <li className='cursor-pointer hover:shadow-lg hover:transition hover:bg-slate-300 p-5'>
                    <NavLink to='/admin/messages'>
                        <FontAwesomeIcon icon={faMessage} size='2xl' className='mr-2'/>
                        <span className='text-slate-700'>Messages</span>
                    </NavLink>
                </li>
            </ul>

            </section>


        </nav>
                    
    )
}

export default Navbar