import useSWR from 'swr';
import { useRouter } from 'next/router';
import ImageGallery from 'react-image-gallery';
import Header from '../../component/header'
import Link from 'next/link';
import { Avatar, Rating, Paper } from '@mui/material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const fetcher = async (id: number) => {
    const req = await fetch(`https://dummyjson.com/products/${id}`)
    const res = await req.json();
    console.log(res);

    return res;
}


export default function dashboard() {
    const router = useRouter();
    const { id } = router.query
    const { data: product, error, isLoading } = useSWR(id, fetcher)

    console.log('check router ', router.query);


    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    if (!product) return <div>loading Data...</div>

    // render data
    // return <div>hello {data.name}!</div>
    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

    const productImages = product.images.map((item: any) => {
        return {
            original: item,
            thumbnail: item,
            originalWidth: 200,
            thumbnailWidth: 100,
            sizes: "100px x 100px",
        }
    })

    return (
        <div>
            <Header />
            <Link className='bg-violet-100 border shadow-xl rounded-xl w-32 py-2 pl-2 mx-4 my-2 block' href={`/dashboard`}>
                <ArrowBackIcon className='mr-2' />
                <span className='font-semibold'>CATALOG</span>
            </Link>

            <div className='mt-4 mx-2'>
                <ImageGallery items={productImages} showPlayButton={false} thumbnailPosition={"left"} lazyLoad />
            </div>
            <Paper className='mt-4 mx-2'>
                <div className='flex flex-col w-full mx-4 mt-4 pt-4'>
                    <h1 className='text-4xl'>{product.title}</h1>
                    <span className='text-xl'>{product.brand}</span>
                    <span className='text-base'>{product.category}</span>

                    <div className='flex items-end'>
                        <span className='text-lg font-bold text-green-500 mr-1'>{product.discountPercentage}</span>
                        <span className='text-xs text-red-600 line-through'>{product.price}</span>
                    </div>
                    <div className='flex items-end'>
                        <Rating name="half-rating" defaultValue={product.rating} precision={0.5} readOnly />
                        <span className='text-base'>Stock : {product.stock}</span>
                    </div>
                    <span className='text-sm'>{product.description}</span>
                </div>
                <div>



                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className='font-semibold'>Ketentuan Pengiriman dengan Sistem Dropship</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ol className='list-disc mx-4'>
                                    <li>Co-Thift tidak memperbolehkan penjual Co-Thift membeli produk dari sesama penjual di Co-Thift kemudian menjualnya kembali kepada pembeli di Co-Thift.</li>
                                    <li>Dikarenakan adanya ketentuan baru ini, 1 nomor resi hanya dapat diinput oleh 1 penjual di Co-Thift. Penjual yang menginput nomor resi yang telah diinput oleh penjual lain akan mendapat keterangan: “Co-Thift tidak memperbolehkan internal dropshipper. Dropshipping hanya bisa dilakukan ke pembeli di luar Co-Thift atau dari penjual di luar Co-Thift.“</li>
                                    <li>Apabila transaksi terindikasi sebagai dropshipper internal, dana akan dikembalikan ke pembeli. Kerugian akan sepenuhnya ditanggung oleh Internal Dropshipper.</li>
                                    <li>Layanan dropshipper pada halaman Checkout  tidak tersedia untuk transaksi yang menggunakan kurir Gojek & Grab (Instant/Same Day), promo Bebas Ongkir/Bebas Ongkir Extra dan Layanan Kurir Rekomendasi.</li>
                                    <li>Apabila terjadi kendala dalam hal pengiriman barang, Penjual yang bertindak sebagai external dropshipper tidak dapat mengajukan klaim penggantian melalui Pusat Resolusi.</li>
                                </ol>






                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className='font-semibold'>Contoh kasus</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <span className='font-medium text-base'>Simak penjelasan selengkapnya pada tabel berikut ini.</span><br />
                                <span className='text-base'>Contoh kasus:</span><br />
                                <ol>
                                    <li>Internal Dropship: Bapak Todi membeli alat pancing di toko ABC di Co-Thift lalu ingin menjualnya kembali kepada Bapak Pedi di Co-Thift.</li>
                                    <li>
                                        <dl>
                                            <dt>External Dropship:</dt>
                                            <dd>- Bapak Todi membeli alat pancing di toko ABC di Co-Thift lalu ingin menjualnya kembali kepada Bapak Pedi di platform XXX;</dd>
                                            <dd>- Bapak Todi membeli alat pancing di toko XYZ di platform XXX lalu ingin menjualnya kembali kepada Bapak Pedi di Co-Thift.</dd>
                                            <dd>- Pastikan juga apabila kamu sebagai External Dropshipper, pengiriman hanya bisa dilakukan menggunakan kurir dan layanan yang bekerjasama dengan Co-Thift (kecuali kurir Gojek & Grab, promo Bebas Ongkir/Bebas Ongkir Extra & Layanan Kurir Rekomendasi atau resi luar negeri).</dd>
                                        </dl>
                                    </li>
                                </ol>


                            </Typography>
                        </AccordionDetails>
                    </Accordion>


                </div>
            </Paper >
        </div >
    )
}
