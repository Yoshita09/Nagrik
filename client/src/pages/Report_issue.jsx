import { useRef, useState } from "react";
import { Camera, Image as ImageIcon, Upload } from "lucide-react";

export default function ReportIssue() {
  const galleryInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);

  /* ---------- GALLERY UPLOAD ---------- */
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  /* ---------- START CAMERA ---------- */
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setCameraOn(true);
    } catch (err) {
      alert("Camera access denied");
    }
  };

  /* ---------- CAPTURE PHOTO ---------- */
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");
    setPreview(imageData);

    stream.getTracks().forEach((track) => track.stop());
    setCameraOn(false);
  };

  /* ---------- RETAKE ---------- */
  const retakePhoto = () => {
    setPreview(null);
    startCamera();
  };

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Report an Issue</h1>
          <p className="text-gray-500">
            Upload a photo for AI detection or describe the issue manually
          </p>
        </div>

        {/* STEPS */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <Step num={1} active text="Upload" />
          <Line />
          <Step num={2} text="Details" />
          <Line />
          <Step num={3} text="Review" />
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
            <Upload size={20} /> Upload Photo for AI Analysis
          </h3>
          <p className="text-gray-500 mb-6">
            Our AI will automatically detect the issue type from your photo
          </p>

          {/* UPLOAD AREA */}
          <div className="border-2 border-dashed border-teal-300 rounded-xl p-8 text-center">

            {/* CAMERA LIVE VIEW */}
            {cameraOn && (
              <div className="space-y-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="mx-auto rounded-xl max-h-72 border"
                />

                <button
                  onClick={capturePhoto}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium"
                >
                  📸 Capture Photo
                </button>

                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}

            {/* NO IMAGE */}
            {!preview && !cameraOn && (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <Upload size={28} className="text-gray-500" />
                  </div>
                </div>

                <p className="font-medium mb-1">
                  Drop an image or click to upload
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  JPG, PNG up to 10MB
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={startCamera}
                    className="px-5 py-2.5 rounded-xl border font-medium flex items-center gap-2
                      bg-gray-100 text-gray-700
                      hover:bg-orange-500 hover:text-white hover:border-orange-500
                      transition-all"
                  >
                    <Camera size={18} /> Take Photo
                  </button>

                  <button
                    onClick={() => galleryInputRef.current.click()}
                    className="px-5 py-2.5 rounded-xl border font-medium flex items-center gap-2
                      bg-gray-100 text-gray-700
                      hover:bg-orange-500 hover:text-white hover:border-orange-500
                      transition-all"
                  >
                    <ImageIcon size={18} /> Gallery
                  </button>
                </div>

                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />
              </>
            )}

            {/* PREVIEW */}
            {preview && (
              <div className="space-y-4">
                <img
                  src={preview}
                  alt="preview"
                  className="mx-auto max-h-64 rounded-xl border"
                />

                <div className="flex justify-center gap-4">
                  <button
                    onClick={retakePhoto}
                    className="px-5 py-2.5 rounded-xl border font-medium
                      hover:bg-orange-500 hover:text-white hover:border-orange-500 transition"
                  >
                    Retake
                  </button>

                  <button
                    className="px-5 py-2.5 rounded-xl bg-teal-600 text-white font-medium
                      hover:bg-teal-700 transition"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SKIP */}
          <p className="text-center mt-6 text-gray-500 hover:underline cursor-pointer">
            Skip and describe manually →
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Step({ num, text, active }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold
          ${active ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-500"}`}
      >
        {num}
      </div>
      <span className={`font-medium ${active ? "text-black" : "text-gray-500"}`}>
        {text}
      </span>
    </div>
  );
}

function Line() {
  return <div className="w-12 h-[2px] bg-gray-300" />;
}
