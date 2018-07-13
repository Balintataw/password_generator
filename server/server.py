from flask import Flask, render_template, jsonify
from flask_cors import CORS
from xkcdpass import xkcd_password as xp

app = Flask(__name__, static_folder="../client/public", template_folder="../client/src")
CORS(app)

@app.route('/')
def home():
    return render_template('/public/index.html')

@app.route('/get_password')
def get_password():
    # create a wordlist from the default wordfile
    # use words between 5 and 8 letters long
    wordfile = xp.locate_wordfile()
    mywords = xp.generate_wordlist(wordfile=wordfile, min_length=5, max_length=8, valid_chars='.')

    # create a password with the acrostic "face"
    print(xp.generate_xkcdpassword(mywords, acrostic="facet"))
    return xp.generate_xkcdpassword(mywords, acrostic="facet")

if __name__ == '__main__':
    app.run(debug=True)
    # app.run("0.0.0.0", 5000)


