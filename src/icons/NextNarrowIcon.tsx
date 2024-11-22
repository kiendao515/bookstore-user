import React from 'react';

type NextNarrowIconProps = React.SVGProps<SVGSVGElement>;

const NextNarrowIcon: React.FC<NextNarrowIconProps> = (props) => {
    return (
        <svg width="16" height="7" viewBox="0 0 16 7" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M11.938 6.05C12.158 5.58067 12.3707 5.17 12.576 4.818C12.796 4.466 13.0087 4.17267 13.214 3.938H0.388V3.014H13.214C13.0087 2.76467 12.796 2.464 12.576 2.112C12.3707 1.76 12.158 1.35667 11.938 0.902H12.708C13.632 1.97267 14.6 2.76467 15.612 3.278V3.674C14.6 4.17267 13.632 4.96467 12.708 6.05H11.938Z" fill="black" />
        </svg>

    );
};

export default NextNarrowIcon;
