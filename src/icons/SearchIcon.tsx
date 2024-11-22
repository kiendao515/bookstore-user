import React from 'react';

type SearchIconProps = React.SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string; // Customize the fill color of the icon
    strokeColor?: string; // Customize the stroke color
};

const SearchIcon: React.FC<SearchIconProps> = ({ className, color = 'none', strokeColor = 'black', ...props }) => {
    return (
        <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7515 8.27688C14.7515 12.0458 11.7591 15.0538 8.12576 15.0538C4.49239 15.0538 1.5 12.0458 1.5 8.27688C1.5 4.50794 4.49239 1.5 8.12576 1.5C11.7591 1.5 14.7515 4.50794 14.7515 8.27688ZM12.8226 15.0318C11.4964 15.9903 9.87568 16.5538 8.12576 16.5538C3.63803 16.5538 0 12.8481 0 8.27688C0 3.70568 3.63803 0 8.12576 0C12.6135 0 16.2515 3.70568 16.2515 8.27688C16.2515 10.5192 15.3761 12.5533 13.9544 14.0439L21.5586 21.7895L20.5078 22.8599L12.8226 15.0318Z" fill="#1E71FF" />
        </svg>
    );
};

export default SearchIcon;
