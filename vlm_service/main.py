from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch
import io

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- LOAD CV MODEL ----------------
model_name = "openai/clip-vit-large-patch14"
processor = CLIPProcessor.from_pretrained(model_name)
model = CLIPModel.from_pretrained(model_name)

device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device).eval()

# ---------------- ISSUE DEFINITIONS ----------------
ISSUES = [
    {
        "label": "Pothole / Road Damage",
        "prompt": "a photo of a pothole or damaged road surface"
    },
    {
        "label": "Garbage Dump",
        "prompt": "a photo of garbage dumped on the street"
    },
    {
        "label": "Water Logging",
        "prompt": "a photo of water logged or flooded road"
    },
    {
        "label": "Broken Streetlight",
        "prompt": "a photo of a broken or non-working street light at night"
    },
    {
        "label": "Road Crack",
        "prompt": "a photo of visible cracks on the road"
    }
]

# ---------------- HELPERS ----------------
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return img.resize((224, 224))


def generate_ai_description(issue, confidence):
    """
    Generates human-like AI descriptions based on issue type + severity
    """

    # Severity estimation from CV confidence
    if confidence >= 0.8:
        severity = "high"
    elif confidence >= 0.6:
        severity = "medium"
    else:
        severity = "low"

    if issue == "Garbage Dump":
        if severity == "high":
            return (
                "AI detected a large accumulation of garbage on the street. "
                "The waste appears to be unmanaged and may lead to bad odors, "
                "spread of disease, and serious health concerns for nearby residents."
            )
        elif severity == "medium":
            return (
                "AI detected a noticeable amount of garbage dumped along the road. "
                "This could attract pests and degrade sanitation if not cleared promptly."
            )
        else:
            return (
                "AI detected a small amount of garbage on the roadside. "
                "While not critical, it may affect cleanliness and should be addressed."
            )

    if issue == "Broken Streetlight":
        if severity == "high":
            return (
                "AI detected a non-functional streetlight in a dark area. "
                "This significantly reduces visibility at night and increases the risk "
                "of accidents and unsafe conditions for pedestrians."
            )
        elif severity == "medium":
            return (
                "AI detected a malfunctioning streetlight. "
                "Reduced illumination may affect nighttime visibility on this road."
            )
        else:
            return (
                "AI detected a streetlight with reduced or inconsistent lighting. "
                "This may cause minor visibility issues after sunset."
            )

    if issue == "Pothole / Road Damage":
        if severity == "high":
            return (
                "AI detected a large pothole on the road. "
                "The damage appears severe and poses a high risk to vehicles, "
                "especially two-wheelers and cars at normal driving speeds."
            )
        elif severity == "medium":
            return (
                "AI detected a medium-sized pothole on the roadway. "
                "This could cause discomfort or minor damage to vehicles if ignored."
            )
        else:
            return (
                "AI detected minor road surface damage. "
                "While currently small, it may worsen over time if not repaired."
            )

    if issue == "Water Logging":
        if severity == "high":
            return (
                "AI detected extensive water logging on the road. "
                "The flooded surface may reduce tire grip, cause traffic congestion, "
                "and increase the risk of accidents."
            )
        elif severity == "medium":
            return (
                "AI detected water accumulation on the road. "
                "This may slow traffic and create unsafe driving conditions."
            )
        else:
            return (
                "AI detected a small amount of standing water on the road. "
                "This may cause minor inconvenience to commuters."
            )

    if issue == "Road Crack":
        if severity == "high":
            return (
                "AI detected deep and widespread cracks on the road surface. "
                "These cracks indicate structural damage and may worsen rapidly."
            )
        elif severity == "medium":
            return (
                "AI detected visible cracks on the road. "
                "Timely maintenance is recommended to prevent further deterioration."
            )
        else:
            return (
                "AI detected minor cracks on the road surface. "
                "These are early signs of wear and should be monitored."
            )

    return "AI detected a civic issue in the uploaded image."


# ---------------- API ----------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = preprocess_image(image_bytes)

    prompts = [i["prompt"] for i in ISSUES]

    inputs = processor(
        text=prompts,
        images=image,
        return_tensors="pt",
        padding=True
    ).to(device)

    with torch.no_grad():
        outputs = model(**inputs)
        probs = outputs.logits_per_image.softmax(dim=1)[0]

    idx = int(torch.argmax(probs))
    confidence = float(probs[idx])

    issue = ISSUES[idx]["label"]
    description = generate_ai_description(issue, confidence)

    return {
        "issue_type": issue,
        "title": f"{issue} detected",
        "description": description,
        "confidence": round(confidence * 100, 2)
    }


@app.get("/")
def health():
    return {"status": "AI CV service running"}