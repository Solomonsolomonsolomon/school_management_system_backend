import {useLocation, Navigate, Outlet} from 'react-router-dom';


const RequireAuth = () => {
    const location = useLocation()
    const user = sessionStorage.getItem('user')
    const accessToken = localStorage.getItem('accessToken')

    return (
        accessToken !== null && user.role !== null
        ? <Outlet /> 
        : <Navigate to={'/login'} state={{ from: location }} replace />
    )
}

export default RequireAuth