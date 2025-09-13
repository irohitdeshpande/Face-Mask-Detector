# Render.com Deployment Guide for Face Mask Detection Backend

## Setup Instructions

1. **Connect GitHub Repository**
   - Go to https://render.com
   - Create a new account or login
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `facemask_detection` folder as the root directory

2. **Configuration**
   - **Name**: face-mask-detector-api
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Auto-Deploy**: Yes

3. **Environment Variables**
   Add these in Render dashboard:
   ```
   PORT=5000
   FLASK_ENV=production
   CORS_ORIGINS=https://your-vercel-app.vercel.app
   ```

4. **Advanced Settings**
   - Health Check Path: `/health`
   - Auto-Deploy: Yes
   - Instance Type: Free (for testing) or Starter

## Important Notes

- The app will automatically detect if camera is available
- If no camera, it shows a placeholder and still works with API endpoints
- Model files are included in the repository
- CORS is configured to allow frontend requests

## API Endpoints

- `GET /health` - Health check
- `POST /detect_image` - Upload image for detection
- `POST /detect_base64` - Send base64 image for detection
- `GET /video_feed` - Live video feed (if camera available)

## After Deployment

1. Test the health endpoint: `https://your-app.onrender.com/health`
2. Update the frontend environment variable `REACT_APP_API_URL` to your Render URL
3. Test image upload functionality