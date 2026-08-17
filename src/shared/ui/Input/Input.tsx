import scss from './Input.module.scss';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    min?: number;
    max?: number;
}

export function Input({
    value,
    onChange: handleChange,
    placeholder,
    type = 'text',
    min,
    max,
}: InputProps) {
    return (
        <input
            className={scss.input}
            type={type}
            value={value}
            placeholder={placeholder}
            min={min}
            max={max}
            onChange={(e) => handleChange(e.target.value)}
        />
    );
}
