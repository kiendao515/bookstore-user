import React from 'react';

type SuccessOrderIconProps = React.SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string; // Add a color prop to customize the fill color
    strokeColor?: string;
};

const SuccessOrderIcon: React.FC<SuccessOrderIconProps> = ({ className, color = 'none', strokeColor = 'black', ...props }) => {
    return (
        <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_179661_4511)">
                <g clip-path="url(#clip1_179661_4511)">
                    <mask id="path-1-inside-1_179661_4511" fill="white">
                        <path d="M40.5 20C40.5 31.0457 31.5457 40 20.5 40C9.4543 40 0.5 31.0457 0.5 20C0.5 8.9543 9.4543 0 20.5 0C31.5457 0 40.5 8.9543 40.5 20ZM2.5 20C2.5 29.9411 10.5589 38 20.5 38C30.4411 38 38.5 29.9411 38.5 20C38.5 10.0589 30.4411 2 20.5 2C10.5589 2 2.5 10.0589 2.5 20Z" />
                    </mask>
                    <path d="M40.5 20C40.5 31.0457 31.5457 40 20.5 40C9.4543 40 0.5 31.0457 0.5 20C0.5 8.9543 9.4543 0 20.5 0C31.5457 0 40.5 8.9543 40.5 20ZM2.5 20C2.5 29.9411 10.5589 38 20.5 38C30.4411 38 38.5 29.9411 38.5 20C38.5 10.0589 30.4411 2 20.5 2C10.5589 2 2.5 10.0589 2.5 20Z" stroke="#F5F5F5" stroke-width="12" mask="url(#path-1-inside-1_179661_4511)" />
                    <path d="M40.5 20C40.5 31.0457 31.5457 40 20.5 40C9.4543 40 0.5 31.0457 0.5 20C0.5 8.9543 9.4543 0 20.5 0C31.5457 0 40.5 8.9543 40.5 20ZM2.5 20C2.5 29.9411 10.5589 38 20.5 38C30.4411 38 38.5 29.9411 38.5 20C38.5 10.0589 30.4411 2 20.5 2C10.5589 2 2.5 10.0589 2.5 20Z" fill="#52C41A" />
                </g>
                <path d="M30.3754 12.9531H28.7371C28.5074 12.9531 28.2894 13.0586 28.1488 13.2391L18.4855 25.4805L13.8519 19.6094C13.7818 19.5204 13.6925 19.4484 13.5906 19.3989C13.4887 19.3494 13.3769 19.3236 13.2637 19.3234H11.6254C11.4683 19.3234 11.3816 19.5039 11.4777 19.6258L17.8973 27.7586C18.1973 28.1383 18.7738 28.1383 19.0762 27.7586L30.523 13.2531C30.6191 13.1336 30.5324 12.9531 30.3754 12.9531Z" fill="#52C41A" />
            </g>
            <defs>
                <clipPath id="clip0_179661_4511">
                    <rect width="40" height="40" fill="white" transform="translate(0.5)" />
                </clipPath>
                <clipPath id="clip1_179661_4511">
                    <rect width="40" height="40" fill="white" transform="translate(0.5)" />
                </clipPath>
            </defs>
        </svg>

    );
};

export default SuccessOrderIcon;

