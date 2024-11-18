import s from "./year-range.module.scss";

interface YearRangeProps {
  startYear: number;
  endYear: number;
  startYearRef: React.RefObject<HTMLDivElement>;
  endYearRef: React.RefObject<HTMLDivElement>;
}

export const YearRange = ({
  startYear,
  endYear,
  startYearRef,
  endYearRef,
}: YearRangeProps) => (
  <div className={s.main}>
    <p className={s.start} ref={startYearRef}>
      {startYear}
    </p>
    <p className={s.end} ref={endYearRef}>
      {endYear}
    </p>
  </div>
);
