import useSWR from 'swr';
import Image, { ImageLoaderProps } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Header from '../../component/header'
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';




const fetcher = async () => {
    const req = await fetch("https://dummyjson.com/products")
    const res = await req.json();
    console.log(res);

    return res;
}

interface ProductProps {
    id: Key | null | undefined;
    thumbnail: string | undefined;
    rating: number;
    title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | null | undefined;
    description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
}
 

export default function dashboard() {
    const router = useRouter();
    const { data, error, isLoading } = useSWR('/api/user/123', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    if (!data) return <div>loading Data...</div>

    const { products } = data

    const imageLoader = () => {
        imageLoader
    }


    return (
        <div>
            <Header />
            <div className='grid xs: grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4'>
                {
                    products.map((product: ProductProps) => {
                        const urlImage = product?.thumbnail
                        return (

                            //     <Link href="/products/1">
                            //     Go Product
                            // </Link>


                            // <Link key={product.id} href={`/products/${product.id}`} className="flex flex-col items-center  border border-gray-400 shadow-xl rounded-xl mb-6">
                            //     <h1 className='text-xl bg-indigo-200 w-full text-center'>{product.title}</h1>
                            //     <Image loader={() => product.thumbnail} src={product.thumbnail} width={450} height={50} alt={product.title} className="object-cover w-full h-40" />
                            //     {/* <div className='flex flex-col w-full ml-2'>
                            //         <h1 className='text-4xl'>{product.title}</h1>
                            //         <span className='text-xl'>{product.brand}</span>
                            //         <span className='text-base'>{product.category}</span>

                            //         <div className='flex items-end'>
                            //             <span className='text-xs text-red-600 line-through'>{product.price}</span>
                            //             <span className='text-lg text-green-500 ml-1'>{product.discountPercentage}</span>
                            //         </div>
                            //         <div className='flex items-end'>
                            //             <span className='text-lg'>Rating : {product.rating} / 5</span>
                            //             <span className='text-base'>Stock : {product.stock}</span>
                            //         </div>
                            //         <span className='text-sm'>{product.description}</span>
                            //     </div> */}

                            // </Link>

                            <Card sx={{ maxWidth: 345 }}>
                                <Link key={product.id} href={`/products/${product.id}`}>
                                    <Image
                                        loader={() => product.thumbnail}
                                        src={urlImage}
                                        width={450}
                                        height={50}
                                        alt={product?.title}
                                        className="object-cover w-full h-40"
                                    />
                                    {/* <CardMedia
                                    sx={{ height: 140 }}
                                    className="object-cover w-full h-36"
                                    image={product.thumbnail}
                                    title={product.title}
                                /> */}
                                </Link>
                                <CardContent className='h-40'>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.title}
                                        {(product?.rating > 4.6) && <LoyaltyIcon />}
                                    </Typography>
                                    {/* <Typography variant="body2" color="text.secondary" className='text-ellipsis'> */}
                                    <p className='truncate'>
                                        {product.description}
                                    </p>
                                    {/* </Typography> */}
                                </CardContent>
                                <CardActions >
                                    {/* <Button size="small">Share</Button> */}
                                    <Button size="small" startIcon={<StorefrontIcon />}><a href={`https://www.tokopedia.com/search?st=product&q=${product.title}`}>E-Commerce</a></Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}
