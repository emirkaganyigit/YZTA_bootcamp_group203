import { useState } from "react";
import Navbar from "./components/Navbar";
import QuestionBox from "./components/QuestionBox";
import questions from "./data/questions";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentIndex].id]: value,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    console.log("Cevaplar:", answers);
    // backend eklenecek
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="text-center mt-16 text-lg font-semibold">
        Detaylı analiz için lütfen soruları cevaplayın
      </div>

      <div className="flex justify-center mt-10">
        <QuestionBox
          question={questions[currentIndex]}
          index={currentIndex}
          total={questions.length}
          answer={answers[questions[currentIndex].id] || ""}
          onChange={handleAnswerChange}
          onBack={handleBack}
          onNext={handleNext}
          onFinish={handleFinish}
        />
      </div>
    </div>
  );
}


