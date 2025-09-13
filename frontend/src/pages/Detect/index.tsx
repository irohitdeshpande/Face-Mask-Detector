import React, { useRef } from 'react';
import { message, Card } from 'antd';
import Container from '../../common/Container';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function DetectPage() {
  const videoRef = useRef<HTMLImageElement>(null);

  return (
    <Container>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

        <Card title="Face Mask Detection" style={{ marginBottom: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h3>Real Time Mask Detector</h3>
            <img 
              ref={videoRef}
              src={`${API_URL}/video_feed`} 
              alt="Video Feed" 
              style={{ width: '100%', maxWidth: '900px', height: 'auto', display: 'block', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              onError={() => {
                message.info('Camera not available on this platform');
              }}
            />
          </div>
        </Card>
      </div>
    </Container>
  );
}

export default DetectPage;
