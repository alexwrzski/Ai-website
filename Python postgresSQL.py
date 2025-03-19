from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/mydatabase'
db = SQLAlchemy(app)

@app.route('/')
def hello():
    return "Connected to PostgreSQL"

if __name__ == '__main__':
    app.run(debug=True)