// MySlider.jsx
import React from 'react';
import Slider from 'react-slick';
//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';

const MySlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="my-slider-container">
            <Slider {...settings} style={{ width: "50%", height: "50%" }}>
                {[1, 2, 3, 4, 5].map((index) => (
                    <div key={index} style={{ height: '500px', backgroundColor: 'red' }}>
                        <img
                            src={`./public/dfreeintro/dfreeintro${index}.jpg`}
                            alt={`Slide ${index}`}
                            style={{ objectFit: "contain", width: "100%", height: "100%" }}
                        />
                    </div>
                ))}
            </Slider>
        </div >
    );
};

export default MySlider;
