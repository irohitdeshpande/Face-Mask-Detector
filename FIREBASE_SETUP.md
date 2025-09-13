# Firebase Setup Guide for Face Mask Detection App

## Step-by-Step Firebase Project Setup

### 1. Create Firebase Project

1. **Go to Firebase Console**
   - Visit https://console.firebase.google.com
   - Click "Create a project" or "Add project"

2. **Project Configuration**
   - **Project name**: `face-mask-detector` (or your preferred name)
   - **Enable Google Analytics**: Yes (recommended)
   - **Analytics account**: Create new or use existing
   - Click "Create project"

### 2. Configure Authentication

1. **Enable Authentication**
   - In Firebase console, go to "Authentication"
   - Click "Get started"
   - Go to "Sign-in method" tab

2. **Enable Sign-in Methods**
   - **Email/Password**: Enable this
   - **Google**: Enable if you want Google sign-in
   - **Anonymous**: Enable for guest access (optional)

3. **Configure Authorized Domains**
   - Add your Vercel domain: `your-app.vercel.app`
   - Add localhost for development: `localhost`

### 3. Setup Firestore Database

1. **Create Firestore Database**
   - Go to "Firestore Database"
   - Click "Create database"
   - **Security rules**: Start in test mode (for development)
   - **Location**: Choose closest to your users

2. **Create Collections & Documents**

   **Collection: `detectionEvents`**
   ```javascript
   // Sample document structure
   {
     userId: "user123",
     timestamp: Timestamp.now(),
     detectionResult: "Mask", // or "No Mask"
     confidence: 95.5,
     source: "upload", // "upload", "camera", "api"
     imageUrl: "https://storage.url/image.jpg", // optional
     location: {
       latitude: 40.7128,
       longitude: -74.0060
     }
   }
   ```

   **Collection: `users`**
   ```javascript
   // Sample document structure
   {
     email: "user@example.com",
     name: "John Doe",
     role: "user", // "admin" or "user"
     createdAt: Timestamp.now(),
     lastLogin: Timestamp.now()
   }
   ```

   **Collection: `maskViolations`**
   ```javascript
   // Sample document structure
   {
     userId: "user123",
     timestamp: Timestamp.now(),
     confidence: 87.3,
     imageUrl: "https://storage.url/violation.jpg",
     resolved: false,
     location: {
       latitude: 40.7128,
       longitude: -74.0060
     }
   }
   ```

### 4. Configure Security Rules

Replace the default Firestore rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own detection events
    match /detectionEvents/{eventId} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
    }
    
    // Admin can read all violations, users can read their own
    match /maskViolations/{violationId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow create: if request.auth != null;
    }
  }
}
```

### 5. Setup Storage (Optional)

1. **Create Storage Bucket**
   - Go to "Storage"
   - Click "Get started"
   - **Security rules**: Start in test mode
   - **Location**: Same as Firestore

2. **Configure Storage Rules**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /detection-images/{userId}/{imageId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == userId || 
         // Check if user is admin in Firestore
         exists(/databases/(default)/documents/users/$(request.auth.uid)) &&
         get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

### 6. Get Configuration Keys

1. **Web App Configuration**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Click "Add app" → Web app
   - **App nickname**: `face-mask-detector-web`
   - **Register app**

2. **Copy Configuration**
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id",
     measurementId: "your-measurement-id"
   };
   ```

### 7. Environment Variables Setup

**Frontend (.env.local)**
```bash
REACT_APP_API_URL=https://your-render-app.onrender.com
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 8. Database Indexes (For Performance)

Create these indexes in Firestore:

1. **detectionEvents Collection**
   - Fields: `userId` (Ascending), `timestamp` (Descending)
   - Fields: `timestamp` (Descending)

2. **maskViolations Collection**
   - Fields: `resolved` (Ascending), `timestamp` (Descending)
   - Fields: `userId` (Ascending), `timestamp` (Descending)

### 9. Real-time Features Setup

The app includes real-time listeners for:
- **Recent detection events** (last 50)
- **Unresolved mask violations**
- **User-specific detection history**

### 10. Testing Your Setup

1. **Authentication Test**
   - Create a test user in Authentication tab
   - Try logging in from your app

2. **Database Test**
   - Upload an image for detection
   - Check if detection event appears in Firestore
   - Verify mask violations are recorded

3. **Real-time Test**
   - Open app in multiple tabs
   - Perform detection in one tab
   - Verify real-time updates in other tabs

## Schema Benefits

- **Real-time detection tracking**
- **User management and roles**
- **Mask violation monitoring**
- **Historical data analysis**
- **Location-based insights**
- **Admin dashboard capabilities**

## Next Steps

1. Deploy your backend to Render
2. Deploy your frontend to Vercel
3. Update environment variables with Firebase config
4. Test the complete flow
5. Consider adding more features like:
   - Email notifications for violations
   - Dashboard for admins
   - Analytics and reporting
   - Mobile app integration