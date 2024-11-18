import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { historicPeriods } from "../../data";

import { AppHeader } from "../app-header/app-header";
import { YearRange } from "../year-range/year-range";
import { Circle } from "../circle/circle";
import { CircleButtonsMob } from "../circle-buttons-mob/circle-buttons-mob";
import { Slider } from "../slider/slider";
import { NavigationPanel } from "../navigation-panel/navigation-panel";

import s from "./app.module.scss";

export const App = () => {
  const eventsCount = historicPeriods.length;
  const angleStep = 360 / eventsCount;
  const defaultRotationDuration = 300;

  const startYearRef = useRef<HTMLDivElement>(null);
  const endYearRef = useRef<HTMLDivElement>(null);

  const [rotationAngle, setRotationAngle] = useState<number>(angleStep);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [rotationDuration, setRotationDuration] = useState<number>(
    defaultRotationDuration
  );
  const [sliderVisibility, setSliderVisibility] = useState<boolean>(false);
  const [titleTabletisibility, setTitleTabletisibility] =
    useState<boolean>(false);
  const [startYear, setStartYear] = useState<number>(
    Number(historicPeriods[0].events[0].date)
  );

  const [endYear, setEndYear] = useState<number>(
    Number(historicPeriods[0].events[historicPeriods.length - 1].date)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSliderVisibility(true);
      setTitleTabletisibility(true);
      clearTimeout(timer);
    }, 300);
  }, [currentIndex]);

  const fadeTransition = (callback: Function): void => {
    setSliderVisibility(false);
    setTitleTabletisibility(false);
    const timer = setTimeout(() => {
      callback();
      clearTimeout(timer);
    }, 300);
  };

  const loadPeriod = (targetIndex: number): void => {
    animateDateRange(targetIndex);

    const targetAngle = angleStep - targetIndex * angleStep;
    setRotationDuration(
      Math.abs(currentIndex - targetIndex) * defaultRotationDuration
    );
    const timer = setTimeout(() => {
      setRotationAngle(targetAngle);
      clearTimeout(timer);
    }, 300);

    fadeTransition(() => setCurrentIndex(targetIndex));
  };

  const animateDateRange = (targetIndex: number): void => {
    const newStartYear = Number(historicPeriods[targetIndex].events[0].date);
    const startRangeChange = newStartYear - startYear;
    const newEndYear = Number(
      historicPeriods[targetIndex].events[historicPeriods.length - 1].date
    );
    const endRangeChange = newEndYear - endYear;
    const animationDuration = (rotationDuration + 300) / 1000;

    gsap.to(startYearRef.current, {
      duration: animationDuration,
      textContent: `+=${startRangeChange}`,
      roundProps: "textContent",
      ease: "none",
      onUpdate: () => setStartYear(newStartYear),
    });
    gsap.to(endYearRef.current, {
      duration: animationDuration,
      textContent: `+=${endRangeChange}`,
      roundProps: "textContent",
      ease: "none",
      onUpdate: () => setEndYear(newEndYear),
    });
  };

  return (
    <div className={s.container}>
      <main className={s.app}>
        <AppHeader />
        <YearRange
          startYear={startYear}
          endYear={endYear}
          startYearRef={startYearRef}
          endYearRef={endYearRef}
        />
        <Circle
          titleTabletisibility={titleTabletisibility}
          rotationAngle={rotationAngle}
          eventsCount={eventsCount}
          rotationDuration={rotationDuration}
          historicPeriods={historicPeriods}
          currentIndex={currentIndex}
          onDotClick={loadPeriod}
        />
        <div className={s["mobile-hidden"]}>
          <NavigationPanel
            eventsCount={eventsCount}
            currentIndex={currentIndex}
            loadPeriod={loadPeriod}
          />
        </div>
        <Slider
          currentIndex={currentIndex}
          historicPeriods={historicPeriods}
          sliderVisibility={sliderVisibility}
        />
        <div className={s["mobile-flex"]}>
          <div className={s["desktop-hidden"]}>
            <NavigationPanel
              eventsCount={eventsCount}
              currentIndex={currentIndex}
              loadPeriod={loadPeriod}
            />
          </div>
          <CircleButtonsMob
            eventsCount={eventsCount}
            currentIndex={currentIndex}
            loadPeriod={loadPeriod}
          />
        </div>
      </main>
    </div>
  );
};
