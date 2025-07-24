import os
import re
import json
from dotenv import load_dotenv
import google.generativeai as genai

class HealthAnalyzer:
    def __init__(self):
        # .env dosyasından API anahtarını yükle
        load_dotenv()
        self.API_KEY = os.getenv("API_KEY")

        if not self.API_KEY:
            raise ValueError("API anahtarı bulunamadı. .env dosyasını kontrol edin.")

        # Google Generative AI yapılandırması
        genai.configure(api_key=self.API_KEY)

        # Gemini modelini dışa aktar
        self.model = genai.GenerativeModel("gemini-1.5-flash")


    def create_health_prompt(self, user_data: dict) -> str:
        prompt = f"""
    Sen bir dijital sağlık asistanısın. Kullanıcının yaş, cinsiyet, vücut ölçüleri ve yaşam alışkanlıklarına göre onun obeziteye ve kalp krizi riskine karşı genel sağlık durumunu analiz etmelisin.
    
    Lütfen aşağıdaki yönergelere uygun bir değerlendirme yap:
    
    1. **Vücut Kitle İndeksi (BMI)** hesapla.
    2. BMI seviyesini belirle. (zayıf, normal, fazla kilolu, obez).
    3. Kullanıcının genel **sağlık risk puanını** hesapla (0–100 arasında bir puan ver).
    4. Kullanıcının **kalp krizi riski seviyesini** belirle (Düşük / Orta / Yüksek).
    5. Son olarak aşağıdaki başlıklar altında **kişiye özel öneriler ver** ve her önerinin altına **neden bu öneriyi verdiğini** kısaca açıklayan bir cümle yaz.
    
    ---
    
    ### Beslenme Önerileri
    - Kullanıcının sebze tüketimi, yüksek kalorili gıda alışkanlığı ve ara öğün durumuna göre kişiselleştirilmiş 2 öneri ver.
    - Her önerinin altına nedenini yaz: “Bu öneri, [...] için önemlidir.”
    
    ### Aktivite Önerileri
    - Fiziksel aktivite düzeyi, teknoloji kullanımı ve ulaşım yöntemine göre günlük yaşamda uygulanabilir 2 egzersiz/aktivite tavsiyesi ver.
    - Her bir tavsiyenin neden işe yaradığını açıkla.
    
    ### Günlük Alışkanlıklar
    - Su tüketimi, sigara, alkol gibi alışkanlıklara göre küçük ama etkili öneriler ver.
    - Önerilerin altında kısa bilimsel açıklamalar yer alsın.
    
    ### Haftalık Hedefler
    - Sağlık puanını artırmaya yardımcı olacak ölçülebilir haftalık 2 hedef belirle (örneğin: haftada 3 gün yürüyüş, günde 2 litre su).
    - Her hedefin altında neden bu hedefin faydalı olduğunu belirt.
    
    ---
    
    **Kullanıcı Bilgileri:**
    - Yaş: {user_data.get("age")}
    - Cinsiyet: {user_data.get("gender")}
    - Boy: {user_data.get("height_cm")} cm
    - Kilo: {user_data.get("weight_kg")} kg
    - Ailede kilo geçmişi: {user_data.get("family_history")}
    - Sık kalorili yemek tüketimi: {user_data.get("high_caloric_food")}
    - Sebze tüketimi: {user_data.get("vegetable_consumption")}
    - Günlük öğün sayısı: {user_data.get("meals_per_day")}
    - Ara öğün tüketimi: {user_data.get("snacks")}
    - Sigara: {user_data.get("smoke")}
    - Su tüketimi: {user_data.get("water_intake")}
    - Günlük fiziksel aktivite: {user_data.get("physical_activity")}
    - Alkol: {user_data.get("alcohol")}
    - Teknoloji kullanımı: {user_data.get("tech_use")}
    - Ulaşım: {user_data.get("transportation")}
    
    ---
    
    Yanıtı **sadece geçerli JSON formatında** ver. JSON dışında başka bir şey yazma. Yanıt formatın aşağıdaki gibi olmalı:
    
    {{
      "bmi_skoru": 0-100,
      "bmi durumu": zayıf/normal/fazla kilolu/obez,
      "saglik_risk_skoru": 0-100,
      "kalp_krizi_riski": "Düşük/Orta/Yüksek",
      "oneriler": {{
        "beslenme": [
          "Öneri → Neden: ..."
        ],
        "aktivite": [
          "Öneri → Neden: ..."
        ],
        "gunluk_aliskanliklar": [
          "Öneri → Neden: ...",
        ],
        "haftalik_hedef": [
          "Hedef → Neden: ..."
        ]
      }}
    }}
    """
        return prompt

    def extract_json_from_response(self, response_text: str) -> dict:
        match = re.search(r"```json\s*(\{[\s\S]*?\})\s*```", response_text)
        if not match:
            raise ValueError("JSON formatında bir veri bulunamadı.")

        json_str = match.group(1)
        return json.loads(json_str)

    def get_health_analysis(self, user_data: dict) -> dict:
        prompt = self.create_health_prompt(user_data)
        response = self.model.generate_content(prompt)
        response_text = response.text
        parsed_response = self.extract_json_from_response(response_text)
        response_json = json.dumps(parsed_response, ensure_ascii=False, indent=2)
        health_data = json.loads(response_json)
        return health_data



if __name__ == "__main__":
    sample_user_data = {
        "age": 55,
        "gender": "Kadın",
        "height_cm": 175,
        "weight_kg": 68,
        "family_history": "Evet",
        "high_caloric_food": "Sık tüketiyor",
        "vegetable_consumption": "Düzenli",
        "meals_per_day": 3,
        "snacks": "Bazen",
        "smoke": "Hayır",
        "water_intake": "2 litre",
        "physical_activity": "Orta",
        "alcohol": "Az",
        "tech_use": "Günde 5 saat",
        "transportation": "Yürüyüş"
    }

    analyzer = HealthAnalyzer()
    result = analyzer.get_health_analysis(sample_user_data)
    risk_skoru = result.get("saglik_risk_skoru", None)
    print(risk_skoru)