import React from "react";

interface StarProps {
  className?: string;
}

const Star: React.FC<StarProps> = ({ className = "" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" className={className}>
    <g filter="url(#filter0_d_53_34)">
      <path
        d="M12 3L12.5099 6.0955C12.9659 8.86412 15.1359 11.0341 17.9045 11.4901L21 12L17.9045 12.5099C15.1359 12.9659 12.9659 15.1359 12.5099 17.9045L12 21L11.4901 17.9045C11.0341 15.1359 8.86412 12.9659 6.0955 12.5099L3 12L6.0955 11.4901C8.86412 11.0341 11.0341 8.86412 11.4901 6.0955L12 3Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_53_34"
        x="-0.4"
        y="0"
        width="24.8"
        height="24.9"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.5" />
        <feGaussianBlur stdDeviation="0.2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.954167 0 0 0 0 0.954167 0 0 0 0 0.954167 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_53_34"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_53_34"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Star;
