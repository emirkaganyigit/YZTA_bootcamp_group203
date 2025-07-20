import os
from dotenv import load_dotenv
import google.generativeai as genai

# .env dosyasından API anahtarını yükle
load_dotenv()
API_KEY = os.getenv("API_KEY")

if not API_KEY:
    raise ValueError("API anahtarı bulunamadı. .env dosyasını kontrol edin.")

# Google Generative AI yapılandırması
genai.configure(api_key=API_KEY)

# Gemini modelini dışa aktar
model = genai.GenerativeModel("gemini-1.5-flash")