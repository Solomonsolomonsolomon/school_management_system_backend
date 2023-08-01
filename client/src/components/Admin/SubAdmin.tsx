import { useState, useRef } from 'react'
// import axios from '../../api/axios'


// const POST_URL = '/admin'
const SubAdmin = () => {

    const [error, setError] = useState("")
    const errRef = useRef<HTMLParagraphElement>(null)


    return (
        <div className='p-10 bg-gray-200'>
            <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
            <section>
                <div>
                    <section>

                    </section>
                    <section>
                        <h2>Students</h2>
                        <p></p>
                    </section>
                </div>
                <div>
                    <section>

                    </section>
                    <section>
                        <h2>Teachers</h2>
                        <p></p>
                    </section>
                </div>
                <div>
                    <section>

                    </section>
                    <section>
                        <h2>Parents</h2>
                        <p></p>
                    </section>
                </div>
                <div>
                    <section></section>
                    <section>
                        <h2>Earnings</h2>
                        <p></p>
                    </section>
                </div>
               
            </section>
            <section>

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