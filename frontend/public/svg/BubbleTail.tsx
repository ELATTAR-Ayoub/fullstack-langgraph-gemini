import React from "react";

interface BubbleTailProps {
  className?: string;
}

const BubbleTail: React.FC<BubbleTailProps> = ({ className = "" }) => (
  <svg width={16} height={7} viewBox="0 0 16 7" className={className}>
    <path
      d="M16 4C11.2794 6.58447 6.86751 7.20619 0.499929 5.5C0.499929 5.5 5.25019 3.76258 7.99992 0.499987C9.48136 3.06592 12.7712 4.21933 16 4Z"
      fill="currentColor"
    />
  </svg>
);

export default BubbleTail;
