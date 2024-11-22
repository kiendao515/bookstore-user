import React from 'react';

type HeartIconProps = React.SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string; // Add a color prop to customize the fill color
    strokeColor?: string;
};

const FailOrderIcon: React.FC<HeartIconProps> = ({ className, color = 'none', strokeColor = 'black', ...props }) => {
    return (
        <svg width="79" height="79" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="39.5" cy="39.5" r="37" stroke="#FF822F" stroke-width="5" />
            <path d="M55 25L25 55M24 25L54 55" stroke="black" stroke-width="4" />
        </svg>
    );
};

export default FailOrderIcon;

