import React from 'react';

type ToggleUpIconProps = React.SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string; // Customize the fill color of the icon
    strokeColor?: string; // Customize the stroke color
};

const ToggleUp: React.FC<ToggleUpIconProps> = ({ className, color = 'none', strokeColor = '', fill, ...props }) => {
    return (
        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.69498 6.55671e-07L-5.73784e-05 7.88884L1.0838 9L7.69498 2.22232L14.3062 9L15.39 7.88884L7.69498 6.55671e-07Z" fill="#8C8C8C"  />
        </svg>
    );
};

export default ToggleUp;
