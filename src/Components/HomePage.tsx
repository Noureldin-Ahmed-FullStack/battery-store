import './Styles/Home.css'
import './Styles/Buttons.css'
export default function HomePage() {
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
            <img className='w-100 rounded-3' src="https://ssniper.sirv.com/Images/other%20projects/battery3.jpg" loading='lazy' alt="car battery" />
          </div>
        </div>
        </div>
        <img className='position-absolute pyramdis' src={`https://ssniper.sirv.com/Images/other%20projects/pyramids1.png`} alt="" />
      </div>
    </>

  )
}
