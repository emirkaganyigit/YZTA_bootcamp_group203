export default function NavigationButtons({ showBack, showNext, onBack, onNext, onFinish }) {
  return (
    <div className="flex justify-between mt-4">
      {showBack ? (
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-400 hover:bg-gray-300 rounded"
        >
          Geri
        </button>
      ) : (
        <div />
      )}

      {showNext ? (
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-800 text-white hover:bg-blue-600 rounded"
        >
          İleri
        </button>
      ) : (
        <button
          onClick={onFinish}
          className="px-4 py-2 bg-green-500 text-white hover:bg-green-900 rounded"
        >
          Bitir
        </button>
      )}
    </div>
  );
}
