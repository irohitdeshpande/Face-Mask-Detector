# Vercel Deployment Guide for Face Mask Detection Frontend

## Setup Instructions

1. **Connect GitHub Repository**
   - Go to https://vercel.com
   - Create account or login
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as the root directory

2. **Build Settings**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Environment Variables**
   Add these in Vercel dashboard:
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

4. **Domain Configuration**
   - After deployment, note your Vercel app URL
   - Update the backend's CORS_ORIGINS environment variable with this URL

## Important Notes

- Make sure to update dependencies before deployment: `npm install`
- The app will work with both image upload and live video (if available)
- All API calls will go to your Render backend
- Firebase configuration is now environment-based

## Features

- Image upload for mask detection
- Live video feed (local development)
- Firebase authentication
- Real-time detection results
- Responsive design with Ant Design

## After Deployment

1. Test the application at your Vercel URL
2. Verify image upload works with your backend
3. Check Firebase authentication
4. Update backend CORS settings if needed