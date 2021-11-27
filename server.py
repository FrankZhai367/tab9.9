from flask import Flask, request
from flask_cors import CORS
from lstm import predict

app = Flask(__name__)
CORS(app)

@app.route("/api/predict")
def predict_route():
	text = request.args.get('text', '')
	next_word = predict(text)
	print(text, next_word)
	return next_word