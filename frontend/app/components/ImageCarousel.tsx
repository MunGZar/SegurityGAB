"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = () => {
    const images = [
        '/images/Carousel_images/Carrusel desc 1.png',
        '/images/Carousel_images/Carrusel desc 2.png',
        '/images/Carousel_images/Carrusel desc 1.png',
        '/images/Carousel_images/Carrusel desc 2.png',
    ];

    return (
        <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <Carousel autoPlay infiniteLoop showThumbs={false}>
                {images.map((image, index) => (
                    <div key={index} className="carousel-image-container" style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', overflow: 'hidden' }}>
                        <img src={image} alt={`Slide ${index + 1}`} style={{ width: '600px', height: '900px', objectFit: 'contain' }} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageCarousel;
