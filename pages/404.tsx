
import Image from 'next/image';

export default function Custom404() {
    return (
        <div
            className=" 
            flex
            items-center
            justify-center
            w-screen
            h-screen
            "
        >
            <Image src="/footer-splash.png" width={150} height={30} alt="header-login" className='absolute bottom-0 left-0 -z-20 md:w-72 lg:w-96' />
            <div className="px-10 py-20 
            md:px-20
            lg:px-40
            bg-gradient-to-t
            from-violet-900
            to-indigo-900  rounded-md shadow-xl">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-indigo-200 text-9xl">404</h1>

                    <h6 className="mb-2 text-lg md:text-1xl lg:text-3xl font-bold text-center text-indigo-100 md:text-3xl">
                        <span className="text-red-500">Oops!</span> Page not found
                    </h6>

                    <p className="mb-8 text-center text-indigo-100 md:text-lg">
                        The page you’re looking for doesn’t exist.
                    </p>

                    <a
                        href="./"
                        className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
                    >Go home</a
                    >
                </div>
            </div>

            <Image src="/header-splash.png" width={150} height={30} alt="header-login" className='absolute top-0 right-0 -z-20 md:w-72 lg:w-96' />

        </div>
    )
}
