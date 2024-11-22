import React from 'react';

type CloseIconProps = React.SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string; // Customize the fill color of the icon
    strokeColor?: string; // Customize the stroke color
};

const CloseIcon: React.FC<CloseIconProps> = ({ className, color = 'none', strokeColor = 'black', ...props }) => {
    return (
        <svg width="27" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1 1L26 16" stroke="black" />
            <path d="M26 1L1 16" stroke="black" />
        </svg>
    );
};

export default CloseIcon;


