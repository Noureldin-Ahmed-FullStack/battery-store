import './Styles/Home.css'
import './Styles/Buttons.css'
import { useMyContext } from './useMyContext';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Map from './Map';
import { InputAdornment, TextField } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Gallery from './Gallery';
export default function HomePage() {
  const { Theme } = useMyContext();
  return (
    <>
      <div className="bgImageContainer ubuntu-regular">
        <div className='overlayText'>
          <div className="w-50">

            <h1 style={{ fontSize: '6vw' }}>Find your car Battery</h1>
          </div>
          <p>Lorem ipsum dolom voluptate quod a alias dolorum, nobis architecto excepturi aliquid</p>
          {/* <button className="btn-flip p-0 w-100 my-3" style={{ background: 'transparent', border: '0px' }} data-back="Submit now!" data-front="Submit" type='submit'>Shop now!</button> */}

          {/* <div className="btn btn-one">
            <span>Shop now!</span>
          </div> */}
          <div className="wrapper">
            <a className='wrapperAnchor'><span>SHOP NOW!</span></a>
          </div>

        </div>
        {/* <img draggable={false} src='https://ssniper.sirv.com/Images/other%20projects/mechanic.jpg' alt="Background Image" className="bgImage" /> */}

      </div>
      <div className='ubuntu-regular secondaryItem position-relative'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 text-start">
              <h1 className='text-bold'>Reliable Car Batteries for sale at Battery-Store</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eos nesciunt distinctio assumenda temporibus explicabo ea laboriosam quibusdam doloribus sunt cum dignissimos itaque, enim, animi doloremque in architecto! At nobis magni quasi voluptatum culpa, delectus iusto distinctio cum possimus fuga nam itaque sint facilis soluta! Expedita sed omnis facilis magnam.</p>
            </div>
            <div className="col-md-5">
              <img draggable={false} className='w-100 rounded-3' src="https://ssniper.sirv.com/Images/other%20projects/battery3.jpg" loading='lazy' alt="car battery" />
            </div>
          </div>
        </div>
        <img draggable={false} className='position-absolute pyramdis' src={`https://ssniper.sirv.com/Images/other%20projects/pyramids${Theme == 'light' ? '1' : '3'}.png`} alt="" />
      </div>
      <div className={`${Theme == 'light' ? 'myLight' : 'myDark'} text-start py-5 ubuntu-regular`}>
        <div className="container">
          <h2 className='py-2'>About us</h2>
          <p className='py-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid perspiciatis tempore praesentium quod doloremque ducimus dignissimos ut dolorem cumque, fuga, deleniti accusantium! Architecto assumenda, aliquid quam, maiores error recusandae similique deleniti tempore quae saepe adipisci eos excepturi sapiente dicta nostrum.</p>
          <p className='py-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, eligendi quisquam. Nam, soluta. Voluptate ea possimus, illo sed fuga ex omnis eius delectus doloremque mollitia itaque qui. Exercitationem, temporibus at nesciunt repudiandae culpa excepturi eius pariatur necessitatibus similique perspiciatis error rem. Excepturi a nesciunt qui non magni! Aliquam, obcaecati sapiente?</p>
        </div>
      </div>
      <div className={` text-start ubuntu-regular  position-relative`}>
        <img draggable={false} className='position-absolute pyramdis2' src={`https://ssniper.sirv.com/Images/other%20projects/pyramids${Theme == 'light' ? '2' : '4'}.png`} alt="" />
        <div className="container d-flex justify-content-center secondaryItem pb-4">
          <div className="row justify-content-center w-100 ">
            <div className="col-md-7"><Map /></div>
            <div className="col-md-5">
              <form>
                <div className="row">
                  <div className="col-6"><TextField placeholder='Name' InputProps={{
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
                  <div className="col-12 mt-2"><TextField fullWidth required label="Message" variant="outlined" multiline rows={5} /></div>

                  <div className="wrapper">
                    <a className='wrapperAnchor w-100 mt-4'><span>Submit</span></a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
      <div className={`${Theme == 'light' ? 'myLight' : 'myDark'} text-start py-5 ubuntu-regular`}>
        <div className="container">
          <Gallery />
        </div>
      </div>
    </>

  )
}
