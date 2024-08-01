import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './FireBaseSetup';
import { useMyContext } from './useMyContext';
import { useNavigate } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
interface props {
    productId: string
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function DeleteProduct(props: props) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    const { fetchProducts } = useMyContext()
    const DeleteItem = async (productId: string) => {
        const docRef = doc(db, "Products", productId);
        handleClose()
        await deleteDoc(docRef);
        navigate('/products');
        fetchProducts()
    }
    const { productId } = props
    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    This action will permanently delete this item from the system. Are you absolutely certain that you want to proceed with this irreversible operation?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color='error'
                        variant='outlined'
                        className='w-50'
                        sx={{
                            '&:hover': {
                                color: 'white !important',
                                backgroundColor: '#d32f2f'
                            }
                        }}
                        onClick={() => DeleteItem(productId)}>Delete</Button>
                </DialogActions>
            </Dialog>
            <Button
                onClick={handleClickOpen}
                color='error'
                sx={{
                    '&:hover': {
                        color: 'white !important',
                        backgroundColor: '#d32f2f'
                    }
                }}
                className='noLink px-4 mx-2' variant='outlined' startIcon={<DeleteIcon fontSize='large' />}>Delete</Button>
        </>
    )
}
