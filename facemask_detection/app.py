from flask import Flask, Response, jsonify, request, redirect
from flask_cors import CORS
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os
import base64
from PIL import Image
import io
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# Place the root route after app is defined
@app.route("/")
def index():
    # For headless/container hosting, return a simple JSON instead of redirecting to video feed
    return jsonify({"service": "face-mask-detector", "status": "ok", "routes": ["/health", "/detect_base64", "/video_feed"]})

# Load face detector model
prototxtPath = os.path.join(os.path.dirname(__file__), "face_detector/deploy.prototxt")
weightsPath = os.path.join(os.path.dirname(__file__), "face_detector/res10_300x300_ssd_iter_140000.caffemodel")
net = cv2.dnn.readNet(prototxtPath, weightsPath)

# Load face mask detector model
model_path = os.path.join(os.path.dirname(__file__), "model.keras")
model = load_model(model_path)

def detect_mask(frame):
    (h, w) = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300), (104.0, 177.0, 123.0))
    net.setInput(blob)
    detections = net.forward()

    results = []
    mask_detected = False

    for i in range(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.5:
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")

            face = frame[startY:endY, startX:endX]
            if face.size == 0:
                continue

            face_rgb = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
            face_resized = cv2.resize(face_rgb, (224, 224))
            face_array = img_to_array(face_resized)
            face_array = preprocess_input(face_array)
            face_array = np.expand_dims(face_array, axis=0)

            (mask, withoutMask) = model.predict(face_array)[0]
            label = "Mask" if mask > withoutMask else "No Mask"
            prediction_confidence = max(mask, withoutMask) * 100
            color = (0, 255, 0) if label == "Mask" else (0, 0, 255)
            label_text = f"{label}: {prediction_confidence:.2f}%"

            cv2.putText(frame, label_text, (startX, startY - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
            cv2.rectangle(frame, (startX, startY), (endX, endY), color, 2)

            results.append({
                "label": label,
                "confidence": prediction_confidence,
                "bbox": [int(startX), int(startY), int(endX), int(endY)]
            })

            if label == "No Mask":
                mask_detected = True

    return frame, results, mask_detected


# API endpoint for base64 image detection
@app.route('/detect_base64', methods=['POST'])
def detect_base64():
    try:
        data = request.get_json()
        if 'image' not in data:
            return jsonify({"error": "No image data provided"}), 400
        image_data = data['image']
        if image_data.startswith('data:image'):
            image_data = image_data.split(',')[1]
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        image_array = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        _, results, mask_detected = detect_mask(image_array)
        return jsonify({
            "detections": results,
            "mask_violation": mask_detected,
            "timestamp": datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Real-time video feed for local development
def generate_frames():
    camera = cv2.VideoCapture(0)
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            frame, _, _ = detect_mask(frame)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/health')
def health():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
