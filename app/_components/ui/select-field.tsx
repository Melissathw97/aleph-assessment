'use client'

type ISelectOption = {
    label: string;
    value: string;
};

type IProps = {
    label?: string;
    value: string;
    options: ISelectOption[];
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField: React.FC<IProps> = ({ label, value, options, required = false, onChange }) => {
    return (
        <div className="relative flex flex-col items-start">
            <label className="text-xs ml-3 mb-1">
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}
                required={required}
                className="border rounded-lg h-10 px-3 w-full max-w-lg min-w-md"
            >
                {options.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    )
};

export default SelectField;