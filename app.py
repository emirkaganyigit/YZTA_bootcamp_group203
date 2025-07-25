from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from health_analysis import HealthAnalyzer

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "API çalışıyor. POST /api/analiz endpointini kullanın."})

def init_db():
    conn = sqlite3.connect('veritabani.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS kullanici (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            yas INTEGER,
            cinsiyet TEXT,
            boy INTEGER,
            kilo INTEGER,
            ailede_kilo TEXT,
            kalorili_yiyecek TEXT,
            sebze TEXT,
            ogun TEXT,
            ara_ogun TEXT,
            sigara TEXT,
            su TEXT,
            aktivite TEXT,
            alkol TEXT,
            teknoloji TEXT,
            ulasim TEXT
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/api/kullanici', methods=['POST'])
def kullanici_ekle():
    veri = request.get_json()

    conn = sqlite3.connect('veritabani.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO kullanici (
            yas, cinsiyet, boy, kilo, ailede_kilo, kalorili_yiyecek, sebze,
            ogun, ara_ogun, sigara, su, aktivite, alkol, teknoloji, ulasim
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        veri['yas'], veri['cinsiyet'], veri['boy'], veri['kilo'],
        veri['ailede_kilo'], veri['kalorili_yiyecek'], veri['sebze'],
        veri['ogun'], veri['ara_ogun'], veri['sigara'], veri['su'],
        veri['aktivite'], veri['alkol'], veri['teknoloji'], veri['ulasim']
    ))
    conn.commit()
    conn.close()

    return jsonify({"mesaj": "Veri başarıyla kaydedildi!"}), 201


@app.route('/api/analiz', methods=['POST'])
def saglik_analizi():
    try:

        data = request.get_json()
        print("Backend'e gelen veri:", data)  # Debug log

        user_data = {
            "age": int(data.get("age")) if data.get("age") else None,
            "gender": data.get("gender"),
            "height_cm": int(data.get("height_cm")) if data.get("height_cm") else None,
            "weight_kg": int(data.get("weight_kg")) if data.get("weight_kg") else None,
            "family_history": data.get("family_history"),
            "high_caloric_food": data.get("high_caloric_food"),
            "vegetable_consumption": data.get("vegetable_consumption"),
            "meals_per_day": int(data.get("meals_per_day")) if data.get("meals_per_day") else None,
            "snacks": data.get("snacks"),
            "smoke": data.get("smoke"),
            "water_intake": data.get("water_intake"),
            "physical_activity": data.get("physical_activity"),
            "alcohol": data.get("alcohol"),
            "tech_use": data.get("tech_use"),
            "transportation": data.get("transportation"),
        }

        print("HealthAnalyzer'a gönderilen user_data:", user_data)

        analyzer = HealthAnalyzer()
        result = analyzer.get_health_analysis(user_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    init_db()
    app.run(debug=True)