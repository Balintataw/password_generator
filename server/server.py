from flask import Flask, render_template, jsonify, json, request
from flask_cors import CORS
from xkcdpass import xkcd_password as xp

app = Flask(__name__, static_folder="../client/public", template_folder="../client/src")
CORS(app)
ACROSTIC = 'face'
@app.route('/')
def home():
    return render_template('/public/index.html')

@app.route('/get_password', methods=["POST"])
def get_password():
    acrostic_term = request.json['text']
    min_length = int(request.json['min_length'])
    max_length = int(request.json['max_length'])
    print('term',acrostic_term)
    # create a wordlist from the default wordfile
    # use words between 5 and 8 letters long
    wordfile = xp.locate_wordfile()
    mywords = xp.generate_wordlist(wordfile=wordfile, min_length=min_length, max_length=max_length, valid_chars='.')

    # create a password with the acrostic "face"
    print(xp.generate_xkcdpassword(mywords, acrostic=acrostic_term))
    return xp.generate_xkcdpassword(mywords, acrostic=acrostic_term)

if __name__ == '__main__':
    app.run(debug=True)
    # app.run("0.0.0.0", 5000)


