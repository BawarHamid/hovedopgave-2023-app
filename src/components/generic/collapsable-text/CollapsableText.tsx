import React, { useState } from "react";

type Props = {
  text: string;
  amountOfCharacters?: number;
  paddingLeft?: number;
};

// TODO: change amount of characters to be amount of lines
const CollapsableText: React.FC<Props> = ({
  text,
  amountOfCharacters = 50,
  paddingLeft = 0,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const shouldShowMore = text.length > amountOfCharacters;
  const className = paddingLeft ? `pl-${paddingLeft}` : "";

  return (
    <div className={className}>
      {isCollapsed ? (
        <h5 className="leading-[20px] text-brand-black">
          {text.slice(0, amountOfCharacters)}
          <br />
          {shouldShowMore && (
            <span
              className="cursor-pointer font-bold"
              onClick={() => setIsCollapsed(false)}
            >
              Show more...
            </span>
          )}
        </h5>
      ) : (
        <h5 className="leading-[20px] text-brand-black">
          {text}
          <br />
          {shouldShowMore && (
            <span
              className="cursor-pointer font-bold"
              onClick={() => setIsCollapsed(true)}
            >
              Show less...
            </span>
          )}
        </h5>
      )}
    </div>
  );
};

export default CollapsableText;
