import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(e:any){
        e.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password
            });
            alert('Registration successful, Login.')
        } catch (err) {
            alert('User already exists! Login.')
        }
    }
    return(
        <div className="mt-5 grow flex items-center justify-around">
            <div className="mb-32 ">
                <h1 className="text-3xl text-center mb-4">Register</h1>
                <form className="max-w-xl mx-auto" onSubmit={registerUser}>
                    <input 
                        type="text" 
                        placeholder="John Doe" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
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
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Have an account? <Link to='/login' className="underline text-black">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}