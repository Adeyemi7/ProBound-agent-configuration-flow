type Props = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: Props) {
  const percent = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="text-xs text-gray-500">
        Step {current}/{total}
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-900 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
