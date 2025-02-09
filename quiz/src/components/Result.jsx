import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link for navigation

const Results = ({ answers, totalQuestions }) => {
  const correctAnswers = answers.filter((ans) => ans.isCorrect).length;
  const incorrectAnswers = answers.length - correctAnswers;
  const score = correctAnswers * 4 - incorrectAnswers * -1;

  // Expressions based on score range
  let feedbackMessage = "";
  let feedbackColor = "";

  if (score >= 30) {
    feedbackMessage = "🎉 Excellent! Keep it up! 🎯";
    feedbackColor = "text-green-600";
  } else if (score >= 20) {
    feedbackMessage = "😊 Well done! You can improve further!";
    feedbackColor = "text-yellow-500";
  } else {
    feedbackMessage = "😔 You can do better! Keep practicing!";
    feedbackColor = "text-red-600";
  }

  const data = [
    { name: "Correct", value: correctAnswers },
    { name: "Incorrect", value: incorrectAnswers },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6 bg-white shadow-2xl rounded-xl text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800">Quiz Completed!</h2>

        <motion.p
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mt-4 font-semibold text-gray-700"
        >
          Total Score: <span className="text-blue-600">{score}/40</span>
        </motion.p>

        {/* Feedback Message */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`mt-4 text-lg font-bold ${feedbackColor}`}
        >
          {feedbackMessage}
        </motion.p>

        {/* Graph Section */}
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} barSize={50}>
              <XAxis dataKey="name" tick={{ fill: "#4B5563", fontSize: 14 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Answer Summary */}
        <div className="mt-6 space-y-2">
          <p className="text-green-600 text-lg">
            ✅ Correct Answers: {correctAnswers}
          </p>
          <p className="text-red-600 text-lg">
            ❌ Incorrect Answers: {incorrectAnswers}
          </p>
          <p className="text-gray-500">
            Total Questions Attempted: {answers.length} / {totalQuestions}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex gap-4 justify-center">
          {/* Restart Quiz Button */}
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Restart Quiz
          </button>

          {/* Correct Answers Button */}
          <Link to="/answers">
            <button className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition">
              Correct Answers
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Results;
