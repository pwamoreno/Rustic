import { Link } from "react-router-dom";

export default function PlacesPage(){
    return(
        <div>
            <div className="">
                <Link to={'/account/places/new'}>Add new place</Link>
            </div>
            My Places
        </div>
    )
}