import type { InputHTMLAttributes } from 'react';

interface RetroInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function RetroInput({ label, id, className = '', ...props }: RetroInputProps) {
  return (
    <div className="retro-input-group">
      {label && (
        <label htmlFor={id} className="retro-input-label">
          {label}
        </label>
      )}
      <input id={id} className={`retro-input ${className}`.trim()} {...props} />
    </div>
  );
}

interface RetroSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function RetroSelect({ label, id, options, className = '', ...props }: RetroSelectProps) {
  return (
    <div className="retro-input-group">
      {label && (
        <label htmlFor={id} className="retro-input-label">
          {label}
        </label>
      )}
      <select id={id} className={`retro-select ${className}`.trim()} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
