import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import PlacesPage from "./PlacesPage";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { IoMdBook } from "react-icons/io";
import { RiHomeHeartLine } from "react-icons/ri";


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
        let classes = 'inline-flex py-2 px-6 gap-1 rounded-full';
        if(type === subpage){
            classes += ' bg-primary-color text-white';
        }else{
            classes += ' bg-gray-200'
        }
        return classes;
    }

    if(redirect){
        navigate(`${redirect}`)
    }


    return (
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link to={'/account'} className={linkClasses('profile')}>
                    <CgProfile className=" my-auto"/> My Profile
                </Link>
                <Link to={'/account/bookings'} className={linkClasses('bookings')}>
                    <IoMdBook className=" my-auto"/> My Bookings
                </Link>
                <Link to={'/account/places'} className={linkClasses('places')}>
                    <RiHomeHeartLine className=" my-auto"/> My Accommodations
                </Link>
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