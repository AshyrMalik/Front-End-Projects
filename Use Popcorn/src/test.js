import { useState } from "react";
import "./styles.css";
export default function TextExpander({
  children,
  collapsedNumWords = 10,
  expandButtonText = "Show More",
  collapseButtonText = "Collapse text",
  buttonColor = "blue",
  expanded = false,
  className = "",
}) {
  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: buttonColor,
  };

  const [isExpanded, setIsExpanded] = useState(expanded);
  function HandleSetExpanded() {
    setIsExpanded(!isExpanded);
  }
  return (
    <div className={className}>
      <span>
        {isExpanded
          ? children
          : children.split(" ").slice(0, collapsedNumWords).join(" ") + "..."}
      </span>
      <button style={buttonStyle} onClick={() => HandleSetExpanded()}>
        {isExpanded ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
