import s from "./slider-buttons-mob.module.scss";

interface SliderButtonsMobProps {
  eventsCount: number;
  currentIndex: number;
  loadPeriod: (targetIndex: number) => void;
}

export const SliderButtonsMob = ({
  eventsCount,
  currentIndex,
  loadPeriod,
}: SliderButtonsMobProps) => (
  <div className={s.main}>
    {Array.from({ length: eventsCount }).map((_, index) => (
      <button
        key={index}
        className={`${s.button} ${
          currentIndex === index ? s["button-active"] : ""
        }`}
        onClick={() => loadPeriod(index)}
      />
    ))}
  </div>
);
