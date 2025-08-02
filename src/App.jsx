import { useState } from "react";
import Navbar from "./components/Navbar";
import QuestionBox from "./components/QuestionBox";
import ResultsPage from "./components/ResultsPage";
import questions from "./data/questions";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const testBackendConnection = async (port) => {
    try {
      console.log(`Testing connection to port ${port}...`);
      const response = await fetch(`http://127.0.0.1:${port}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(`Port ${port} response:`, response.status, response.ok);
      return response.ok;
    } catch (error) {
      console.log(`Port ${port} failed:`, error.message);
      return false;
    }
  };

  const handleFinish = async () => {
    console.log("=== Starting Analysis ===");
    console.log("Answers:", answers);

    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    if (unansweredQuestions.length > 0) {
      console.log("Unanswered questions:", unansweredQuestions);
      setError("Lütfen tüm soruları cevaplayın.");
      return;
    }

    setLoading(true);
    setError(null);

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

    console.log("User data to send:", userData);

    try {
      const ports = [5001, 5000, 8000];
      let workingPort = null;
      
      for (const port of ports) {
        if (await testBackendConnection(port)) {
          workingPort = port;
          break;
        }
      }

      if (!workingPort) {
        throw new Error("Backend bağlantısı kurulamadı. Lütfen backend'in çalıştığından emin olun.");
      }

      console.log(`Using backend port: ${workingPort}`);

      const response = await fetch(`http://127.0.0.1:${workingPort}/api/analiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error(`Sunucu hatası: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("API response data:", data);

      if (!data.bmi_skoru || !data.saglik_risk_skoru || !data.oneriler) {
        console.log("Invalid response structure:", data);
        throw new Error("API'den geçersiz yanıt alındı");
      }
      
      console.log("Setting result:", data);
      setResult(data);
    } catch (error) {
      console.error("API isteği sırasında hata oluştu:", error);
      setError(`Analiz sırasında bir hata oluştu: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setError(null);
  };

  if (result) {
    console.log("Rendering results page with:", result);
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <ResultsPage result={result} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="text-center mt-16 text-lg font-semibold">
        Detaylı analiz için lütfen soruları cevaplayın
      </div>

      {error && (
        <div className="max-w-md mx-auto mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg">Analiz yapılıyor...</span>
        </div>
      )}

      {!loading && (
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
