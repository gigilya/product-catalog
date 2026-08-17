import cn from 'classnames';

import { ButtonSize, ButtonVariant } from './types';

import scss from './Button.module.scss';

interface ButtonProps {
    text: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean | undefined;
    onClick?: () => void;
}

export function Button({
    text,
    variant = ButtonVariant.PRIMARY,
    size = ButtonSize.MEDIUM,
    disabled = false,
    onClick: handleClick,
}: ButtonProps) {
    return (
        <button
            className={cn(scss.button, scss[variant], scss[size])}
            disabled={disabled}
            onClick={handleClick}
        >
            {text}
        </button>
    );
}
