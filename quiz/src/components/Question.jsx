import React from "react";

const Question = ({ question, onSelect, selectedOption }) => {
  return (
    <div>
      <h3 className="text-lg font-bold">{question.description}</h3>
      <ul className="mt-3 space-y-2">
        {question.options.map((option, index) => (
          <li
            key={option.id}
            onClick={() => onSelect(option.id, index, option.is_correct)}
            className={`p-2 border rounded cursor-pointer transition ${
              selectedOption === index + 1
                ? "bg-gray-800 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {index + 1}. {option.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
