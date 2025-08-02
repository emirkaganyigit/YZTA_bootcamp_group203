import React from 'react';

export default function ResultsPage({ result, onRestart }) {
  if (!result) return null;

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Düşük':
        return 'text-green-600 bg-green-100';
      case 'Orta':
        return 'text-yellow-600 bg-yellow-100';
      case 'Yüksek':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getBMIColor = (bmiStatus) => {
    switch (bmiStatus) {
      case 'zayıf':
        return 'text-blue-600 bg-blue-100';
      case 'normal':
        return 'text-green-600 bg-green-100';
      case 'fazla kilolu':
        return 'text-yellow-600 bg-yellow-100';
      case 'obez':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
       
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sağlık Analiz Sonucunuz</h1>
          <p className="text-gray-600">Kişiselleştirilmiş sağlık değerlendirmeniz ve önerileriniz</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vücut Kitle İndeksi</h3>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getBMIColor(result['bmi durumu'])}`}>
                {result.bmi_skoru}
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getBMIColor(result['bmi durumu'])}`}>
                {result['bmi durumu']}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sağlık Risk Puanı</h3>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getHealthScoreColor(result.saglik_risk_skoru)}`}>
                {result.saglik_risk_skoru}/100
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getHealthScoreColor(result.saglik_risk_skoru).replace('text-', 'bg-')}`}
                  style={{ width: `${result.saglik_risk_skoru}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Kalp Krizi Riski</h3>
            <div className="text-center">
              <div className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${getRiskColor(result.kalp_krizi_riski)}`}>
                {result.kalp_krizi_riski}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {result.oneriler?.beslenme && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-green-500 mr-2">🥗</span>
                Beslenme Önerileri
              </h3>
              <div className="space-y-3">
                {result.oneriler.beslenme.map((recommendation, index) => (
                  <div key={index} className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                    <p className="text-gray-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.oneriler?.aktivite && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-blue-500 mr-2">🏃‍♂️</span>
                Aktivite Önerileri
              </h3>
              <div className="space-y-3">
                {result.oneriler.aktivite.map((recommendation, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                    <p className="text-gray-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.oneriler?.gunluk_aliskanliklar && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-purple-500 mr-2">📅</span>
                Günlük Alışkanlıklar
              </h3>
              <div className="space-y-3">
                {result.oneriler.gunluk_aliskanliklar.map((recommendation, index) => (
                  <div key={index} className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
                    <p className="text-gray-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.oneriler?.haftalik_hedef && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-orange-500 mr-2">🎯</span>
                Haftalık Hedefler
              </h3>
              <div className="space-y-3">
                {result.oneriler.haftalik_hedef.map((goal, index) => (
                  <div key={index} className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-400">
                    <p className="text-gray-800">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-8 space-x-4">
          <button
            onClick={onRestart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Yeni Analiz Yap
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            Sonucu Yazdır
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            ⚠️ Bu analiz sadece bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. 
            Sağlık sorunlarınız için mutlaka bir sağlık uzmanına danışınız.
          </p>
        </div>
      </div>
    </div>
  );
} 