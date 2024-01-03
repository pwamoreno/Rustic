import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../components/UserContext";

export default function LoginPage(){
     
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const {setUser}:any = useContext(UserContext);

    async function loginUser(e:any){
        e.preventDefault();
        const response = await axios.post('/login', {
            email,
            password
        });
        // console.log(response.data._id)
        if(response.data._id){
            setUser(response.data);
            alert('Login successful');
        }else{
            alert('Login failed!')
        }
        if(redirect){
            return navigate('/');
        }
    }

    

    return(
        <div className="mt-5 grow flex items-center justify-around">
            <div className="mb-32 ">
                <h1 className="text-3xl text-center mb-4">Login</h1>
                <form className="max-w-xl mx-auto" onSubmit={loginUser}>
                    <input type="email" 
                    placeholder="your@mail.com" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="primary" onClick={() => setRedirect(true)}>Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account? <Link to='/register' className="underline text-black">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}