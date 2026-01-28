import { useRef, useState } from "react";
import { Camera, Image as ImageIcon, Upload } from "lucide-react";

export default function UploadStep({ image, setImage, onNext }) {
  const galleryRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = media;
      setStream(media);
      setCameraOn(true);
    } catch {
      alert("Camera permission denied");
    }
  };

  const capture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    setImage(canvas.toDataURL("image/png"));
    stream.getTracks().forEach((t) => t.stop());
    setCameraOn(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
        <Upload size={20} /> Upload Photo for AI Analysis
      </h3>

      <p className="text-gray-500 mb-6">
        Our AI will automatically detect the issue type from your photo
      </p>

      <div className="border-2 border-dashed border-teal-300 rounded-xl p-8 text-center">
        {cameraOn && (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              className="mx-auto rounded-xl max-h-72 border"
            />
            <button
              onClick={capture}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium"
            >
              📸 Capture Photo
            </button>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        {!cameraOn && !image && (
          <>
            <Upload className="mx-auto mb-3 text-gray-400" size={36} />

            <p className="font-medium">Drop an image or click to upload</p>
            <p className="text-xs text-gray-500 mb-6">JPG, PNG up to 10MB</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={startCamera}
                className="px-5 py-2.5 rounded-xl border font-medium flex items-center gap-2
                  bg-gray-100 text-gray-700
                  hover:bg-orange-500 hover:text-white hover:border-orange-500 transition"
              >
                <Camera size={18} /> Take Photo
              </button>

              <button
                onClick={() => galleryRef.current.click()}
                className="px-5 py-2.5 rounded-xl border font-medium flex items-center gap-2
                  bg-gray-100 text-gray-700
                  hover:bg-orange-500 hover:text-white hover:border-orange-500 transition"
              >
                <ImageIcon size={18} /> Gallery
              </button>

              <input
                ref={galleryRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
              />
            </div>
          </>
        )}

        {image && (
          <div className="space-y-4">
            <img src={image} className="mx-auto max-h-64 rounded-xl border" />

            <div className="flex justify-between">
              <button
                onClick={() => setImage(null)}
                className="px-5 py-2.5 border rounded-xl font-medium
          hover:bg-gray-100 transition"
              >
                ← Retake
              </button>

              <button
                onClick={onNext}
                className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition"
              >
                Continue with AI Detection →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}