"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const ImageCarousel = () => {
    const images = [
        '/images/cam1.jpg',
        '/images/cam2.jpg',
        '/images/cam3.png',
        '/images/cam4.jpg'
    ];

    return (
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
            <Carousel autoPlay infiniteLoop showThumbs={false}>
                {images.map((image, index) => (
                    <div key={index} className="carousel-image-container" style={{ maxHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.418)', backgroundColor: '#f9f9f9' }}>
                        <img src={image} alt={`Slide ${index + 1}`} style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '250px', objectFit: 'contain' }} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageCarousel;
