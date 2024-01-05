import { MdPets } from "react-icons/md";
import { PiTelevisionSimpleBold, PiOfficeChairBold } from "react-icons/pi";
import { FaWifi, FaCar, FaDoorOpen } from 'react-icons/fa';


export default function Perks({ selected, onChange }:any){
    return(
        <div>
         <h2 className="text-xl mt-4">Perks</h2>
            <div className="grid gap-2 grid-cols-2 mt-2 md:grid-cols-3 lg:grid-cols-6">
                <label className="flex gap-1 items-center border p-4 rounded-2xl">
                    <input type="checkbox" />
                    <FaWifi className="ml-2"/>
                    <span>WiFi</span>
                </label>
                <label className="flex gap-1 items-center border p-4 rounded-2xl">
                    <input type="checkbox" />
                    <FaCar className="ml-2"/>
                    <span>Free parking</span>
                </label>
                <label className="flex gap-1 items-center border p-4 rounded-2xl">
                    <input type="checkbox" />
                    <PiTelevisionSimpleBold className="ml-2"/>
                    <span>TV</span>
                </label>
                <label className="flex gap-1 items-center border p-4 rounded-2xl">
                    <input type="checkbox" />
                    <MdPets className="ml-2"/>
                    <span>Pets</span>
                </label>
                <label className="flex gap-1 items-center border p-4 rounded-2xl">
                    <input type="checkbox" />
                    <FaDoorOpen className="ml-2"/>
                    <span>Private entrance</span>
                </label>
                <label className="flex gap-1 items-center border p-4 rounded-2xl">
                    <input type="checkbox" />
                    <PiOfficeChairBold className="ml-2"/>
                    <span>Dedicated workspace</span>
                </label>
            </div>
        </div>
    )
}