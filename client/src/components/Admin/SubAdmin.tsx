import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChildren } from '@fortawesome/free-solid-svg-icons'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill1 } from '@fortawesome/free-solid-svg-icons'
// import axios from '../../api/axios'


// const POST_URL = '/admin'
const SubAdmin = () => {

    const [error, setError] = useState("")
    const errRef = useRef<HTMLParagraphElement>(null)


    return (
        <div className='p-10 bg-gray-200'>
            <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
            <section className='grid grid-cols-4 gap-5 mt-20'>
                <div className='bg-white p-10 shadow-lg flex gap-5 rounded cursor-pointer transition ease-in delay-150 hover:-translate-y-3 duration-300 '>
                    <section className='bg-green-100 p-5 rounded-full'>
                        <FontAwesomeIcon icon={faChildren} size='2xl' className='text-green-500'/>
                    </section>
                    <section className='mt-3'>
                        <h2 className='text-xl text-slate-400'>Students</h2>
                        <p className='text-lg font-semibold'>100000</p>
                    </section>
                </div>
                <div  className='bg-white p-10 shadow-lg flex gap-5 rounded cursor-pointer transition ease-in delay-150 hover:-translate-y-3 duration-300 '>
                    <section className='bg-sky-100 p-5 px-7 rounded-full'>
                        <FontAwesomeIcon icon={faUserTie} size='2xl' className='text-sky-500'/>
                    </section>
                    <section className='mt-3'>
                        <h2 className='text-xl text-slate-400'>Teachers</h2>
                        <p className='text-lg font-semibold'>2000</p>
                    </section>
                </div>
                <div  className='bg-white p-10 shadow-lg flex gap-5 rounded cursor-pointer transition ease-in delay-150 hover:-translate-y-3 duration-300 '>
                    <section className='bg-orange-100 p-5 rounded-full'>
                    <FontAwesomeIcon icon={faUserGroup} size='2xl' className='text-orange-400' />
                    </section>
                    <section className='mt-3'>
                        <h2 className='text-xl text-slate-400 rounded'>Parents</h2>
                        <p className='text-lg font-semibold'>5000</p>
                    </section>
                </div>
                <div  className='bg-white p-10 shadow-lg flex gap-5 rounded cursor-pointer transition ease-in delay-150  hover:-translate-y-3 duration-300 '>
                    <section className='bg-red-100 p-5 rounded-full'>
                        <FontAwesomeIcon icon={faMoneyBill1} size='2xl' className='text-red-700'/>
                    </section>
                    <section className='mt-3'>
                        <h2 className='text-xl text-slate-400'>Earnings</h2>
                        <p className='text-lg font-semibold'>$193000</p>
                    </section>
                </div>
               
            </section>

            <section>
                <div>
                    
                </div>
                <div></div>
            </section>
            <section>

            </section>
            <section>

            </section>
            <section>

            </section>
        </div>
    )
}

export default SubAdmin