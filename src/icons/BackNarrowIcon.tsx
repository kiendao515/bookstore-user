import React from 'react';

type BackNarrowIconProps = React.SVGProps<SVGSVGElement>;

const BackNarrowIcon: React.FC<BackNarrowIconProps> = (props) => {
    return (
        <svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M2.72 5.5C2.30667 5.00667 1.88 4.58 1.44 4.22C1 3.86 0.546667 3.56667 0.0800003 3.34V2.98C1 2.51333 1.88 1.79333 2.72 0.82H3.42C3.20667 1.27333 2.99333 1.67333 2.78 2.02C2.56667 2.35333 2.36 2.63333 2.16 2.86V3.46C2.36 3.67333 2.56667 3.95333 2.78 4.3C2.99333 4.63333 3.20667 5.03333 3.42 5.5H2.72ZM2.06 3.58V2.74H13.92V3.58H2.06Z" fill="black" />
        </svg>

    );
};

export default BackNarrowIcon;
