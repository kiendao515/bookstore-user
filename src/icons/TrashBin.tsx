import React from 'react';

type TrashBinIconProps = React.SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string; // Customize the fill color of the icon
    strokeColor?: string; // Customize the stroke color
};

const TrashBin: React.FC<TrashBinIconProps> = ({ className, color = 'none', strokeColor = 'black', ...props }) => {
    return (
        <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.4375 15C1.99063 15 1.60807 14.8368 1.28984 14.5104C0.971615 14.184 0.8125 13.7917 0.8125 13.3333V2.5H0V0.833333H4.0625V0H8.9375V0.833333H13V2.5H12.1875V13.3333C12.1875 13.7917 12.0284 14.184 11.7102 14.5104C11.3919 14.8368 11.0094 15 10.5625 15H2.4375ZM10.5625 2.5H2.4375V13.3333H10.5625V2.5ZM4.0625 11.6667H5.6875V4.16667H4.0625V11.6667ZM7.3125 11.6667H8.9375V4.16667H7.3125V11.6667Z" fill="black" />
        </svg>

    );
};

export default TrashBin;
