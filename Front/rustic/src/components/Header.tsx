import { useContext } from 'react';
import rustic from '../assets/rustic.svg';
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

const Header = () => {
    const {user}:any = useContext(UserContext)
  return (
    <div>
        <header className='flex items-center justify-between'>
            <Link to={'/'}>
                <div className='flex items-center gap-1'>
                    <img src={rustic} alt='logo' className='w-9' />
                    <p className='text-bold text-2xl text-primary-color'>Rustic</p>
                </div>
            </Link>
            <div className='flex gap-2 border border-gray-300 rounded-full py-1 px-4 shadow-md shadow-gray-300'>
                <p>Anywhere</p>
                <span className='border-l border-gray-300'></span>
                <p>Any week</p>
                <span className='border-l border-gray-300'></span>
                <p className='text-gray-400'>Add guests</p>
                <button className='bg-primary-color p-2 rounded-full'>
                    <FaSearch className='text-white text-sm' />
                </button>
            </div>
            <Link to={user? '/account' : '/login'}>
                <div className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 hover:shadow-md shadow-gray-300 text-gray-500 '>
                    <GiHamburgerMenu className='cursor-pointer' />
                    <FaUserCircle className='text-2xl cursor-pointer' />
                    {!!user && (
                        <div>
                            {user.name}
                        </div>
                    )}
                </div>
            </Link>
        </header>
    </div>
  )
}

export default Header