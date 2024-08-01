import { collection, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "./FireBaseSetup";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CallIcon from '@mui/icons-material/Call';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { toast } from "react-toastify";
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
        try {
            const querySnapshot = await getDocs(collection(db, "messages"));
            const itemsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                phone: doc.data().phone,
                message: doc.data().message,
                createdAt: doc.data().createdAt as Timestamp,
            }));
            sessionStorage.setItem('ContactUsMessages', JSON.stringify(itemsArray))
            setMessageArray(itemsArray)
            console.log({ Fetched: querySnapshot.docs.map(doc => doc.data()) });
        } catch (error) {
            console.log(error);
        }
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

    return (
        <div className="mt-3">
            {MessageArray?.map((item, index) => (
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

                            <div className="d-flex justify-content-end">
                               <div>
                               <Button component={'a'} target="_blank" href={`tel:${item.phone}`} className="mx-1" color="info" variant="outlined"><CallIcon /></Button>
                                <Button component={'a'} target="_blank" href={`https://wa.me/${item.phone}`} className="mx-1" color="success" variant="outlined"><WhatsAppIcon /></Button>
                                <Button onClick={() => DeleteMessage(item.id)} className="mx-1" color="error" variant="outlined"><DeleteIcon /></Button>
                               </div>
                            </div>

                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}
