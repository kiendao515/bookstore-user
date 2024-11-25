import React from 'react';

type HeartIconProps = React.SVGProps<SVGSVGElement> & {
    className?: string;
    color?: string; // Add a color prop to customize the fill color
    strokeColor?: string;
};

const FailOrderIcon: React.FC<HeartIconProps> = ({ className, color = 'none', strokeColor = 'black', ...props }) => {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 20C0.5 9.23045 9.23045 0.5 20 0.5C30.7696 0.5 39.5 9.23045 39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20Z" stroke="#FAAD14" />
            <path d="M21.1562 19.999L27.0155 13.0146C27.1137 12.8985 27.0312 12.7222 26.8794 12.7222H25.0981C24.9932 12.7222 24.8928 12.769 24.8236 12.8494L19.991 18.6106L15.1584 12.8494C15.0914 12.769 14.991 12.7222 14.8838 12.7222H13.1026C12.9508 12.7222 12.8682 12.8985 12.9664 13.0146L18.8258 19.999L12.9664 26.9833C12.9444 27.0092 12.9303 27.0408 12.9257 27.0745C12.9212 27.1082 12.9264 27.1424 12.9407 27.1732C12.9551 27.204 12.9779 27.23 13.0066 27.2482C13.0353 27.2664 13.0686 27.2759 13.1026 27.2757H14.8838C14.9887 27.2757 15.0892 27.2289 15.1584 27.1485L19.991 21.3873L24.8236 27.1485C24.8905 27.2289 24.991 27.2757 25.0981 27.2757H26.8794C27.0312 27.2757 27.1137 27.0994 27.0155 26.9833L21.1562 19.999Z" fill="#FAAD14" />
        </svg>

    );
};

export default FailOrderIcon;

