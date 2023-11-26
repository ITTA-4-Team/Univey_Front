import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export default function Carousel() {
    const [data, setData] = useState([]);
    const slickRef = useRef(null);
    useEffect(() => {
        axios.get('/data/Carousel.json')
            .then((res) => {
                setData(res.data.items);
            })
            .catch((error) => {
                // 에러 처리
                console.error('Error fetching data:', error);
            });
    }, []);

    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);

        const settings = {
          arrows: false,
          dots: false,
          infinite: true,
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
            }   
    return (
        <div className='border-b-1 border-line_color'>
            <article className=' h-carousel relative'>
                <Slider {...settings} ref={slickRef} >
                    {data.map((item) => (
                        <div className='relative h-carousel'>
                            <img key={item.id} src={item.url} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full'/>
                        </div>
                    ))}
                </Slider>
                <div>
                    <div onClick={previous} className='text-3xl absolute top-1/2 left-48 hover:cursor-pointer'>
                        <SlArrowLeft />
                    </div>
                    <div onClick={next} className='text-3xl absolute top-1/2 right-48 hover:cursor-pointer'>
                        <SlArrowRight />
                    </div>
                </div>
            </article>
        </div>

    );
        
    }
