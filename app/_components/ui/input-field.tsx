'use client'

type IProps = {
    type?: "number" | "text" | "email";
    label?: string;
    value: string | number;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<IProps> = ({ type = "text", label, value, required = false, onChange }) => {
    return (
        <div className="relative flex flex-col items-start">
            <label className="text-xs ml-3 mb-1">
                {label}
            </label>
            <input
                type={type}
                value={value}
                required={required}
                onChange={onChange}
                className="bg-none border rounded-lg h-10 px-3 w-full max-w-lg min-w-md"
            />
        </div>
    )
};

export default InputField;