from flask import Flask, render_template, jsonify, url_for, redirect, session
import requests
import json

app = Flask(__name__)
app.secret_key = 'super_secret_string'
API_KEY = 'O0GrIgl5gKwiP9qz0xb09fuvjsASDzDSuHPqdH2fBD71WLNeTD'

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/search/<query>')
def search(query):
    url = 'https://api.tumblr.com/v2/tagged?tag=' + query + '&api_key=' + API_KEY + '&limit=10&filter=text'
    response = requests.get(url)
    return jsonify(response.json())

@app.route('/blog')
def returntoindex():
    return redirect(url_for('index'))

@app.route('/blog/<blogname>')
def blog(blogname):
    url = 'https://api.tumblr.com/v2/blog/' + blogname + '/info?api_key=' + API_KEY
    response = requests.get(url)
    return render_template('blog.html', response = response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0')
