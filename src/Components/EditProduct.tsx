import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { ChangeEvent, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from './FireBaseSetup';
import { doc, setDoc } from 'firebase/firestore';
import { useMyContext } from './useMyContext';
import { Products } from './types';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface props {
    productItem: Products
}
export default function EditProduct(props: props) {
    const { productItem } = props
    const [open, setOpen] = useState(false);
    const [Category, setCategory] = useState(productItem.type);
    const [files, setFiles] = useState<File[]>([]);
    const { fetchProducts } = useMyContext()
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
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

        let category = formJson.category
        if (Category == "Other") {
            category = formJson.otherCategory
        }
        const data = {
            name: formJson.name,
            brand: formJson.brand,
            type: category,
            description: formJson.description,
            price: formJson.price,
            quantity: formJson.quantity,
            discount: formJson.discount,
            images: downloadURLs.length == 0 ? ['https://ssniper.sirv.com/Images/other%20projects/question.jpg'] : downloadURLs
        }
        console.log(data);

        const docRef = doc(db, "Products", productItem.id);
        await setDoc(docRef, data);
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
            {/* <Button variant="outlined" className="w-100" color="secondary" onClick={handleClickOpen}>Add Product</Button> */}
            <Button
                onClick={handleClickOpen}
                color='primary'
                sx={{
                    '&:hover': {
                        color: 'white !important',
                        backgroundColor: '#1976d2'
                    }
                }}
                className='noLink mx-2' variant='outlined' startIcon={<EditIcon fontSize='large' />}>Edit</Button>
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
                                    defaultValue={productItem.name}
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
                                    defaultValue={productItem.brand}
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
                                <Select
                                    required
                                    className="w-100 mt-2 overflow-hidden"
                                    labelId="category"
                                    id="category"
                                    variant='filled'
                                    name="category"
                                    value={Category}
                                    label="Age"
                                    onChange={handleCategoryChange}
                                >
                                    <MenuItem value={'Chloride EFB'}>Chloride EFB</MenuItem>
                                    <MenuItem value={'Chloride Platinum'}>Chloride Platinum</MenuItem>
                                    <MenuItem value={'Chloride Gold'}>Chloride Gold</MenuItem>
                                    <MenuItem value={'Chloride Extra Power'}>Chloride Extra Power</MenuItem>
                                    <MenuItem value={'Chloride Lithium'}>Chloride Lithium</MenuItem>
                                    <MenuItem value={'ACDelco'}>ACDelco</MenuItem>
                                    <MenuItem value={'Bosch'}>Bosch</MenuItem>
                                    <MenuItem value={'Other'}>Other</MenuItem>
                                </Select>
                            </div>
                            {Category == 'Other' ? (
                                <div className="col-6">
                                    <TextField
                                        required
                                        className='mt-2'
                                        id="otherCategory"
                                        name="otherCategory"
                                        placeholder='5'
                                        label="Other Category"
                                        type="text"
                                        fullWidth
                                        variant="filled"
                                    />
                                </div>
                            ) : (<></>)}
                            <div className="col-6">
                                <TextField
                                    required
                                    defaultValue={productItem.quantity}
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
                                    defaultValue={productItem.price}
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
                            <div className={`${Category == 'Other' ? 'col-12' : 'col-6'}`}>
                                <TextField
                                    required
                                    defaultValue={productItem.discount}
                                    className='mt-2'
                                    id="discount"
                                    name="discount"
                                    placeholder='30'
                                    label="discount"
                                    type="number"
                                    inputProps={{ min: 0, max: 100 }}
                                    fullWidth
                                    variant="filled"
                                />
                            </div>
                        </div>
                        <TextField
                            required
                            defaultValue={productItem.description}
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
                        <Button type="submit">Edit Product</Button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    )
}
