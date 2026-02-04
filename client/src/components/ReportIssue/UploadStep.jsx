import { useRef, useState } from "react";
import { Camera, Image as ImageIcon, Upload } from "lucide-react";

export default function UploadStep({ image, setImage, setForm, onNext }) {
  const galleryRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------- CAMERA ----------
  const startCamera = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = media;
      setStream(media);
      setCameraOn(true);
    } catch (err) {
      alert("Camera permission denied. Please use gallery upload.");
    }
  };

  const capture = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );

    const file = new File([blob], "camera.png", { type: "image/png" });

    setImage({
      file,
      preview: URL.createObjectURL(blob),
    });

    stream?.getTracks().forEach((t) => t.stop());
    setCameraOn(false);
  };

  // ---------- AI CALL ----------
  const callAI = async () => {
    if (!image?.file) {
      alert("Please upload or capture an image first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image.file);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("AI DATA:", data);

      setForm((prev) => ({
        ...prev,
        category: data.issue_type,
        title: data.title,
        description: data.description,
      }));

      onNext();
    } catch (err) {
      console.error("AI ERROR:", err);
      alert("AI analysis failed. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
        <Upload size={20} /> Upload Photo for AI Analysis
      </h3>

      <p className="text-gray-500 mb-6">
        Our AI will automatically detect the issue type
      </p>

      <div className="border-2 border-dashed border-teal-300 rounded-xl p-8 text-center">

        {/* CAMERA VIEW */}
        {cameraOn && (
          <>
            <video
              ref={videoRef}
              autoPlay
              className="mx-auto rounded-xl max-h-72 border"
            />
            <button
              onClick={capture}
              className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-xl"
            >
              📸 Capture
            </button>
            <canvas ref={canvasRef} hidden />
          </>
        )}

        {/* INITIAL STATE */}
        {!cameraOn && !image?.preview && (
          <>
            <Upload className="mx-auto mb-3 text-gray-400" size={36} />
            <p className="font-medium">Drop image or upload</p>
            <p className="text-xs text-gray-500 mb-6">JPG, PNG up to 10MB</p>
            <div className="flex justify-center gap-4 mt-6">
              <button onClick={startCamera} className="btn">
                <Camera size={18} /> Take Photo
              </button>

              <button
                onClick={() => galleryRef.current.click()}
                className="btn"
              >
                <ImageIcon size={18} /> Gallery
              </button>

              <input
                ref={galleryRef}
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setImage({
                    file,
                    preview: URL.createObjectURL(file),
                  });
                }}
              />
            </div>
          </>
        )}

        {/* PREVIEW */}
        {image?.preview && (
          <>
            <img
              src={image.preview}
              className="mx-auto max-h-64 rounded-xl border"
            />

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setImage({ file: null, preview: null })}
              >
                ← Retake
              </button>

              <button
                onClick={callAI}
                disabled={loading}
                className="bg-teal-600 text-white px-6 py-3 rounded-xl"
              >
                {loading ? "Analyzing..." : "Continue →"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}