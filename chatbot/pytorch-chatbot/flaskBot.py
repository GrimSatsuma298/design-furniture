from flask import Flask
from flask.json import jsonify
from chat import botAnswer
from flask import request

from nltk.sem.evaluate import Undefined
app = Flask(__name__)
@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*" # <- You can change "*" for a domain for example "http://localhost"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    return response
@app.route('/bot/response', methods=['POST'])
def chatBot():
    print("MESSAGE RECEVIED")
    message = request.form['message']
    if message:
        answer = botAnswer(message)
        return jsonify({'answer': answer})
    return jsonify({'answer': 'Error con mensaje'})

if __name__ == "__main__":
    app.run(port=3002, debug=True)