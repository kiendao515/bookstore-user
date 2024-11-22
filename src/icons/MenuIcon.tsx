import React from 'react';

type MenuIconProps = React.SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string; // Customize the fill color of the icon
    strokeColor?: string; // Customize the stroke color
};

const MenuIcon: React.FC<MenuIconProps> = ({ className, color = 'none', strokeColor = 'black', ...props }) => {
    return (
        <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect y="0.333252" width="25" height="0.833333" fill="black" />
            <rect y="7" width="25" height="0.833333" fill="black" />
            <rect y="13.6665" width="25" height="0.833333" fill="black" />
        </svg>

    );
};

export default MenuIcon;

