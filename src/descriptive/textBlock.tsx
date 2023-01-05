import React from 'react';

interface IText {
    text: string,
    length: number
  }

export const SmartText = ({ text, length }:IText) => {
    const [showLess, setShowLess] = React.useState(true);
  
    if (text.length < length) {
      return <p
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    ></p>
    }
  
    return (
      <div>
        <p
          dangerouslySetInnerHTML={{
            __html: showLess ? `${text.slice(0, length)}...` : text,
          }}
        >
        </p>
        <a
          style={{ color: "#1ea087", cursor: "pointer" }}
          onClick={() => setShowLess(!showLess)}
        >
        View {showLess ? "More" : "Less"}
        </a>
      </div>
    );
  };