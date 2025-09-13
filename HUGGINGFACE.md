# Deploying Face Mask Detector Backend to Hugging Face Spaces (Docker)

This guide explains how to deploy the Flask + TensorFlow backend on **Hugging Face Spaces** using the provided `Dockerfile`.

---
## 1. Prerequisites
- Hugging Face account: https://huggingface.co/join
- Your repository pushed to GitHub (or you can upload manually)
- Backend code lives in `facemask_detection/`

---
## 2. Space Creation
1. Go to https://huggingface.co/spaces
2. Click **Create new Space**
3. **Name**: `face-mask-detector-backend` (or your choice)
4. **SDK**: Select `Docker`
5. **Visibility**: `Public` (free) or `Private` (requires paid plan)
6. Create Space.

---
## 3. Add Files
If you connected GitHub, just make sure the repo root contains:
- `Dockerfile`
- `.dockerignore`
- `facemask_detection/` directory (with `app.py`, models, face detector, etc.)
- `HUGGINGFACE.md` (optional doc)

If uploading manually: drag & drop the above.

---
## 4. Build & Runtime
The Space will:
- Build the Docker image from `Dockerfile`
- Install dependencies from `facemask_detection/requirements.txt`
- Launch with `gunicorn app:app`
- Expose the API at: `https://<your-username>-<space-name>.hf.space`

Default port is provided by Hugging Face in `$PORT`. We map it via `gunicorn`.

---
## 5. API Endpoints
| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/health` | Health/status JSON |
| POST | `/detect_base64` | Send JSON `{ "image": "data:image/jpeg;base64,..." }` |
| GET | `/video_feed` | MJPEG stream (may not function in headless container if no camera) |

### Example `detect_base64` Request
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"image": "data:image/png;base64,...."}' \
  https://<space-url>/detect_base64
```

---
## 6. Frontend Integration
Set your frontend environment variable (e.g. `REACT_APP_API_URL`) to the Space base URL. Then call:
```
POST ${REACT_APP_API_URL}/detect_base64
```
Body example:
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
}
```

---
## 7. Performance Tips
- First request will be slower due to TensorFlow model load.
- Consider converting the Keras model to TFLite to reduce cold start.
- Remove `matplotlib` from `requirements.txt` if not used at runtime (saves space).
- Use smaller base image (`python:3.11-slim`) already applied.

---
## 8. Updating
Push changes to main (if GitHub linked) or re‑upload modified files. The Space rebuilds automatically.

---
## 9. Troubleshooting
| Issue | Cause | Fix |
| ----- | ----- | --- |
| Build OOM | Image too large | Remove unused deps, dataset, notebooks (already excluded) |
| 502 on first call | Cold start | Wait 30–60s after build completes |
| TensorFlow import slow | Heavy libs | Optimize model / tflite runtime |
| `video_feed` blank | No camera in container | Use `detect_base64` API instead |

---
## 10. Next Steps
- Optimize model size
- Add simple auth/rate limiting if public
- Add logging/monitoring via custom endpoint

Enjoy your deployed API! 🎉
