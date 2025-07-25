import { useState } from "react";
import Navbar from "./components/Navbar";
import QuestionBox from "./components/QuestionBox";
import questions from "./data/questions";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

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

  const handleFinish = async () => {
    console.log("Cevaplar:", answers);

    // Backend'in beklediği key'lerle eşleştirme
    const userData = {
      age: answers[1] || null,
      gender: answers[2] || null,
      height_cm: answers[3] || null,
      weight_kg: answers[4] || null,
      family_history: answers[5] || null,
      high_caloric_food: answers[6] || null,
      vegetable_consumption: answers[7] || null,
      meals_per_day: answers[8] || null,
      snacks: answers[9] || null,
      smoke: answers[10] || null,
      water_intake: answers[11] || null,
      physical_activity: answers[12] || null,
      alcohol: answers[13] || null,
      tech_use: answers[14] || null,
      transportation: answers[15] || null,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/analiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }

      const data = await response.json();
      console.log("API'den gelen yanıt:", data);
      setResult(data);
    } catch (error) {
      console.error("API isteği sırasında hata oluştu:", error);
      alert("Veri gönderilirken hata oluştu!");
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="text-center mt-16 text-lg font-semibold">
        Detaylı analiz için lütfen soruları cevaplayın
      </div>

      {result ? (
        <div className="mt-10 text-center">
          <h2 className="text-xl font-bold">Analiz Sonucu</h2>
          <pre className="bg-white shadow p-4 rounded mt-4 text-left inline-block">
            {JSON.stringify(result, null, 2)}
          </pre>
          <button
            onClick={handleRestart}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Yeniden Başla
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
}
