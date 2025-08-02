import NavigationButtons from "./NavigationButtons";

export default function QuestionBox({
  question,
  index,
  total,
  answer,
  onChange,
  onBack,
  onNext,
  onFinish,
}) {
  const progressPercentage = ((index + 1) / total) * 100;

  const renderInput = () => {
    if (question.type === "multiple") {
      return (
        <div className="flex flex-col gap-3 mt-6">
          {question.options.map((opt) => (
            <label key={opt} className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-colors">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={opt}
                checked={answer === opt}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      );
    } else {
      return (
        <div className="mt-6">
          <input
            type="text"
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            value={answer}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Cevabınızı buraya yazın..."
          />
        </div>
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-w-full">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Soru {index + 1} / {total}</span>
          <span>%{Math.round(progressPercentage)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{question.text}</h2>
        {renderInput()}
      </div>

      <NavigationButtons
        showBack={index > 0}
        showNext={index < total - 1}
        onBack={onBack}
        onNext={onNext}
        onFinish={onFinish}
        canProceed={answer && answer.trim() !== ""}
      />
    </div>
  );
}
