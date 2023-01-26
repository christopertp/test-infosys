import type { NextPage } from 'next'
import { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Button, TextField } from '@mui/material';
import Image from 'next/image';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const fetcher = async () => {
  const req = await fetch("https://jsonplaceholder.typicode.com/posts")
  const res = await req.json();
  console.log(res);

  return res;
}

interface CredentialProps {
  userid: string,
  password: string,
}

const fetchLogin = async (credential: CredentialProps) => {
  const { userid, password } = credential

  const req = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({

      // username: 'kminchelle',
      // password: '0lelplR',
      username: userid,
      password: password,
      // expiresInMins: 60, // optional
    })
  })

  const res = await req.json();

  return res;
  // .then(res => res.json())
  // .then(console.log);
}

// const fetcher = (url: String) => fetch(url).then(res => {
//   console.log('fetcher ', res);
//   console.log('fetcher json', res.json());

//   return res.json()
// });


const Home: NextPage = () => {

  const router = useRouter();
  const [userID, setUserID] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmmited, setIsSubmmited] = useState(false)



  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   console.log('mounted');

  //   getDataPosts();
  // }, [])

  // const getDataPosts = async () => {
  //   const req = await fetch("https://jsonplaceholder.typicode.com/posts")
  //   const res = await req.json();
  //   console.log(res);

  //   setPosts(res)
  //   setLoading(false)
  //   return res;
  // }



  // function useUser(id) {
  //   const { data, error, isLoading } = useSWR(`https://jsonplaceholder.typicode.com/posts`, fetcher)


  //   console.log('useUser ', data);


  //   return {
  //     user: data,
  //     isLoading,
  //     isError: error
  //   }
  // }

  // function useLogin(userid, password) {
  //   const { data, error, isLoading } = useSWR(`https://jsonplaceholder.typicode.com/posts`, fetchLogin)


  //   console.log('useLogin ', data?.message);
  //   console.log('useLogin error ', error);

  //   // if(data?.id){
  //   //   router.push('/dashboard')
  //   //   // berhasil
  //   // }


  //   return {
  //     user: data,
  //     isLoading,
  //     isError: error
  //   }
  // }

  // const { user, isLoading } = useUser(1)
  // const { user, isLoading, isError } = useLogin(1)


  // const { data } = useSWR<any>('https://jsonplaceholder.typicode.com/posts', fetcher)



  // console.log('checking result ', isError);


  const loginHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmmited(true)

    //initialize formData
    // const formData = new FormData();


    console.log('check login ', userID, password);

    setDialogTitle('Lengkapi Form Login')
    setDialogMessage('User ID dan atau Password anda belum diisi.')
    if (!userID || userID === '') {
      setOpen(true);
    } else if (!password || password === '') {
      setOpen(true);
    }

    const credential = {
      userid: userID,
      password
    }
    const fetchResult = await fetchLogin(credential)

    if (fetchResult?.message) {
      setDialogTitle("Invalid")
      setDialogMessage(fetchResult.message)
      setIsSubmmited(false)
      setOpen(true)
    } else if (fetchResult?.id > -1) {
      console.log('berhasil');
      // 0lelplR
      router.push('/dashboard')
      // email 
      // firstName 
      // gender 
      // id 
      // image 
      // lastName 
      // token 
      // username 
    }
    console.log('fetchresult ', fetchResult, fetchResult.id);



    // const { user, isLoading, isError } = useLogin(1)

    // console.log('checking result login', isError);


    //append data to formData
    // formData.append('email', email);
    // formData.append('password', password);

    //send data to server
    // await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, formData)
    //   .then((response) => {

    //     //set token on cookies
    //     Cookies.set('token', response.data.token);

    //     //redirect to dashboard
    //     Router.push('/dashboard');
    //   })
    //   .catch((error) => {

    //     //assign error to state "validation"
    //     setValidation(error.response.data);
    //   })
  };



  // return (
  //   <div className="flex min-h-screen flex-col items-center justify-center py-2">
  //     <Head>
  //       <title>Create Next App</title>
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
  //       <div className="bg-white rounded-2xl shadow-xl flex flex-row w-2/3 max-w-4xl">
  //         <div className='w-3/5 p-5'>
  //           <div className='text-left font-bold'>
  //             <span className='text-green-500'>Company</span>Name
  //           </div>
  //           <div className='py-10'>
  //             <h2 className='text-green-500 mb-2'>Sign in to Account</h2>
  //             <div className='border-2 w-10 border-green-500 inline-block mb-2'></div>
  //             <div className='flex flex-row justify-center my-2'>
  //               <a href="#" className='border-2 border-grey-200 rounded-full p-2 mx-1'>
  //                 <FaFacebookF className='text-sm' />
  //               </a>
  //               <a href="#" className='border-2 border-grey-200 rounded-full p-2 mx-1'>
  //                 <FaLinkedinIn className='text-sm' />
  //               </a>
  //               <a href="#" className='border-2 border-grey-200 rounded-full p-2 mx-1'>
  //                 <FaGoogle className='text-sm' />
  //               </a>
  //             </div>{/* Social Login Section */}
  //             <p className='text-gray-400 my-3'>or user you email account</p>
  //             <div className='flex flex-col items-center'>
  //               <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
  //                 <FaRegEnvelope className='text-gray-400 m-2' />
  //                 <input type="email" name="email" placeholder="Email" className='bg-gray-100 outline-none text-sm flex-1' />
  //               </div>
  //               <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
  //                 <MdLockOutline className='text-gray-400 m-2' />
  //                 <input type="password" name="password" placeholder="Password" className='bg-gray-100 outline-none text-sm flex-1' />
  //               </div>
  //               <div className='flex justify-between w-64 mb-5'>
  //                 <label className='flex items-center text-xs '>
  //                   <input type="checkbox" name="remember" className='mr-1' />Remember me
  //                 </label>
  //                 <a href='#' className='text-xs'>Forgot Password?</a>
  //               </div>

  //               <a href='#' className='border-2 border-green rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'>Sign In</a>
  //             </div>
  //           </div>
  //         </div> {/*Sign In Section*/}
  //         <div className='w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
  //           <h2 className='text-3xl font-bold mb-2'>Hello, Friend!</h2>
  //           <div className='border-2 w-10 border-white inline-block mb-2'></div>
  //           <p className='mb-10'>Fill up personal information and start journey with us.</p>
  //           <a href='#' className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500'>Sign Up</a>
  //         </div> {/*Sign Up Section*/}
  //       </div>



  //       {user?.message === "Invalid credentials" ? 'Salah Akun' : 'berhasil'}
  //       {/* <div>{JSON.stringify(data)}</div> */}

  //       {/* {
  //         false
  //           ? <div>Loading...</div>
  //           : posts.map(post => (
  //             <div key={post.id}>
  //               <h4>{post.title}</h4>
  //             </div>
  //           ))
  //       } */}
  //     </main>
  //   </div>
  // )

  // const url = "https://images.unsplash.com/photo-1637734433731-621aca1c8cb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=404&q=80"


  // return (
  //   <Image className="h-48 w-full object-cover md:h-full md:w-48" loader={() => url} src={url}  width={200} height={50}  alt="Modern building architecture"></Image>
  // )


  // return (
  //   <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  //     <div class="md:flex">
  //       <div class="md:shrink-0">
  //         <Image className="h-48 w-full object-cover md:h-full md:w-48" loader={() => url} src={url} width={200} height={50} alt="Modern building architecture"></Image>
  //       </div>
  //       <div class="p-8">
  //         <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
  //         <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
  //         <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
  //       </div>
  //     </div>
  //   </div>
  // )
  // xs:bg-orange-200 md:bg-orange-400 lg:bg-orange-800
  return (
    <>
      <div className='flex flex-col items-center w-full h-full pt-32 px-8 '>
        <Image src="/header-login.png" width={150} height={30} alt="header-login" className='absolute top-0 left-0 -z-20 md:w-56 lg:w-72' />
        <Image src="/logo.png" width={150} height={50} alt="logo" className=' ' />
        <div className='mx-8 mt-16  h-full w-96 '>
          <div className=' '>
            <h3 className='font-medium text-3xl'>Login</h3>
            <p className='font-medium '>Please sign in to continue</p>
          </div>




          <form onSubmit={loginHandler}>
            <div className='flex flex-col mt-8'>
              <div className='flex flex-col mb-8'>
                <p className='font-normal'>User ID</p>
                <TextField id="User ID" label="User ID" variant="standard" value={userID} onChange={(e) => setUserID(e.target.value)} />
              </div>
              <div className='flex flex-col mb-8'>
                <p className='font-normal'>Password</p>
                <TextField id="Password" label="Password" type="password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className='flex justify-end mt-6'>
              {/* ${isSubmmited ? 'bg-indigo-50' : 'bg-indigo-800'} */}
              <button type="submit" disabled={isSubmmited}
                className={`
               px-8 py-2
                text-white 
                rounded-3xl 
                ${isSubmmited ? 'bg-indigo-50' : 'bg-indigo-800'}
                ${isSubmmited ? 'hover:bg-indigo-50' : 'hover:bg-violet-600'} 
               `}>
                LOGIN
              </button>
            </div>
          </form>

        </div>

        <div className='flex absolute bottom-0 mb-12'>
          <p className='text-gray-400'>Don't have an account? <span className='text-red-500'>Sign Up</span></p>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

// function HomeSWR() {
//   const { data, error, isLoading } = useSWR('/api/user/123', fetcher)

//   if (error) return <div>failed to load</div>
//   if (isLoading) return <div>loading...</div>

//   // render data
//   // return <div>hello {data.name}!</div>
//   return data.map(post => (
//     <div key={post.id}>
//       <h4>{post.title}</h4>
//     </div>
//   ))
// }

export default Home
// export default HomeSWR
