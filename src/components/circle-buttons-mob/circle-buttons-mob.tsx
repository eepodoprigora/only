import s from "./circle-buttons-mob.module.scss";

interface CircleButtonsMobProps {
  eventsCount: number;
  currentIndex: number;
  loadPeriod: (targetIndex: number) => void;
}

export const CircleButtonsMob = ({
  eventsCount,
  currentIndex,
  loadPeriod,
}: CircleButtonsMobProps) => (
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
