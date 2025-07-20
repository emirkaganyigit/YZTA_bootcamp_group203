const questions = [
  { id: 1, text: "Yaşınız", type: "text" },
  { id: 2, text: "Cinsiyet", type: "multiple", options: ["Kadın", "Erkek"] },
  { id: 3, text: "Boyunuz", type: "text" },
  { id: 4, text: "Kilonuz", type: "text" },
  { id: 5, text: "Ailenizde fazla kilo geçmişi var mı?", type: "multiple", options: ["Evet", "Hayır"] },
  { id: 6, text: "Sık sık yüksek kalorili yiyecekler tüketiyor musunuz?", type: "multiple", options: ["Evet", "Hayır"] },
  { id: 7, text: "Günlük sebze tüketim sıklığı", type: "multiple", options: ["Az", "Orta", "Çok"] },
  { id: 8, text: "Günde kaç ana öğün yiyorsunuz?", type: "multiple", options: ["1", "2", "3", "4+"] },
  { id: 9, text: "Ara öğün tüketimi", type: "multiple", options: ["Yok", "Bazen", "Sık"] },
  { id: 10, text: "Sigara kullanıyor musunuz?", type: "multiple", options: ["Evet", "Hayır"] },
  { id: 11, text: "Günde ne kadar su içiyorsunuz?", type: "multiple", options: ["1 bardaktan az", "1-2 bardak", "2-3 bardak", "3+ bardak"] },
  { id: 12, text: "Günlük fiziksel aktivite süresi", type: "multiple", options: ["Yok", "Haftada birkaç gün", "Günlük hafif", "Günlük yoğun"] },
  { id: 13, text: "Alkol tüketiyor musunuz?", type: "multiple", options: ["Hayır", "Bazen", "Sık"] },
  { id: 14, text: "Günlük teknoloji kullanımı süresi", type: "multiple", options: ["0-1 saat", "2-4 saat", "5+ saat"] },
  { id: 15, text: "Günlük ulaşım yöntemi", type: "multiple", options: ["Yürüyerek", "Bisiklet", "Toplu taşıma", "Kişisel araç"] },
];

export default questions;
