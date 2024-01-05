import React from "react";

const CardContent: React.FC<{ content: string; className?: string }> = ({
  content,
  className,
}) => {
  return (
    <div>
      <section className={!className ? "text-l text-slate-400" : className}>
        {content}
      </section>
    </div>
  );
};

export default CardContent;
