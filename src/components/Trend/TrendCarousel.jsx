import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import {useQuery} from '@tanstack/react-query'
import trend_carousel from '../assets/trend_carousel.svg'
import trend_carousel2 from '../assets/breakfast.svg'
import trend_carousel3 from '../assets/love.svg'
import { useNavigate } from 'react-router-dom';

export default function TrendCarousel() {
    const navigate = useNavigate();
    const slickRef = useRef();

    const {data, isLoading } = useQuery({ queryKey: ['TrendCarousels'], queryFn: CarouselData })

    async function CarouselData(){
        return await axios('/data/TrendCarousel.json')
        .then((res)=>res.data.items)
      }

    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);

        const settings = {
          arrows: false,
          dots: true,
          infinite: true,
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
            }   
    return (
        <div className=''>
            <article className=' h-carousel relative w-screen '>
                <Slider {...settings} ref={slickRef} >
                    <div onClick={()=>{navigate('/main/result/30')}} className='relative h-trend_carousel  '>
                        <img src={trend_carousel2} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full '/>
                    </div>
                    <div onClick={()=>{navigate('/main/participate/41')}} className='relative h-trend_carousel  '>
                        <img src={trend_carousel3} alt="carousel" className='absolute right-1/2 translate-x-1/2 object-cover h-full '/>
                    </div>
                </Slider>
                <div>
                    <div onClick={previous} className='text-3xl absolute top-1/2 left-96 -translate-y-full hover:cursor-pointer'>
                        <SlArrowLeft />
                    </div>
                    <div onClick={next} className='text-3xl absolute top-1/2 right-96 -translate-y-full hover:cursor-pointer'>
                        <SlArrowRight />
                    </div>
                </div>
            </article>
        </div>

    );
        
    }
