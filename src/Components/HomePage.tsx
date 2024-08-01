import './Styles/Home.css'
import './Styles/Buttons.css'
import { useMyContext } from './useMyContext';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Map from './Map';
import { InputAdornment, Paper, TextField, Tooltip } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Gallery from './Gallery';
import FancyDiv from './FancyDiv';
import MyCarousel from './MyCarousel';
import Reveal from './Reveal';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from './FireBaseSetup';
import { ReactElement } from 'react';
import { Messages } from './types';
import { toast } from 'react-toastify';
interface contactCardProps {
  icon: React.ReactNode
  Header: string
  paragraph: string
  href: string
}
interface IconnedLinkProps {
  icon: ReactElement
  Header: string
  href: string
}

function ContactCard(props: contactCardProps) {
  const { Header, icon, paragraph, href } = props
  return (
    <Paper className=" py-3 text-start w-100 rounded-3 my-1 text-decoration-none pointer noLink" component={'a'} href={href} target='_blank' sx={{ backgroundColor: 'grey-900' }}>
      <div className="row">
        <div className="col-4 d-flex justify-content-center align-items-center">{icon}</div>
        <div className="col-8">
          <h5 className='mb-1'>{Header}</h5>
          <p className='text-secondary m-0'>{paragraph}</p>
        </div>
      </div>
    </Paper>
  )
}
function IconnedLink(props: IconnedLinkProps) {
  const { Header, icon, href } = props
  return (
    <Tooltip followCursor title={Header}>
      <a href={href} target='_blank'>
        {icon}
      </a>
    </Tooltip>
  )
}

export default function HomePage() {
  const SubmitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const data: Messages = {
      name: formJson.name,
      phone: formJson.phone,
      message: formJson.message,
      createdAt: serverTimestamp() as Timestamp
    }
    console.log(data);
    try {
      await addDoc(collection(db, "messages"), data);
      toast.success("Message Submitted!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    form.reset();
  }
  const { Theme } = useMyContext();
  return (
    <>
      <div className="bgImageContainer ubuntu-regular">
        <div className='overlayText container'>
          <div className="w-50">
            <Reveal direction={'top'} width='Full'>
              <h1 style={{ fontSize: '6vw' }}>Find your car Battery</h1>
            </Reveal>
          </div>
          <Reveal direction={'top'} width='Full'>
            <p>Lorem ipsum dolom voluptate quod a alias dolorum, nobis architecto excepturi aliquid</p>
          </Reveal>
          <Reveal direction={'right'} width='Full'>
            <div className="wrapper">
              <a className='wrapperAnchor'><span><i className="fa-solid fa-cart-shopping"></i> SHOP NOW!</span></a>
            </div>
          </Reveal>
        </div>

      </div>
      <div className='ubuntu-regular mt-5 position-relative'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 text-start">
              <Reveal direction={'right'} width='Full'>
                <h1 className='text-bold'>Reliable Car Batteries for sale at Battery-Store</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos nesciunt distinctio assumenda temporibus explicabo ea laboriosam quibusdam doloribus sunt cum dignissimos itaque, enim, animi doloremque in architecto! At nobis magni quasi voluptatum culpa, delectus iusto distinctio cum possimus fuga nam itaque sint facilis soluta! Expedita sed omnis facilis magnam.</p>
              </Reveal>
            </div>
            <div className="col-md-5">
              <Reveal direction={'left'} width='Full'>
                <img draggable={false} className='w-100 rounded-3' src="https://ssniper.sirv.com/Images/other%20projects/battery3.jpg" loading='lazy' alt="car battery" />
              </Reveal>
            </div>
          </div>
        </div></div>
      <FancyDiv Theme={Theme}>
        <div className={`${Theme == 'light' ? 'myLight' : 'myDark'} text-start ubuntu-regular`}>
          <Reveal direction={'top'} width='full'>
            <div className='container py-5'>
              <h2 className='py-2'>About us</h2>
              <p className='py-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid perspiciatis tempore praesentium quod doloremque ducimus dignissimos ut dolorem cumque, fuga, deleniti accusantium! Architecto assumenda, aliquid quam, maiores error recusandae similique deleniti tempore quae saepe adipisci eos excepturi sapiente dicta nostrum.</p>
              <p className='m-0 p-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, eligendi quisquam. Nam, soluta. Voluptate ea possimus, illo sed fuga ex omnis eius delectus doloremque mollitia itaque qui. Exercitationem, temporibus at nesciunt repudiandae culpa excepturi eius pariatur necessitatibus similique perspiciatis error rem. Excepturi a nesciunt qui non magni! Aliquam, obcaecati sapiente?</p>
            </div>
          </Reveal>

        </div>
      </FancyDiv>

      <Reveal direction={'top'} width='full'>
        <section className={`w-100`}>
          <MyCarousel />
        </section>
      </Reveal>


      <FancyDiv Theme={Theme}>
        <div className={`${Theme == 'light' ? 'myLight' : 'myDark'} text-start py-5 ubuntu-regular`}>

          <Reveal direction={'bottom'} width='Full'>
            <div className="container">
              <Gallery />
            </div>
          </Reveal>
        </div>
      </FancyDiv>
      <div className="py-5 text-start ubuntu-regular position-relative">
        <div className="container d-flex justify-content-center">
          <div className="row justify-content-center w-100 ">
            <div className="col-md-5 disapear-md">
              <Reveal direction={'right'} width='Full'>
                <div className="w-100 h-100 d-flex flex-column justify-content-between">
                  <ContactCard href='tel:+1234567890' Header='Phone Number' paragraph='+20 123456456' icon={<i className={`fa-solid fa-phone squareAspectRatio heart ContactIcon ${Theme == 'dark' ? 'ContactIcon-dark' : 'ContactIcon-light'}`}></i>} />
                  <ContactCard href='https://wa.me/12345678901' Header="What'sapp" paragraph='+20 123456456' icon={<i className={`fa-brands fa-whatsapp squareAspectRatio heart ContactIcon ${Theme == 'dark' ? 'ContactIcon-dark' : 'ContactIcon-light'}`}></i>} />
                  <ContactCard href='mailto:battery@gmail.com' Header='Email' paragraph='battery@gmail.com' icon={<i className={`fa-solid fa-envelope squareAspectRatio heart ContactIcon ${Theme == 'dark' ? 'ContactIcon-dark' : 'ContactIcon-light'}`}></i>} />
                  <ContactCard href='https://maps.google.com/maps?q=mena+palace' Header='Location' paragraph='32rd Haram zagloul' icon={<i className={`fa-solid fa-map-location-dot squareAspectRatio heart ContactIcon ${Theme == 'dark' ? 'ContactIcon-dark' : 'ContactIcon-light'}`}></i>} />
                </div>
              </Reveal>
            </div>
            <div className="col-md-5 show-md">
              <div className="container">
                <Paper className="alert text-start pt-1 pb-0 px-0 my-2 row justify-content-around" sx={{ backgroundColor: 'grey-900' }}>
                  <div className="pointer w-100 col-4 d-flex justify-content-around align-items-center">

                    <IconnedLink href='tel:+1234567890' Header='Phone Number' icon={<i className={`fa-solid fa-phone squareAspectRatio heart ContactIcon ${Theme == 'dark' ? 'ContactIcon-dark' : 'ContactIcon-light'}`}></i>} />
                    <IconnedLink href='https://wa.me/12345678901' Header="What'sapp" icon={<i className={`fa-brands fa-whatsapp squareAspectRatio heart ContactIcon ${Theme == 'dark' ? 'ContactIcon-dark' : 'ContactIcon-light'}`}></i>} />
                    <IconnedLink href='mailto:battery@gmail.com' Header='Email' icon={<i className={`fa-solid fa-envelope squareAspectRatio heart ContactIcon ${Theme == 'dark' ? 'ContactIcon-dark' : 'ContactIcon-light'}`}></i>} />
                    <IconnedLink href='https://maps.google.com/maps?q=mena+palace' Header='Location' icon={<i className={`fa-solid fa-map-location-dot squareAspectRatio heart ContactIcon ${Theme == 'dark' ? 'ContactIcon-dark' : 'ContactIcon-light'}`}></i>} />
                    {/* <div className="pointer w-100 col-4 d-flex justify-content-center align-items-center">
                    <Tooltip className='' followCursor title={"phone"}>
                      <a href="">
                        <i className={`fa-solid fa-phone squareAspectRatio ContactIcon ${Theme == 'dark' ? 'ContactIcon-dark' : 'ContactIcon-light'}`}></i>
                      </a>
                    </Tooltip>
                  </div> */}
                  </div>
                </Paper>
              </div>

            </div>
            <div className="col-md-7">
              <Reveal direction={'left'} width='Full'>
                <Paper className="alert text-start w-100 mb-0" sx={{ backgroundColor: 'grey-900' }}>
                  <h2 className='mt-2 mb-0'>Contact Us Today</h2>
                  <p className='mb-4 text-secondary'>Have questions about our products or services? Our dedicated team is ready to assist you. Contact us today.</p>
                  <form onSubmit={SubmitContact}>
                    <div className="row">
                      <div className="col-6">
                        <TextField name='name' placeholder='Name' InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleOutlinedIcon />
                            </InputAdornment>
                          ),
                        }} fullWidth required type='text' label="Name" variant="outlined" /></div>
                      <div className="col-6"><TextField name='phone' placeholder='Phone' InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneAndroidIcon />
                          </InputAdornment>
                        ),
                      }} fullWidth required type='tel' label="Phone" variant="outlined" /></div>
                      <div className="col-12 mt-2"><TextField name='message' fullWidth required label="Message" variant="outlined" multiline rows={3} /></div>

                      <div className="wrapper">
                        <button type='submit' className='SendButton w-100 mt-4'><span><i className="fa-solid fa-paper-plane"></i> Submit</span></button>
                      </div>
                    </div>
                  </form>
                </Paper>

              </Reveal>
            </div>
          </div>
        </div>

      </div>
      <section className=''>
        <Reveal direction={'top'} width='Full'>
          <Paper className="alert py-4 text-center my-1 w-100 text-decoration-none pointer noLink" sx={{ backgroundColor: 'grey-900' }}>
            <div className="d-flex flex-column align-items-center">
              <h2>Find us on Google Maps</h2>
              <p className='text-secondary'>Easily find our location by searching for us on Google Maps.</p>
              <div className="w-75">
                <Map />
              </div>
            </div>

          </Paper>
        </Reveal>
      </section>
    </>

  )
}
