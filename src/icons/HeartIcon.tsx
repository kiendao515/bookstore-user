import React from 'react';

type HeartIconProps = React.SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string; // Add a color prop to customize the fill color
    strokeColor?: string;
};

const HeartIcon: React.FC<HeartIconProps> = ({ className, color = 'none', strokeColor = 'black', ...props }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className} // Apply the className here
            {...props} // Spread the remaining props
        >
            <path
                d="M8.88659 17.4853L8.88587 17.4846C6.30081 15.1405 4.19567 13.2307 2.73078 11.4397C1.27162 9.65575 0.5 8.05077 0.5 6.32501C0.5 3.52115 2.69614 1.32501 5.5 1.32501C7.08861 1.32501 8.62112 2.06698 9.61932 3.23918L10 3.68621L10.3807 3.23918C11.3789 2.06698 12.9114 1.32501 14.5 1.32501C17.3039 1.32501 19.5 3.52115 19.5 6.32501C19.5 8.05078 18.7284 9.65578 17.2691 11.4411C15.8065 13.2305 13.7058 15.1394 11.1265 17.4834L11.1148 17.494L11.1137 17.495L10.0013 18.5L8.88659 17.4853Z"
                stroke={strokeColor}
                fill={color} // Use the color prop to set the fill color
            />
        </svg>
    );
};

export default HeartIcon;

