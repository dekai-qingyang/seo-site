type Props = {
    label: string
    value: number
    setValue: (value: number) => void
    prefix?: string
    suffix?: string
  }
  
  export default function InputField({
    label,
    value,
    setValue,
    prefix,
    suffix,
  }: Props) {
  
    return (
  
      <div>
  
        <label className="block text-sm font-semibold mb-2 text-slate-700">
          {label}
        </label>
  
        <div className="relative">
  
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              {prefix}
            </span>
          )}
  
          <input
            type="number"
            value={value}
            onChange={(e) =>
              setValue(Number(e.target.value))
            }
            className="w-full border border-slate-200 rounded-2xl py-3 pl-10 pr-10 bg-white"
          />
  
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              {suffix}
            </span>
          )}
  
        </div>
  
      </div>
  
    )
  }