import google.generativeai as genai

API_KEY = "api key --"

# 🔐 API anahtarı kontrolü
if not API_KEY:
    raise ValueError("API_KEY eksik")

# ✅ Google Generative AI yapılandırması
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

def generate_recommendation(user_data):
    prompt = f"""
    Kullanıcı sağlık verileri:
    - Yaş: {user_data['yas']}
    - Cinsiyet: {user_data['cinsiyet']}
    - Boy: {user_data['boy']} cm
    - Kilo: {user_data['kilo']} kg
    - Aktivite: {user_data['aktivite']}
    - Su tüketimi: {user_data['su']}
    - Sigara: {user_data['sigara']}
    - Alkol: {user_data['alkol']}
    - Sebze tüketimi: {user_data['sebze']}
    - Kalorili gıda alışkanlığı: {user_data['kalorili_yiyecek']}
    - Ara öğün: {user_data['ara_ogun']}
    - Ailede kilo problemi: {user_data['ailede_kilo']}

    Bu kullanıcı için:
    1. Genel sağlık değerlendirmesi yap.
    2. Obezite ve kalp krizi riskini değerlendir.
    3. Beslenme, egzersiz ve alışkanlık önerileri ver.
    """

    yanit = model.generate_content(prompt)
    return yanit.text
