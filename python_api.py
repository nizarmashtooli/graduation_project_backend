import flask
import json
from flask import request
from google_trans_new import google_translator

translator = google_translator()
app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['POST'])
def translate():
    tweet = request.args.get('tweet')
    
    tweet =translator.translate(tweet)
    print(tweet);
    return json.dumps({"translation" : tweet})


app.run(port=8000)