import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import './swiper.css'
import { useQuery } from '@tanstack/react-query';
import Api from '../services/Api';
import { AiOutlineLoading } from 'react-icons/ai';

SwiperCore.use([Navigation, Autoplay])

type carouselProps = {
  changeTag: (tagId: string) => void
}

const Carousel = ({ changeTag }: carouselProps) => {
  const { data, isError, isFetching } = useQuery(['tags'], () => Api.get<Tag[]>('/tags'));

  if (!data) return (
    <div className="w-[100%] h-[55vh] flex items-center justify-center" >
      <AiOutlineLoading className='text-green-400 animate-[spin_.6s_linear_infinite]' size={80} />
    </div >
  )

  return (
    <Swiper
      spaceBetween={1}
      slidesPerView={1}
      tag='section'
      wrapperTag='ul'
      navigation={true}
      onSlideChange={(index) => {
        const actualSlide = index.realIndex
        if(actualSlide === 0) return changeTag('')
        const actualTag = data[actualSlide - 1].props.id
        changeTag(actualTag)
      }}
    >
      <SwiperSlide id='' className='relative h-48 w-auto bg-blue-200' key={`slide initial`} tag='li'>
        <div className='absolute bg-black inset-0 bg-opacity-30'></div>
        <img src='https://ibpt.com.br/wp-content/uploads/2020/07/2354873-1024x683.jpg' />
        <span className='
          absolute 
          text-white text-3xl font-bold text-center
          top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        '>
          Dispositivos em geral
        </span>
      </SwiperSlide>
      {data.map((tag, i) => {
        return (
          <SwiperSlide id={tag.props.id} className='relative h-48 w-auto bg-blue-200' key={`slide ${i}`} tag='li'>
            <div className='absolute bg-black inset-0 bg-opacity-30'></div>
            <img src={tag.props.thumbnailLink} />
            <span className='
              absolute 
              text-white text-3xl font-bold text-center 
              top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            '>
              {tag.props.name}
            </span>
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
}

export default Carousel
