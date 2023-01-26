
import { Avatar, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';


export default function header() {
    const router = useRouter();

    const onLogout = () => {
        router.push("/");
    }

    return (
        <div className='flex flex-row justify-between px-4 py-6 bg-indigo-600 rounded-b-xl shadow-xl '>
            <Avatar alt="Profile Image" src="https://mui.com/static/images/avatar/3.jpg" className='border border-white' />
            <h3 className='text-3xl font-bold text-white'>Co-Thift Member Hot Products</h3>
            <IconButton color="secondary" aria-label="logout" onClick={onLogout}>
                <LogoutIcon className='bg-white border border-white rounded-full py-1' fontSize="large" />
            </IconButton>
        </div>
    )
}
