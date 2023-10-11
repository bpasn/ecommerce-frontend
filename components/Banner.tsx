'use client';
import { Carousel } from "react-responsive-carousel";
import slider1 from '@/assets/slider/sliderImg_1.jpg';
import slider2 from '@/assets/slider/sliderImg_2.jpg';
import slider3 from '@/assets/slider/sliderImg_3.jpg';
import slider4 from '@/assets/slider/sliderImg_4.jpg';
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import StoreSwitcher from "./store-switcher";
import background from '@/assets/slider/sliderImg_1.jpg';
const Banner = () => {
    return (
        <div className="relative bg-no-repeat bg-top w-full max-h-[350px] ">
            <Image src={background} alt="background" className="opacity-60" />
            <div className="w-3/4 bg-red absolute  top-1/4 md:top-3/2 left-1/2 transform -translate-x-1/2 translate-y-0">
                <h1 className="text-lg">Tools shop</h1>
                <p className="text-md">ศูนย์รวมเครื่องมือช่างเกรดพรีเมี่ยมสำหรับงานอุตสาหกรรมครบวงจร</p>
                <StoreSwitcher className="w-full" />
            </div>
            {/* <Carousel
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
                <div className="w-full h-40 bg-gradient-to-t from-gray-900 to-transparent absolute bottom-0 z-20"></div>

            </Carousel> */}
        </div >
    );
};

export default Banner;