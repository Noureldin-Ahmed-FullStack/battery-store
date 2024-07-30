import { Button, Grid, Paper } from '@mui/material';
import CenteredPage from './CenteredPage';
import NotFoundPage from './NotFoundPage';
import { useMyContext } from './useMyContext';
import { useLocation, useParams } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function ProductDetails() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500
    };
    const { Products } = useMyContext();
    const { productId } = useParams();
    const item = Products.find(product => product.id === productId);
    if (item) {
        const discountedPrice = item.price - (item.price * item.discount / 100)
        const location = useLocation();
        const fullUrl = window.location.origin + location.pathname + location.search + location.hash;
        return (
            <div className=" w-100 mt-4 exo-2 container ">
                <Paper className="alert text-start p-4" sx={{ backgroundColor: 'grey-900' }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>

                        {/* <div className=''>
                            <img className='w-100' src={item.images[0]} alt={item.name} />
                        </div> */}
                        <Slider {...settings}>
                            {item.images.map((image, index) => (
                                <div key={index} className=' w-100'>
                                    <img src={image} className='productDetailsImage w-100 position-relative' alt="" />
                                    {item.discount ? (
                                        <div className='bg-danger text-light px-2 position-absolute top-10 rounded-L-0'>{item.discount}% off</div>
                                    ) : (<></>)}
                                </div>
                            ))}
                        </Slider>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <div className='text-start h-100 position-relative'>
                            <h1>{item.type +" - "+item.name}</h1>
                            {item.discount ? (
                                <div className="d-flex align-items-end">
                                    <h4 className='mb-0 price exo-2-bold'>{discountedPrice} EGP</h4> <p className='mb-0 ms-3 text-secondary text-decoration-line-through'>{item.price} EGP</p>
                                </div>
                            ) : (
                                <div className="d-flex align-items-end">
                                    <h4 className='mb-0 price exo-2-bold'>{item.price} EGP</h4>
                                </div>
                            )}

                            <p className='mt-3 pb-5'>{item.description}</p>
                            <Button className='position-absolute bottom-0 noLink' variant='contained' startIcon={<WhatsAppIcon fontSize='large' />}
                                component={'a'}
                                href={`https://wa.me/201116074576?text=Hi%2C%20I%20am%20interested%20in%20this%20product%3A%0A${fullUrl}%0A%7BImage%20of%20product%7D%0Aname%3A%20${item.name}%2C%0Aprice%3A%20${discountedPrice}%2E`}
                                target='_blank'
                                sx={{
                                    width: { xs: '100%', sm: 'auto' },
                                    color: 'white', backgroundColor: '#25D366', '&:hover': {
                                        color: 'white !important',
                                        backgroundColor: '#1aa14c', // Change this to your desired hover color
                                    }
                                }} color='success'>Book on what'sapp</Button>
                        </div>
                    </Grid>
                </Grid>
                </Paper>
                
            </div>

        )
    } else {
        return <CenteredPage><NotFoundPage /></CenteredPage>
    }

}
