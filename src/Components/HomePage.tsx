import './Styles/Home.css'
import './Styles/Buttons.css'
import { useMyContext } from './useMyContext';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Map from './Map';
import { InputAdornment, TextField } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Gallery from './Gallery';
import FancyDiv from './FancyDiv';
import MyCarousel from './MyCarousel';
import Reveal from './Reveal';
export default function HomePage() {
  const { Theme } = useMyContext();
  return (
    <>
      <div className="bgImageContainer ubuntu-regular">
        <div className='overlayText'>
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
            <a className='wrapperAnchor'><span>SHOP NOW!</span></a>
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
      <div className="py-5 text-start ubuntu-regular  position-relative">
        <div className="container d-flex justify-content-center">
          <div className="row justify-content-center w-100 ">
            <div className="col-md-7">
              <Reveal direction={'right'} width='Full'>
                <Map />
              </Reveal>
            </div>
            <div className="col-md-5">

              <Reveal direction={'left'} width='Full'>
                <h2 className='text-center mt-2'>Contact Us Today</h2>
                <form>
                  <div className="row">
                    <div className="col-6">
                      <TextField placeholder='Name' InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleOutlinedIcon />
                          </InputAdornment>
                        ),
                      }} fullWidth required type='text' label="Name" variant="outlined" /></div>
                    <div className="col-6"><TextField placeholder='Email' InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    }} fullWidth required type='email' label="Email" variant="outlined" /></div>
                    <div className="col-12 mt-2"><TextField fullWidth required label="Message" variant="outlined" multiline rows={3} /></div>

                    <div className="wrapper">
                      <a className='wrapperAnchor w-100 mt-4'><span>Submit</span></a>
                    </div>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </div>

      </div>
    </>

  )
}
