import React from 'react'
import styled from "styled-components"
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { mobile } from '../responsive';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swipeStyle.css"

const Container = styled.div`
  ${mobile({ display: "none" })}  
`
const Photo = styled.img`
    
`

const ImgText = styled.h3`
    position: absolute;
    font-size: 55px;
    top:500px;
   right:655px;
    color:darkkhaki;
    font-family: 'Shadows Into Light';
    
`

const CreditText = styled.h4`
  color:white;
  position:absolute;
  top:570px;
  right:43px;
  
`


const Swipe = () => {
  return (
    <Container>
        <Swiper
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        
      >
        

        
        <SwiperSlide>
          <Photo src="https://i.im.ge/2022/09/16/1FpbBD.simon-weisser-phS37wg8cQg-unsplash.jpg"/>
          <ImgText>Play for Yourself!</ImgText> <CreditText> Photo by Simon Weisser </CreditText>
          </SwiperSlide>
        <SwiperSlide>
          <Photo src="https://i.im.ge/2022/09/16/1FHVLS.marcus-neto-gioH4gHo0-g-unsplash.jpg"/>
          <ImgText>Play for the people who love you, </ImgText> <CreditText>Photo by Marcus Neto</CreditText>          
          </SwiperSlide>
          <SwiperSlide>
          <Photo src="https://i.im.ge/2022/09/16/1FHW8J.mike-giles-IiwYeihxC58-unsplash.jpg"/>
         <ImgText>Play for the people you love.. </ImgText> <CreditText> Photo by Mike Giles </CreditText> 
         </SwiperSlide>
        
        
      </Swiper>
    </Container>
  )
}

export default Swipe

