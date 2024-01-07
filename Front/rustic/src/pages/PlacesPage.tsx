import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlus, FaUpload } from "react-icons/fa6";
import Perks from '../components/Perks'
import axios from "axios";



export default function PlacesPage(){

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState<any[]>([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setmaxGuests] = useState('');

    const {action} = useParams();

    async function addPhotosByLink(e:any){
        e.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link:photoLink});
        setAddedPhotos(prev => {
            return [...prev, filename]
        });
        setPhotoLink('')
    }

    function uploadPhoto(e:any){
        const files = e.target.files
        const data = new FormData()
        for(let i = 0; i < files.length; i++){
            data.append('photos', files[i])
        }
        axios.post('/upload', data,{
            headers: {"Content-Type":"multipart/form-data"}
        }).then(response => {
            const {data:filename} = response
            setAddedPhotos(prev => {
                return [...prev, filename]
            })
        })
    }

    return(
        <div>
            {action !== 'new' && (
            <div className="text-center">
                <Link to={'/account/places/new'} className="inline-flex bg-primary-color text-white py-2 px-6 rounded-full gap-1">
                    <FaPlus className="my-auto"/>Add new place
                </Link>
            </div>
            )}
            
            {action === 'new' && (
                <div>
                    <form>
                        <h2 className="text-xl mt-4">Title</h2>
                        <input 
                            type="text" 
                            placeholder="My Seaside Apartment." 
                            value={title} 
                            onChange={e => setTitle(e.target.value)} 
                        />

                        <h2 className="text-xl mt-4">Address</h2>
                        <input 
                            type="text" 
                            placeholder="13 Bukole Boulevard, Hosana Beach." 
                            value={address} 
                            onChange={e => setAddress(e.target.value)} 
                        />

                        <h2 className="text-xl mt-4">Photos</h2>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Add using a link" 
                                value={photoLink} 
                                onChange={e => setPhotoLink(e.target.value)} 
                            />
                            <button onClick={addPhotosByLink} className="bg-gray-200 px-4 grow rounded-2xl">Add&nbsp;Photos</button>
                        </div>

                        <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <label className="flex cursor-pointer items-center gap-1 justify-center border bg-transparent rounded-2xl p-4">
                                <input type="file" className="hidden" onChange={uploadPhoto} />
                                <FaUpload className="my-auto" />Upload
                            </label>
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div key={link}>
                                    <img src={'http://localhost:4000/uploads/' + link } alt="" className="rounded-2xl max-w-12"/>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-xl mt-4">Description</h2>
                        <textarea 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                        />

                        <Perks 
                            selected={perks} 
                            onChange={setPerks} 
                        />

                        <h2 className="text-xl mt-4">Extra Info</h2>
                        <textarea 
                            value={extraInfo} 
                            onChange={e => setExtraInfo(e.target.value)} 
                        />

                        <h2 className="text-xl mt-4">Check In, Check Out & Max Guests</h2>
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <h3>Check In Time</h3>
                                <input 
                                    type="number" 
                                    placeholder="12:00"
                                    value={checkIn}
                                    onChange={e => setCheckIn(e.target.value)}
                                />
                            </div>
                            <div>
                                <h3>Check Out Time</h3>
                                <input 
                                    type="number" 
                                    placeholder="12:00"
                                    value={checkOut}
                                    onChange={e => setCheckOut(e.target.value)}
                                />
                            </div>
                            <div>
                                <h3>Max Guests</h3>
                                <input 
                                    type="number" 
                                    placeholder="3"
                                    value={maxGuests}
                                    onChange={e => setmaxGuests(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="my-4">
                            <button className="primary text-white">Publish</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}