# Face Mask Detection App - Cloud Deployment Guide

## 🚀 Overview

This project has been updated for cloud deployment with modern dependencies and Firebase integration. The application consists of:

- **Backend**: Flask API with TensorFlow mask detection (Deploy to Render)
- **Frontend**: React TypeScript app with Firebase auth & real-time data (Deploy to Vercel)
- **Database**: Firebase Firestore for real-time detection tracking

## 📋 Pre-Deployment Checklist

### Backend Changes Made:
- ✅ Removed Windows-specific dependencies (`winsound`, `pydub`)
- ✅ Added CORS support for cross-origin requests
- ✅ Modified camera access to work on cloud platforms
- ✅ Added environment variable support
- ✅ Created image upload API endpoints
- ✅ Updated for production deployment

### Frontend Changes Made:
- ✅ Updated React Router from v5 to v6
- ✅ Updated Ant Design from v4 to v5
- ✅ Updated TypeScript to v5
- ✅ Added environment variable configuration
- ✅ Moved Firebase config to environment variables
- ✅ Added real-time Firebase integration
- ✅ Created Vercel deployment configuration

## 🛠️ Local Development Setup

### Backend Setup
```bash
cd facemask_detection
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env with your values

python app.py
```

### Frontend Setup
```bash
cd frontend
npm install

# Copy environment file
cp .env.local.example .env.local
# Edit .env.local with your values

npm start
```

## ☁️ Cloud Deployment

### Step 1: Setup Firebase
Follow the detailed guide in `FIREBASE_SETUP.md`:

1. Create Firebase project
2. Enable Authentication (Email/Password)
3. Setup Firestore database
4. Configure security rules
5. Get configuration keys

### Step 2: Deploy Backend to Render

1. **Go to Render.com**
   - Create account and connect GitHub
   - Click "New" → "Web Service"
   - Select your repository
   - Root Directory: `facemask_detection`

2. **Configure Service**
   ```
   Name: face-mask-detector-api
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn app:app
   ```

3. **Set Environment Variables**
   ```
   PORT=5000
   FLASK_ENV=production
   CORS_ORIGINS=https://your-vercel-app.vercel.app
   ```

4. **Deploy & Test**
   - Wait for deployment
   - Test health endpoint: `https://your-app.onrender.com/health`

### Step 3: Deploy Frontend to Vercel

1. **Go to Vercel.com**
   - Create account and connect GitHub
   - Click "New Project"
   - Select your repository
   - Root Directory: `frontend`

2. **Configure Build**
   ```
   Framework: Create React App
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

3. **Set Environment Variables**
   ```
   REACT_APP_API_URL=https://your-render-app.onrender.com
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. **Deploy & Test**
   - Wait for deployment
   - Test your Vercel app

### Step 4: Update CORS Settings

1. In Render dashboard, update backend environment variable:
   ```
   CORS_ORIGINS=https://your-actual-vercel-url.vercel.app
   ```

2. Redeploy backend service

## 🔧 API Endpoints

### Backend (Render)
- `GET /health` - Health check
- `POST /detect_image` - Upload image for detection
- `POST /detect_base64` - Send base64 image for detection  
- `GET /video_feed` - Live video feed (if camera available)

### Frontend Features
- Image upload for mask detection
- Real-time detection history
- Firebase authentication
- Mask violation tracking
- Admin dashboard (if user role is admin)

## 📊 Firebase Schema

### Collections Created:

1. **detectionEvents**
   - Stores all mask detection results
   - Real-time updates
   - User-specific filtering

2. **users**
   - User profiles and roles
   - Authentication management

3. **maskViolations**
   - Tracks violations for monitoring
   - Admin resolution tracking

## 🔍 Testing Deployment

1. **Test Backend Health**
   ```bash
   curl https://your-render-app.onrender.com/health
   ```

2. **Test Image Detection**
   ```bash
   curl -X POST -F "image=@test-image.jpg" https://your-render-app.onrender.com/detect_image
   ```

3. **Test Frontend**
   - Visit your Vercel URL
   - Try uploading an image
   - Check Firebase console for data
   - Verify real-time updates

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Verify CORS_ORIGINS in backend environment
   - Check Vercel URL is correct

2. **Firebase Errors**
   - Verify all environment variables are set
   - Check Firebase security rules
   - Ensure project ID matches

3. **Model Loading Issues**
   - Ensure model files are in repository
   - Check file paths in app.py

4. **Build Failures**
   - Check package.json for compatible versions
   - Verify Node.js version compatibility

### Debug Commands:
```bash
# Check backend logs in Render dashboard
# Check frontend build logs in Vercel dashboard
# Check Firebase console for data flow
```

## 🎯 Next Steps

After successful deployment:

1. **Monitor Performance**
   - Check detection accuracy
   - Monitor response times
   - Review Firebase usage

2. **Add Features**
   - Email notifications for violations
   - Admin dashboard improvements
   - Mobile app integration
   - Analytics and reporting

3. **Scale Considerations**
   - Upgrade Render plan for production
   - Optimize Firebase rules
   - Add caching for better performance

## 📞 Support

- Backend deployment guide: `facemask_detection/DEPLOYMENT.md`
- Frontend deployment guide: `frontend/DEPLOYMENT.md`
- Firebase setup: `FIREBASE_SETUP.md`

## 🔐 Security Notes

- Environment variables contain sensitive data
- Firebase security rules are configured for production
- CORS is properly configured for your domains
- Authentication is required for data writes

Your Face Mask Detection app is now ready for production deployment! 🎉