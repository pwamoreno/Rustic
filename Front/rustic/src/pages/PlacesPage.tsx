import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

export default function PlacesPage(){
    return(
        <div>
            <div className="text-center">
                <Link to={'/account/places/new'} className="inline-flex bg-primary-color text-white py-2 px-6 rounded-full gap-1">
                    <FaPlus className="my-auto"/>Add new place
                </Link>
            </div>
            My Places
        </div>
    )
}