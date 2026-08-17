import React from 'react';
import cn from 'classnames';

import scss from './IconButton.module.scss';

interface IconButtonProps {
    children: React.ReactNode;
    active?: boolean | undefined;
    onClick?: () => void;
    ariaLabel: string;
}

export function IconButton({
    children,
    active = false,
    onClick: handleClick,
    ariaLabel,
}: IconButtonProps) {
    return (
        <button
            className={cn(scss.iconButton, active && scss.active)}
            aria-label={ariaLabel}
            type="button"
            onClick={handleClick}
        >
            {children}
        </button>
    );
}
