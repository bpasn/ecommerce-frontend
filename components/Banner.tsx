'use client';
import { Carousel } from "react-responsive-carousel";
import slider1 from '@/assets/slider/sliderImg_1.jpg';
import slider2 from '@/assets/slider/sliderImg_2.jpg';
import slider3 from '@/assets/slider/sliderImg_3.jpg';
import slider4 from '@/assets/slider/sliderImg_4.jpg';
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Banner = () => {
    return (
        <div className="relative">
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={3000}
            >
                <div>
                    <Image priority src={slider1} alt="sliderImg" />
                </div>
                <div>
                    <Image src={slider2} alt="sliderImg" />
                </div>
                <div>
                    <Image src={slider3} alt="sliderImg" />
                </div>
                <div>
                    <Image src={slider4} alt="sliderImg" />
                </div>
                <div className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-10" />
            </Carousel>
        </div>
    );
};

export default Banner;