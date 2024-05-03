import { useState, useEffect } from "react";
import "./flashcard.css";

interface FlashcardProps {
  arr: { question: string; answer: string }[];
  index: number;
}

export default function Flashcard({ arr, index }: FlashcardProps) {
  const [isInBack, setIsInBack] = useState(false);

  useEffect(() => {
    setIsInBack(false);
  }, [index]);

  return (
    <div className="flip-card">
      <div className={isInBack ? "flip-card-inner flip-card-inner-2" : "flip-card-inner"}>
        <div className={"flip-card-front"} onClick={() => setIsInBack(true)}>
          <div>{arr[index]?.question}</div>
        </div>
        <div className="flip-card-back" onClick={() => setIsInBack(false)}>
          <div>{arr[index]?.answer}</div>
        </div>
      </div>
    </div>
  );
}
