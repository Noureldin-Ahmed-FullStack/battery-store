import { Button, Grid } from '@mui/material';
import CenteredPage from './CenteredPage';
import NotFoundPage from './NotFoundPage';
import { useMyContext } from './useMyContext';
import { useParams } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
export default function ProductDetails() {
    const { Products } = useMyContext();
    const { productId } = useParams();
    const item = Products.find(product => product.id === productId);
    if (item) {
        return (
            <div className="container mt-4">
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <div className='bg-danger'>
                            <img className='w-100' src={item.images[0]} alt={item.name} />
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <div className='text-start h-100 position-relative'>
                            <h1>{item.name}</h1>
                            <div className="d-flex align-items-end">
                                <h4 className='mb-0 price'>{item.price} EGP</h4> <p className='mb-0 ms-3 text-secondary text-decoration-line-through'>{item.price} EG</p>
                            </div>
                            <p className='mt-3'>{item.description}</p>
                            <Button className='position-absolute bottom-0' variant='contained' startIcon={<WhatsAppIcon fontSize='large' />} sx={{
                                color: 'white', backgroundColor: '#25D366', '&:hover': {
                                    backgroundColor: '#1aa14c', // Change this to your desired hover color
                                }
                            }} color='success'>Book on what's app</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>

        )
    } else {
        return <CenteredPage><NotFoundPage /></CenteredPage>
    }

}
