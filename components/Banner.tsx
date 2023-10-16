'use client';
// import { Carousel } from "react-responsive-carousel";
// import slider1 from '@/assets/slider/sliderImg_1.jpg';
// import slider2 from '@/assets/slider/sliderImg_2.jpg';
// import slider3 from '@/assets/slider/sliderImg_3.jpg';
// import slider4 from '@/assets/slider/sliderImg_4.jpg';
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import StoreSwitcher from "./store-switcher";
import background from '@/assets/background/tools-background.jpg';
import { cn, wait } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { IFindByName } from "@/services/product/product";
import axios from "axios";
const Banner = () => {
    const [commandItem, setCommandItem] = useState<IFindByName[]>([]);
    const [valueSearch, setValueSearch] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const onSearch = async () => {
        if (valueSearch.length >= 4) {
            setLoading(true);
            const { data } = await axios.get<IFindByName[]>(`/api/products/search/${valueSearch}`, {
                cancelToken: source.token
            });
            await wait(3 * 1000);
            setCommandItem(data);
            setLoading(false);
            return;
        }
    };

    useEffect(() => {
        if (valueSearch.length >= 4) {
            onSearch();
        }
    }, [valueSearch]);
    return (
        <div className="relative bg-no-repeat bg-top w-full max-h-[350px] ">
            <Image
                src={background}
                alt="background"
                className="opacity-70 h-full max-h-[550px] object-cover"
            />
            <div className="w-3/4 bg-red absolute  top-1/4 md:top-3/2 left-1/2 transform -translate-x-1/2 translate-y-0 gap-5 flex flex-col">
                <h1 className="text-5xl text-gray-50">Tools shop</h1>
                <p className="text-2xl text-gray-50">ศูนย์รวมเครื่องมือช่างเกรดพรีเมี่ยมสำหรับงานอุตสาหกรรมครบวงจร</p>
                <div className="w-full p-5 m-5">
                    <StoreSwitcher loading={loading} itemsCommand={commandItem} className={cn("p-2")} onChangeSearch={(v) => setValueSearch(v)} />
                </div>
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