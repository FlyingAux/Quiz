"use client";

import React, { useEffect, useState } from "react";

const LeaderboardPage = () => {
  const [score, setScore] = useState(null);
  const [quizSummary, setQuizSummary] = useState(null);

  useEffect(() => {
    const storedScore = localStorage.getItem("quizScore");
    const storedQuizState = localStorage.getItem("quizState");

    if (storedScore) {
      setScore(storedScore);
    }

    if (storedQuizState) {
      setQuizSummary(JSON.parse(storedQuizState));
    }
  }, []);

  const restartQuiz = () => {
    localStorage.removeItem("quizScore");
    localStorage.removeItem("quizState");
    window.location.href = "/questions";
  };

  return (
    <div className="flex h-screen w-full ">

      <div className="h-full w-[50%] flex items-center justify-center px-6">
        <div className="mt-4">
          <h3 className="font-bold mb-3 text-3xl">Quiz Summary:</h3>
          {quizSummary ? (
            <ul className="flex flex-col gap-3">
              {quizSummary.selectedOptions.map((item, index) => (
                <li key={index}>
                  <p className="text-lg font-semibold">- {item.question.description}</p>
                  <p
                    className={`font-bold ${
                      item.isCorrect ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    Your Answer: {item.selectedAnswer.description}{" "}
                    {item.isCorrect ? "(Correct)" : "(Wrong)"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No summary available.</p>
          )}
        </div>
      </div>

    <div className="h-full w-[50%] flex items-center justify-center flex-col">
    <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
      <div className="w-96 h-96  shadow-lg rounded-lg p-6 flex items-center justify-center flex-col">
        {score ? (
          <p className="text-2xl font-bold">You scored: {score}</p>
        ) : (
          <p>Score not available.</p>
        )}

        <div className="mt-4">
          <h3 className="font-semibold">Top Scores:</h3>
          <ul>
            <li>1. John Doe - 40</li>
            <li>2. Jane Smith - 40</li>
            <li>3. Bob Johnson - 30</li>
          </ul>
        </div>

        <div className="mt-6">
          <button
            onClick={restartQuiz}
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>

    </div>
  );
};

export default LeaderboardPage;
