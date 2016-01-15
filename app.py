from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Welcome to ScatDat! Your number 1 solution to your number 2 problem!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
