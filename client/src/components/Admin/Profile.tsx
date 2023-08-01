import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Profile = () => {

    const getUserData = (user) => {
        const data = sessionStorage.getItem(user);
        if (!data) {
          return {};
        }
        return JSON.parse(data);
      };
    
      const user = getUserData("user");


    const logout=()=> {
        localStorage.removeItem('accessToken')
        sessionStorage.removeItem('user')
        window.location.reload()
    }

    const toggle = () => {
        const profile = document.getElementById('profile')
        profile?.classList.toggle('hidden')
        console.log(profile)
        
    }

    return (
        <section className="bg-sky-300 shadow-lg w-full p-5 ">
            <div className=" flex justify-end gap-2 cursor-pointer" onClick={toggle}>
                <section>
                <h1 className="text-xl text-white font-bold">{user.name}</h1>
                <p className="text-sm text-gray-500">{user.role}</p>
                </section>
                <FontAwesomeIcon icon={faUser} size='2xl' className='mt-3 text-white'/>
            </div>  
            <div id="profile" className='absolute hidden transition-opacity duration-500 top-20 left-[85%] p-5 shadow-lg w-[15%] z-20 '>
                <ul className='grid gap-3  justify-center m-0 p-0'>
                    <li>
                        <FontAwesomeIcon icon={faUser}  className='mt-3 mr-2 text-sky-300'/>   
                        <span className="text-xl text-sky-300 font-bold">Profile</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faGear} className='mt-3  mr-2 text-sky-300'/>
                        <span className="text-xl text-sky-300  text-white font-bold">Settings</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faUserPlus} className='mt-3  mr-2 text-sky-300'/>
                        <span className="text-xl text-sky-300  text-white font-bold">Add Admin</span>
                    </li>
                    <li>
                        <button  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
                            Logout
                        </button>
                    </li>
                </ul>
                
            </div>
        </section>
    
    )

}

export default Profile;