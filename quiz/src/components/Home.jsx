import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [countdown, setCountdown] = useState(null);
  const navigate = useNavigate();

  const startCountdown = () => {
    let count = 5;
    setCountdown(count);
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        navigate("/quiz");
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-center text-white">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl font-extrabold mb-6 drop-shadow-lg"
      >
        Welcome to the Quiz
      </motion.h1>

      {countdown === null ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={startCountdown}
          className="bg-black px-8 py-3 rounded-full text-lg sm:text-xl font-semibold shadow-lg hover:bg-gray-800 transition-all relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 hover:opacity-20 transition-all"></span>
          Start Quiz
        </motion.button>
      ) : (
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-3xl sm:text-4xl font-bold"
        >
          Starting in {countdown}...
        </motion.h2>
      )}
    </div>
  );
};

export default Home;
