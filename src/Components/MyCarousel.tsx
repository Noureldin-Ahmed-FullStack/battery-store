import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function MyCarousel() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows:false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:1500
    };
    return (
        <div className='w-100 text-start container'>
            <Slider {...settings}>
                <div>
                    <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, nisi provident, magnam deleniti et molestias at modi porro labore minus suscipit? Odit suscipit, aut fuga temporibus reprehenderit quasi hic voluptates dicta quis est sint cum nulla esse ut dolore culpa molestiae saepe expedita ex error totam atque sunt. Repudiandae, quibusdam.</h3>
                    <p>Liam</p>
                </div>
                <div>
                    <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, nisi provident, magnam deleniti et molestias at modi porro labore minus suscipit? Odit suscipit, aut fuga temporibus reprehenderit quasi hic voluptates dicta quis est sint cum nulla esse ut dolore culpa molestiae saepe expedita ex error totam atque sunt. Repudiandae, quibusdam.</h3>
                    <p>Ahmed</p>
                </div>
                <div>
                    <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, nisi provident, magnam deleniti et molestias at modi porro labore minus suscipit? Odit suscipit, aut fuga temporibus reprehenderit quasi hic voluptates dicta quis est sint cum nulla esse ut dolore culpa molestiae saepe expedita ex error totam atque sunt. Repudiandae, quibusdam.</h3>
                    <p>Ali</p>
                </div>
                <div>
                    <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, nisi provident, magnam deleniti et molestias at modi porro labore minus suscipit? Odit suscipit, aut fuga temporibus reprehenderit quasi hic voluptates dicta quis est sint cum nulla esse ut dolore culpa molestiae saepe expedita ex error totam atque sunt. Repudiandae, quibusdam.</h3>
                    <p>Hanna</p>
                </div>
                <div>
                    <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, nisi provident, magnam deleniti et molestias at modi porro labore minus suscipit? Odit suscipit, aut fuga temporibus reprehenderit quasi hic voluptates dicta quis est sint cum nulla esse ut dolore culpa molestiae saepe expedita ex error totam atque sunt. Repudiandae, quibusdam.</h3>
                    <p>Samy</p>
                </div>
            </Slider>
        </div>
    )
}
