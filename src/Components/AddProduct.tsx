import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from './FireBaseSetup';
import { addDoc, collection } from 'firebase/firestore';
import { useMyContext } from './useMyContext';


export default function AddProduct() {
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
   const {fetchProducts} = useMyContext()
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const promises = files.map(file => {
            const storageRef = ref(storage, `photos/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            return uploadTask.then(snapshot => getDownloadURL(snapshot.ref));
        });
        const downloadURLs = await Promise.all(promises);
        
        const data = {
            name: formJson.name,
            brand: formJson.brand,
            type: formJson.category,
            description: formJson.description,
            price: formJson.price,
            quantity: formJson.quantity,
            discount: formJson.discount,
            images: downloadURLs.length == 0? ['https://ssniper.sirv.com/Images/unknown.jpg'] : downloadURLs
        }
        console.log(data);
        await addDoc(collection(db, "Products"), data);
        fetchProducts()
        handleClose();
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className=" w-100">
            <Button variant="outlined" className="w-100" color="secondary" onClick={handleClickOpen}>Add Product</Button>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
            // onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            //     event.preventDefault();
            //     const formData = new FormData(event.currentTarget);
            //     const formJson = Object.fromEntries((formData as any).entries());
            //     const data = {
            //         name: formJson.name,
            //         brand: formJson.brand,
            //         type: formJson.category,
            //         description: formJson.description,
            //         price: formJson.price,
            //         quantity: formJson.quantity,
            //         discount: formJson.discount,
            //         images: downloadURLs
            //     }
            //     console.log(data);
            //     await addDoc(collection(db, "Products"), data);
            //     handleClose();
            // },
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                        <input type="file" className='form-control' multiple onChange={handleFileChange} />
                        <div className="row">
                            <div className="col-6">
                                <TextField
                                    required
                                    className='mt-2'
                                    id="name"
                                    name="name"
                                    placeholder='AGM 80L - 12/80 AH'
                                    label="product name"
                                    type="text"
                                    fullWidth
                                    variant="filled"
                                />
                            </div>
                            <div className="col-6">
                                <TextField
                                    required
                                    className='mt-2'
                                    id="brand"
                                    name="brand"
                                    placeholder='Bosch'
                                    label="Brand"
                                    type="text"
                                    fullWidth
                                    variant="filled"
                                />
                            </div>
                            <div className="col-6">
                                <TextField
                                    required
                                    className='mt-2'
                                    id="category"
                                    name="category"
                                    placeholder='Bosch'
                                    label="category"
                                    type="text"
                                    fullWidth
                                    variant="filled"
                                />
                            </div>
                            <div className="col-6">
                                <TextField
                                    required
                                    className='mt-2'
                                    id="quantity"
                                    name="quantity"
                                    placeholder='5'
                                    label="quantity"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    fullWidth
                                    variant="filled"
                                />
                            </div>
                            <div className="col-6">
                                <TextField
                                    required
                                    className='mt-2'
                                    id="price"
                                    name="price"
                                    placeholder='7250'
                                    label="price"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    fullWidth
                                    variant="filled"
                                />
                            </div>
                            <div className="col-6">
                                <TextField
                                    required
                                    className='mt-2'
                                    id="discount"
                                    name="discount"
                                    placeholder='30'
                                    label="discount"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    fullWidth
                                    variant="filled"
                                />
                            </div>
                        </div>
                        <TextField
                            required
                            className='mt-2'
                            id="description"
                            name="description"
                            placeholder='The discount applies if the old battery is exchanged for a new battery of the same model'
                            multiline
                            label="description"
                            type="text"
                            fullWidth
                            variant="filled"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add Product</Button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    )
}
