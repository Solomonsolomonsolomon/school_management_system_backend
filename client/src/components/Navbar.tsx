import { NavLink } from 'react-router-dom';

const Navbar = ()=> {


    return (
        <nav className="bg-white shadow-lg">
            <h1>SMS</h1>
            <section>
            <ul>
                <li><NavLink to='/Admin'>Home</NavLink></li>
                <li><NavLink to='/Admin/Student'>Students</NavLink></li>
                <li><NavLink to='/Admin/Teachers'>Teachers</NavLink></li>
                <li><NavLink>Messages</NavLink></li>
                <li><NavLink>Analytics</NavLink></li>
            </ul>
            </section>
            <section>

            </section>

        </nav>
                    
    )
}

export default Navbar