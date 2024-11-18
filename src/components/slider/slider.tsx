import { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { TimePeriod } from "../../types";

import s from "./slider.module.scss";

interface SliderProps {
  currentIndex: number;
  historicPeriods: TimePeriod[];
  sliderVisibility: boolean;
}

export const Slider = ({
  currentIndex,
  historicPeriods,
  sliderVisibility,
}: SliderProps) => {
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperCore | null>(null);
  const slidesPerViewDesktop = 3;

  return (
    <div className={`${s.main} ${sliderVisibility ? s.animated : ""}`}>
      <h2 className={s.title}>{historicPeriods[currentIndex].label}</h2>

      <Swiper
        onSwiper={(swiper: SwiperCore) => (swiperRef.current = swiper)}
        className={s.slider}
        modules={[Navigation]}
        spaceBetween={25}
        slidesPerView={1.5}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 50 },
          1024: { slidesPerView: slidesPerViewDesktop, spaceBetween: 80 },
        }}
        onSlideChange={(swiper: SwiperCore) => {
          setSliderIndex(swiper.activeIndex);
        }}
        navigation={{
          prevEl: ".button-prev",
          nextEl: ".button-next",
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}>
        {historicPeriods[currentIndex].events.map((event, index) => (
          <SwiperSlide key={index} className="slider__slide">
            <p className={s.date}>{event.date}</p>
            <p className={s.description}>{event.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={s.buttons}>
        <div
          className={`${s["button-wrapper"]} ${
            sliderIndex === 0 ? s.disabled : ""
          }`}>
          <button className={`${s.button} ${s["button-prev"]} button-prev`} />
        </div>
        <div
          className={`${s["button-wrapper"]} ${s["button-wrapper-next"]} ${
            swiperRef.current &&
            swiperRef.current.snapGrid.length - 1 === sliderIndex
              ? s.disabled
              : ""
          }`}>
          <button className={`${s.button} ${s["button-next"]} button-next`} />
        </div>
      </div>
    </div>
  );
};
