import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import './swiper.css'

SwiperCore.use([Navigation, Autoplay])

const Carousel = () => {
  const slides = []

  for (let i = 0; i < 5; i++) {
    slides.push(
      <SwiperSlide className='relative' key={`slide ${i}`} tag='li'>
        <div className='absolute bg-black inset-0 bg-opacity-30'></div>
        <img src='https://fscl01.fonpit.de/userfiles/7687254/image/Compact_Smartphones.jpg' />
        <span className='
          absolute 
          text-white text-3xl font-bold 
          top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        '>
          Smartphone
        </span>
      </SwiperSlide>
    )
  }

  return (
    <Swiper
      spaceBetween={1}
      slidesPerView={1}
      tag='section'
      wrapperTag='ul'
      navigation={true}
    >
      {slides}
    </Swiper>
  );
};

export default Carousel
