import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading: React.FC<HeadingProps> = ({ children, className, level }) => {
  const HeadingTag = `h${level}`;

  return React.createElement(HeadingTag, { className }, children);
};

export default Heading;
