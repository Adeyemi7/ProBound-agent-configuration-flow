type Props = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: Props) {
  const percent = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="text-xs text-[rgba(113,113,122,1)]">
        Step {current}/{total}
      </div>
      <div className="h-2.5 bg-[rgba(231,232,233,1)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[rgba(156,163,175,1)] transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
