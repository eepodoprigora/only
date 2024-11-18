import s from "./navigation-panel.module.scss";

interface NavigationPanelProps {
  eventsCount: number;
  currentIndex: number;
  loadPeriod: (targetIndex: number) => void;
}

export const NavigationPanel = ({
  eventsCount,
  currentIndex,
  loadPeriod,
}: NavigationPanelProps) => (
  <div className={s.navigation}>
    <p className={s.numbers}>{`0${String(currentIndex + 1)}/0${String(
      eventsCount
    )}`}</p>
    <div className={s.buttons}>
      <button
        className={`${s.button} ${s["button-prev"]}`}
        onClick={() => loadPeriod(currentIndex - 1)}
        disabled={currentIndex === 0}
      />
      <button
        className={`${s.button} ${s["button-next"]}`}
        onClick={() => loadPeriod(currentIndex + 1)}
        disabled={currentIndex === eventsCount - 1}
      />
    </div>
  </div>
);
