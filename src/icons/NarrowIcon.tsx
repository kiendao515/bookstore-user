import React from 'react';

type NarrowIconProps = React.SVGProps<SVGSVGElement>;

const NarrowIcon: React.FC<NarrowIconProps> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            {...props} // Spread props to make sure className and others are forwarded
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
        </svg>
    );
};

export default NarrowIcon;
