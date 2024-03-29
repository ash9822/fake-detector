from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__, static_url_path='/static')

# Replace 'YOUR_VIRUSTOTAL_API_KEY' with your actual VirusTotal API key
API_KEY = 'adde1f1fc8d8369ce5e5b65e5711537d0219a6ff4d53d2db4f8fd00ef3c8a1c9'
VIRUSTOTAL_API_URL = 'https://www.virustotal.com/vtapi/v2/url/report'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/check_url', methods=['POST'])
def check_url():
    url = request.form.get('url')

    params = {'apikey': API_KEY, 'resource': url}
    response = requests.get(VIRUSTOTAL_API_URL, params=params)
    result = response.json()

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
