import React from "react";

interface ChartProps {
  title: string;
  data: { label: string; value: number; color: string }[];
}

export const EvaluacionesChart: React.FC<ChartProps> = ({ title, data }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mx-auto flex h-full w-full max-w-2xl flex-col justify-center">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
        <div className="space-y-4 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-20 text-sm font-medium text-gray-600">
                {item.label}
              </div>
              <div className="h-3 flex-1 rounded-full bg-gray-200">
                <div
                  className={`bg-linear-to-r ${item.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
              <div className="w-12 text-right text-sm font-medium text-gray-900">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
