import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import PlacesPage from "./PlacesPage";
import axios from "axios";


export default function AccountPage(){
    const navigate = useNavigate()

    const {user,setUser, ready}:any = useContext(UserContext);
    const [redirect, setRedirect] = useState('')

    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile'
    }
    // console.log(subpage)
    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null)
    }


    if(!ready){
        return 'Loading...'
    }

    if(ready && !user && !redirect){
        navigate('/login')
    }

    function linkClasses(type:string){
        let classes = 'py-2 px-6';
        if(type === subpage){
            classes += ' bg-primary-color text-white rounded-full';
        }
        return classes;
    }

    if(redirect){
        navigate(`${redirect}`)
    }


    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link to={'/account'} className={linkClasses('profile')}>My Profile</Link>
                <Link to={'/account/bookings'} className={linkClasses('bookings')}>My Bookings</Link>
                <Link to={'/account/places'} className={linkClasses('places')}>My Accommodations</Link>
            </nav>

            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    <h2>Logged in as {user?.name} ({user?.email})</h2>
                    <button className="primary max-w-sm mt-2 text-white" onClick={logout}>Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}