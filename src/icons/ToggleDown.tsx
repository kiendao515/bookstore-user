import React from 'react';

type ToggleDownIconProps = React.SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string; // Customize the fill color of the icon
    strokeColor?: string; // Customize the stroke color
};

const ToggleDown: React.FC<ToggleDownIconProps> = ({ className, color = 'none', strokeColor = 'black', ...props }) => {
    return (
        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.69498 9L-5.73609e-05 1.11116L1.0838 -1.51743e-06L7.69498 6.77768L14.3062 -3.61495e-07L15.39 1.11116L7.69498 9Z" fill="#8C8C8C" />
        </svg>

    );
};

export default ToggleDown;
