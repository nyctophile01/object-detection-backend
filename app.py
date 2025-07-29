from flask import Flask, render_template, request, send_file
from detection import detect_objects
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/detect', methods=['POST'])
def detect():
    if 'image' not in request.files:
        return 'No image uploaded', 400
    image = request.files['image']
    if image.filename == '':
        return 'No selected image', 400

    output_path = detect_objects(image)
    return send_file(output_path, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)
