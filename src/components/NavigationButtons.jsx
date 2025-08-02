export default function NavigationButtons({ showBack, showNext, onBack, onNext, onFinish, canProceed = true }) {
  return (
    <div className="flex justify-between mt-6">
      {showBack ? (
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-400 hover:bg-gray-300 rounded-lg transition-colors font-semibold"
        >
          ← Geri
        </button>
      ) : (
        <div />
      )}

      {showNext ? (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-6 py-3 rounded-lg transition-colors font-semibold ${
            canProceed 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          İleri →
        </button>
      ) : (
        <button
          onClick={onFinish}
          disabled={!canProceed}
          className={`px-6 py-3 rounded-lg transition-colors font-semibold ${
            canProceed 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Analizi Tamamla
        </button>
      )}
    </div>
  );
}
