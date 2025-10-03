import React from "react";

interface WikipediaLogoStandProps {
  className?: string;
}

const WikipediaLogoStand: React.FC<WikipediaLogoStandProps> = ({
  className = "",
}) => (
  <svg
    width="283"
    height="282"
    viewBox="0 0 283 282"
    fill="none"
    className={className}
  >
    <ellipse
      cx="141.5"
      cy="215.5"
      rx="141.5"
      ry="36.5"
      fill="url(#paint0_radial_93_1569)"
    />
    <g filter="url(#filter0_dii_93_1569)">
      <path
        d="M172.408 211.455L145.336 151.059C134.549 170.991 122.705 191.924 112.553 211.455C112.448 211.556 107.583 211.455 107.583 211.455C92.0378 176.901 75.9637 142.846 60.3127 108.592C56.7172 100.179 44.0272 86.7572 35.25 86.7572V82.25H88.7595V86.7572C82.4145 86.7572 71.628 90.7635 74.3775 97.2739C81.9915 112.698 108.64 172.494 115.937 187.718C120.907 178.303 134.972 153.463 141 142.947C136.241 134.133 121.225 101.08 116.783 92.8669C113.399 87.4583 104.834 86.7572 98.277 86.7572C98.277 85.2548 98.3828 84.2532 98.277 82.3502L145.441 82.4503V86.4567C138.991 86.7572 132.963 88.8605 135.713 94.6697C142.058 107.089 145.759 116.004 151.575 127.522C153.373 124.117 162.89 105.587 167.438 95.8717C170.187 89.3613 166.063 86.7572 154.642 86.7572C154.747 85.5553 154.747 83.4519 154.747 82.4503C169.447 82.3502 191.548 82.3502 195.461 82.25V86.4567C187.953 86.7572 180.233 90.5632 176.215 96.3725L156.862 134.834C158.766 139.942 177.589 179.505 179.599 183.912L220.312 95.471C217.14 88.2596 208.045 86.7572 204.45 86.7572V82.25L246.75 82.5505V86.7572C237.444 86.7572 231.628 91.7651 228.244 99.2771C219.784 117.206 193.875 174.296 176.955 211.455H172.408Z"
        fill="#F6F6F6"
      />
    </g>
    <defs>
      <filter
        id="filter0_dii_93_1569"
        x="-7.3"
        y="-6"
        width="289.3"
        height="294.3"
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
        <feOffset dx="-5" dy="4" />
        <feGaussianBlur stdDeviation="1.15" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_93_1569"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_93_1569"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-6" />
        <feGaussianBlur stdDeviation="3.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.587555 0 0 0 0 0.855989 0 0 0 0 0.985577 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_93_1569"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-4" />
        <feGaussianBlur stdDeviation="2.7" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.826923 0 0 0 0 0.967731 0 0 0 0 1 0 0 0 0.75 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow_93_1569"
          result="effect3_innerShadow_93_1569"
        />
      </filter>
      <radialGradient
        id="paint0_radial_93_1569"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(142 215.5) rotate(-90) scale(55 234.707)"
      >
        <stop stopColor="#C4E8FF" stopOpacity="0" />
        <stop offset="0.588676" stopColor="#58BEFF" stopOpacity="0.2" />
        <stop offset="1" stopColor="#D4EEFF" />
      </radialGradient>
    </defs>
  </svg>
);

export default WikipediaLogoStand;
