import { Button } from '@mui/material'
import './Styles/Home.css'
export default function HomePage() {
  return (
    <div className="bgImageContainer">
      <div className='overlayText'>
        <div className="w-50">

        <h1 style={{fontSize:'6vw'}}>Find your car Battery</h1>
        </div>
        <p>Lorem ipsum dolom voluptate quod a alias dolorum, nobis architecto excepturi aliquid</p>
        <button className="btn-flip p-0 w-100 my-3" style={{ background: 'transparent', border: '0px' }} data-back="Submit now!" data-front="Submit" type='submit'></button>
      </div>
      {/* <img draggable={false} src='https://ssniper.sirv.com/Images/other%20projects/mechanic.jpg' alt="Background Image" className="bgImage" /> */}
      
    </div>
  )
}
