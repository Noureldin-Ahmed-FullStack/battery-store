import { collection, deleteDoc, doc, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "./FireBaseSetup";
import Accordion from '@mui/material/Accordion';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CallIcon from '@mui/icons-material/Call';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { toast } from "react-toastify";
import { useMyContext } from "./useMyContext";
import CenteredPage from "./CenteredPage";
import NotFoundPage from "./NotFoundPage";
import { GridLoader } from "react-spinners";
interface Messages {
    id: string
    name: string,
    phone: string,
    message: string,
    createdAt: Timestamp
}
export default function Messages() {
    const [MessageArray, setMessageArray] = useState<Messages[]>([])
    const [expanded, setExpanded] = useState<string | false>(false);
    const [Loading, setLoading] = useState<boolean>(false);
    const { userDbData } = useMyContext()
    const formatDate = (timestamp: Timestamp) => {
        // Convert seconds to milliseconds
        const timestampInMilliseconds = timestamp.seconds * 1000;

        // Create a Date object
        const date = new Date(timestampInMilliseconds);

        const currentDate = new Date();

        const customTime = date.getTime();
        const currentTime = currentDate.getTime();
    
        // Calculate the time difference in milliseconds
        const timeDifference = currentTime - customTime;
    
        const seconds = Math.floor((timeDifference) / 1000);
        let interval = Math.floor(seconds / 31536000);
    
        if (interval >= 1) {
          return interval + " year" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          return interval + " month" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          return interval + " day" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
          return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
        }
        interval = Math.floor(seconds);
        if (interval >= 1) {
          return interval + " second" + (interval === 1 ? "" : "s") + " ago";
        }
        // Format the date as desired
        // const formattedDate = date.toLocaleString(); // Example: "1/1/1970, 12:00:00 AM"

        // return formattedDate;
    };
    const handleChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const DeleteMessage = async (itemID: string) => {
        const docRef = doc(db, "messages", itemID);
        await deleteDoc(docRef);
        toast.success("Message Deleted!", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        getMessages()
    }
    const getMessages = async () => {
        setLoading(true)
        try {
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const itemsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                phone: doc.data().phone,
                message: doc.data().message,
                createdAt: doc.data().createdAt as Timestamp,
            }));

            // itemsArray.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
            sessionStorage.setItem('ContactUsMessages', JSON.stringify(itemsArray))
            setMessageArray(itemsArray)
            console.log({ Fetched: querySnapshot.docs.map(doc => doc.data()) });
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }
    useEffect(() => {
        const messages = sessionStorage.getItem('ContactUsMessages')
        if (!messages) {
            getMessages()
        } else {
            console.log(JSON.parse(messages));

            setMessageArray(JSON.parse(messages))
        }
    }, [])
    if (userDbData?.role == 'admin') {
        return (
            <div className="mt-3">
                <div><Button onClick={getMessages} className="mb-2" sx={{
                    '&:hover': {
                        color: 'white !important',
                    }
                }} variant="contained" startIcon={<RefreshIcon />}>Refresh</Button></div>
                {!Loading ? (
                    MessageArray?.map((item, index) => (
                        <Accordion key={item.id} expanded={expanded === `${index}panel1`} onChange={handleChange(`${index}panel1`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography component={'div'} className="d-flex justify-content-center" sx={{ width: '33%', flexShrink: 0, textTransform: 'capitalize' }}>
                                    <div className="bg-secondary p-1 w-75 rounded-2 text-bold">
                                        {item.name}
                                    </div>
                                </Typography>
                                <Typography className="w-100 d-flex justify-content-between align-items-center" sx={{ color: 'text.secondary' }}>{item.phone} </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography component={'div'} sx={{ textAlign: 'start' }}>
                                    {item.message}
                                    <div className="d-flex justify-content-between align-items-end">
                                    <p className="m-0 text-secondary">{formatDate(item.createdAt)}</p>

                                        <div>
                                            <Button component={'a'} target="_blank" href={`tel:${item.phone}`} className="mx-1" color="info" variant="outlined"><CallIcon /></Button>
                                            <Button component={'a'} target="_blank" href={`https://wa.me/${item.phone}`} className="mx-1" color="success" variant="outlined"><WhatsAppIcon /></Button>
                                            <Button onClick={() => DeleteMessage(item.id)} className="mx-1" color="error" variant="outlined"><DeleteIcon /></Button>
                                        </div>
                                    </div>

                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <div className="mt-5">
                        <GridLoader
                            color={'#90caf9'}
                            size={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>

                )}
            </div>
        )
    } else {
        return <CenteredPage><NotFoundPage /></CenteredPage>
    }

}
