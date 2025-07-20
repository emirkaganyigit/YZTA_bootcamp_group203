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
  const renderInput = () => {
    if (question.type === "multiple") {
      return (
        <div className="flex flex-col gap-2 mt-4">
          {question.options.map((opt) => (
            <label key={opt} className="flex items-center gap-2">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={opt}
                checked={answer === opt}
                onChange={(e) => onChange(e.target.value)}
              />
              {opt}
            </label>
          ))}
        </div>
      );
    } else {
      return (
        <input
          type="text"
          className="mt-4 border border-gray-300 p-2 rounded w-full"
          value={answer}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-[600px] h-[300px] flex flex-col justify-between">
      <div>
        <div className="text-gray-500 text-sm mb-1">Soru {index + 1} / {total}</div>
        <div className="text-xl font-semibold">{question.text}</div>
        {renderInput()}
      </div>

      <NavigationButtons
        showBack={index > 0}
        showNext={index < total - 1}
        onBack={onBack}
        onNext={onNext}
        onFinish={onFinish}
      />
    </div>
  );
}
