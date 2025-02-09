import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLightbulb, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Points from "./Points";
import Results from "./Result";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [userAnswers, setUserAnswers] = useState([]); // Track user's answers

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/quiz");
        setQuizData(response.data.questions || []);
      } catch (err) {
        setError("Failed to load quiz data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (quizData.length === 0)
    return <p className="text-center">No quiz data available</p>;

  const currentQuestion = quizData[currentIndex];

  const handleOptionClick = (optionId) => {
    if (!isSubmitted) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      toast.error("Please select an option before submitting.");
      return;
    }

    const selectedOptionData = currentQuestion.options.find(
      (opt) => opt.id === selectedOption
    );
    const isCorrect = selectedOptionData?.is_correct;

    // Save the answer
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: currentQuestion.description, isCorrect },
    ]);

    // Show modal feedback
    setModalType(isCorrect ? "correct" : "wrong");
    setIsModalOpen(true);

    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex === quizData.length - 1) return; // End of quiz
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsModalOpen(false);
    setModalType("");
  };

  if (userAnswers.length === quizData.length) {
    return <Results answers={userAnswers} totalQuestions={quizData.length} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center mb-6"
      >
        <FaLightbulb className="w-8 h-8 md:w-10 md:h-10 text-yellow-300 mr-2" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-center">
          Quiz: Genetics and Evolution
        </h1>
      </motion.div>

      {/* Quiz Card */}
      <div className="bg-white text-gray-900 p-6 md:p-8 rounded-lg shadow-lg max-w-2xl w-full">
        {/* Question */}
        <h3 className="font-semibold text-lg md:text-xl mb-4">
          {currentIndex + 1}. {currentQuestion.description}
        </h3>

        {/* Options */}
        <ul className="space-y-3">
          {currentQuestion.options?.map((option, index) => (
            <motion.li
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              whileTap={{ scale: 0.95 }}
              className={`border p-3 rounded cursor-pointer transition-all font-medium ${
                selectedOption === option.id
                  ? isSubmitted
                    ? option.is_correct
                      ? "bg-green-500 text-white border-green-700"
                      : "bg-red-500 text-white border-red-700"
                    : "bg-gray-800 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {index + 1}. {option.description}
            </motion.li>
          ))}
        </ul>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <button
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50 w-full md:w-auto"
          >
            <FaArrowLeft /> Previous
          </button>

          {!isSubmitted ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full md:w-auto"
            >
              Submit Answer
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={currentIndex === quizData.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded disabled:opacity-50 w-full md:w-auto"
            >
              Next <FaArrowRight />
            </motion.button>
          )}
        </div>
      </div>

      <Points
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </div>
  );
};

export default Quiz;
