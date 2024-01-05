import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React from "react";

const CardIcon: React.FC<FontAwesomeIconProps> = ({
  icon,
  className,
  size,
}) => {
  return (
    <div className={className}>
      <FontAwesomeIcon icon={icon} size={size ? size : "1x"} />
    </div>
  );
};

export default CardIcon;
