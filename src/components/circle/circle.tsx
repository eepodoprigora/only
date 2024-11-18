import { TimePeriod } from "../../types";
import s from "./circle.module.scss";

interface CircleProps {
  rotationAngle: number;
  eventsCount: number;
  rotationDuration: number;
  historicPeriods: TimePeriod[];
  currentIndex: number;
  titleTabletisibility: boolean;
  onDotClick: (targetIndex: number) => void;
}

export const Circle = ({
  rotationAngle,
  eventsCount,
  rotationDuration,
  historicPeriods,
  currentIndex,
  titleTabletisibility,
  onDotClick,
}: CircleProps) => {
  return (
    <>
      <h2 className={`${s.title} ${titleTabletisibility ? s.fade : ""}`}>
        {historicPeriods[currentIndex].label}
      </h2>
      <div className={s.main}>
        <div
          className={s.container}
          style={
            {
              "--count": eventsCount,
              "--angle": rotationAngle + "deg",
              "--time": rotationDuration + "ms",
              "--delay": rotationDuration + 300 + "ms",
            } as React.CSSProperties
          }>
          {historicPeriods.map((item, index) => {
            return (
              <div
                key={index}
                className={`${s.point} ${
                  currentIndex === index ? s["point-active"] : ""
                }`}
                style={{ "--i": index + 1 } as React.CSSProperties}
                onClick={() => onDotClick(index)}>
                <div className={s["point-content"]}>
                  <p className={s["point-dot"]}>
                    {index + 1}
                    <span className={s["point-label"]}>{item.label}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
