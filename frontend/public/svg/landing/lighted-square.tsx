import React from "react";

interface LigatedSquareProps {
  className?: string;
}

const LigatedSquare: React.FC<LigatedSquareProps> = ({ className = "" }) => (
  <svg
    width="226"
    height="542"
    viewBox="0 0 226 542"
    fill="none"
    className={className}
  >
    <g filter="url(#filter0_ddd_82_1457)">
      <path
        d="M227 454.5L110 414L21 495L137.5 535.5L227 454.5Z"
        fill="url(#paint0_radial_82_1457)"
      />
      <path
        d="M227 454.5L110 414L21 495L137.5 535.5L227 454.5Z"
        fill="black"
        fillOpacity="0.05"
      />
    </g>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M227 454.5V39L137.5 123L21 81L21.5 495L110 414L137.5 423.519L227 454.5Z"
      fill="url(#paint1_linear_82_1457)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M227 454.5V39L137.5 123L21 81L21.5 495L110 414L137.5 423.519L227 454.5Z"
      fill="black"
      fillOpacity="0.05"
    />
    <path
      d="M137.5 535.5L227 454.5M137.5 535.5L21.5 495M137.5 535.5V423.519M227 454.5V39M227 454.5L137.5 423.519M227 39L137.5 123M227 39L110 1L21 81M137.5 123L21 81M137.5 123V423.519M21.5 495L110 414L137.5 423.519M21.5 495L21 81"
      stroke="url(#paint2_linear_82_1457)"
    />
    <defs>
      <filter
        id="filter0_ddd_82_1457"
        x="0.799999"
        y="397.8"
        width="246.4"
        height="161.9"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-2" />
        <feGaussianBlur stdDeviation="4.55" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.345098 0 0 0 0 0.745098 0 0 0 0 1 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_82_1457"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="10" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.345098 0 0 0 0 0.745098 0 0 0 0 1 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_82_1457"
          result="effect2_dropShadow_82_1457"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="10.1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.345098 0 0 0 0 0.745098 0 0 0 0 1 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_dropShadow_82_1457"
          result="effect3_dropShadow_82_1457"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect3_dropShadow_82_1457"
          result="shape"
        />
      </filter>
      <radialGradient
        id="paint0_radial_82_1457"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(124 474.75) rotate(77.0226) scale(62.3423 97.1985)"
      >
        <stop stop-color="#C6E9FF" />
        <stop offset="1" stop-color="#6EC7FF" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_82_1457"
        x1="124"
        y1="35"
        x2="124"
        y2="535.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.169281" stop-color="#D4EEFF" stop-opacity="0" />
        <stop offset="0.471014" stop-color="#B1E1FF" stop-opacity="0.2" />
        <stop offset="1" stop-color="#62C2FE" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_82_1457"
        x1="124"
        y1="35"
        x2="124"
        y2="535.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.110577" stop-color="#D4EEFF" stop-opacity="0.01" />
        <stop offset="0.375" stop-color="#B2E1FF" stop-opacity="0.01" />
        <stop offset="1" stop-color="#62C2FE" stop-opacity="0.01" />
      </linearGradient>
    </defs>
  </svg>
);

export default LigatedSquare;
