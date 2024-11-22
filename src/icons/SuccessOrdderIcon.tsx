import React from 'react';

type SuccessOrderIconProps = React.SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string; // Add a color prop to customize the fill color
    strokeColor?: string;
};

const SuccessOrderIcon: React.FC<SuccessOrderIconProps> = ({ className, color = 'none', strokeColor = 'black', ...props }) => {
    return (
        <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_dd_0_1)">
                <circle cx="43.5" cy="39.5" r="37" stroke="#B5E8BA" stroke-width="5" shape-rendering="crispEdges" />
            </g>
            <g filter="url(#filter1_dd_0_1)">
                <path d="M23 39.8347L25.5151 37.2435L37.3533 48.8608L61.3982 25L64 27.5696L37.3533 54L23 39.8347Z" fill="black" />
            </g>
            <defs>
                <filter id="filter0_dd_0_1" x="0" y="0" width="87" height="87" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow_0_1" result="effect2_dropShadow_0_1" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_0_1" result="shape" />
                </filter>
                <filter id="filter1_dd_0_1" x="19" y="25" width="49" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow_0_1" result="effect2_dropShadow_0_1" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_0_1" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default SuccessOrderIcon;

