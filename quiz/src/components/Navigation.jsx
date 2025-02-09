import React from "react";

const Navigation = ({ currentIndex, totalQuestions, onNext }) => {
  return (
    <div className="flex justify-between mt-4">
      <p>
        Question {currentIndex + 1} of {totalQuestions}
      </p>
      <button
        onClick={onNext}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {currentIndex === totalQuestions - 1 ? "Finish Quiz" : "Next"}
      </button>
    </div>
  );
};

export default Navigation;
