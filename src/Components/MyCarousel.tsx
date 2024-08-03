import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from "@mui/material";
export default function MyCarousel() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500
    };
    return (
        <div className='w-100 text-start container my-3'>
            <Slider {...settings}>
                <div>
                    <Typography variant="subtitle1">At El-Amir Company, our commitment to you is crystal clear: we strive to deliver premium car batteries with unparalleled speed, ensuring that you can get back on the road without unnecessary delays. Our dedication to providing top-notch products and swift service is at the heart of everything we do. We understand how crucial it is for you to have a reliable car battery, and we go above and beyond to meet that need with efficiency and precision.</Typography>
                </div>
                <div>
                    <Typography variant="subtitle1">We place a high priority on our customers' needs, making sure that your satisfaction is at the forefront of our operations. Our team is devoted to building strong, lasting relationships based on trust and exceptional service. From the moment you reach out to us, you will experience a level of care and attention that sets us apart. We believe that excellent customer service is more than just a promise; it's a fundamental principle that guides our every action. Our goal is to earn your trust and maintain it through consistent, outstanding support.</Typography>
                </div>
                <div>
                    <Typography variant="subtitle1">When you choose El-Amir Company for all your car battery requirements, you’re choosing a partner that values reliability, speed, and affordability. We invite you to experience the difference our commitment makes. Our comprehensive range of car batteries is designed to meet diverse needs, ensuring that you find the perfect fit for your vehicle. Join us as we strive to power your journeys with products that are not only high in quality but also in performance. Our mission is to keep you moving forward, powered by reliability and efficiency that you can count on, mile after mile.</Typography>
                </div>
            </Slider>
        </div>
    )
}
