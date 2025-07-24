from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from gemini_api import generate_recommendation #gemini-api


app = Flask(__name__)
CORS(app)

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
@app.route('/api/oneriler', methods=['POST'])
def oneriler_al():
    veri = request.get_json()
    try:
        yanit = generate_recommendation(veri)
        return jsonify({"oneriler": yanit}), 200
    except Exception as e:
        return jsonify({"hata": str(e)}), 500


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
