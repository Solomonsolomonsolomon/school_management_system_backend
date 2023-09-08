
//import axios from '../.../api/axios'

const Students = ()=> {
    // const [Students, setStudents] = useState([])
    // const [error, setError] = useState(null)

    // useEffect(()=> {
    //     let isMounted = true
    //     const controller = new AbortController()

    //     const getStudents = async ()=> {
    //         try {
    //             const res = await axios.get('/admin/get/students', {
    //                 signal: controller.signal
    //             })
    //             console.log(res.data)
    //             isMounted && setStudents(res.data)
    //             if(isMounted) {
    //                 setStudents(res.data)
    //             }
    //         } catch(err) {
    //             if(isMounted) {
    //                 setError(err)
    //             }
    //         }
    //     }
    //     getStudents
    //     return ()=> {
    //         isMounted = false
    //         controller.abort()
    //     }
    // }, [])

    return(
        <main>
            <h2>Students</h2>
           {/* {
            Students.length ?
            
                {
                Students.map((student, i)=> 
                <ul>
                    <li key={i}>{student?.firstName} {student?.lastName}</li>
                    <li key={i}>{student?.class}</li>
                    <li key={i}>{student?.age}</li> 
                 </ul>
                )}
       
            : <p>No Students</p>
            } */}
        </main>
    )
}

export default Students