import { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaLightbulb } from "react-icons/fa";

const QuizSolution = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/quiz");
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!quiz || !quiz.questions || quiz.questions.length === 0)
    return <p>No questions found.</p>;

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg px-50">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center">
        Solutions
      </h1>

      {quiz.questions.map((question, index) => (
        <div key={question.id} className="mt-6 border-b pb-4">
          <h3 className="text-gray-800 font-medium">
            {index + 1}. {question.description}
          </h3>

          <h4 className="mt-4 text-green-600 font-semibold">
            Correct Answers:
          </h4>
          {question.options
            ?.filter((opt) => opt.is_correct)
            .map((correctOption) => (
              <div
                key={correctOption.id}
                className="mt-2 p-3 border-l-4 border-green-500 bg-green-100 flex items-center gap-2"
              >
                <FaCheckCircle className="text-green-600" />
                <p className="text-green-700">{correctOption.description}</p>
              </div>
            ))}

          <button
            onClick={() =>
              setShowSolution(showSolution === question.id ? null : question.id)
            }
            className="mt-4 flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FaLightbulb />
            {showSolution === question.id ? "Hide Solution" : "View Solution"}
          </button>

          {showSolution === question.id && (
            <div className="mt-4 p-4 border rounded-md bg-gray-100 text-gray-700">
              <p>
                {question.detailed_solution ||
                  "No detailed solution available."}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizSolution;
