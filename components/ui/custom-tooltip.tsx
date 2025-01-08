import React, { ReactNode } from "react";
import "./custom-tooltip.css";

interface CustomTooltipProps {
  children: ReactNode;
  content: ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ children, content }) => {
  return (
    <div className="custom-tooltip-container">
      {children}
      <div className="custom-tooltip-content">{content}</div>
    </div>
  );
};

export default CustomTooltip; 