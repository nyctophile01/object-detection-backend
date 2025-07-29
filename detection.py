from ultralytics import YOLO # type: ignore
import os
from PIL import Image # type: ignore
import uuid

model = YOLO("yolov8n.pt")

def detect_objects(image_file):
    # Generate a unique filename and save the image
    image_id = str(uuid.uuid4())
    image_path = f"temp_{image_id}.jpg"
    image = Image.open(image_file)
    image.save(image_path)

    # Run YOLO detection
    results = model(image_path)
    
    # Save output image
    output_path = f"result_{image_id}.jpg"
    results[0].save(filename=output_path)

    # Clean up original uploaded image
    os.remove(image_path)
    
    return output_path
