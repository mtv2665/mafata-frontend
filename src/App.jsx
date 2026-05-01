import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import UploadZone from './components/UploadZone';
import ProcessingAnimation from './components/ProcessingAnimation';
import ResultModal from './components/ResultModal';
import Footer from './components/Footer';
import { getRandomRoast } from './data';

// App states: 'idle' | 'processing' | 'result'
export default function App() {
  const [appState, setAppState] = useState('idle');
  const [imageUrl, setImageUrl] = useState(null);
  const [roastResult, setRoastResult] = useState(null);

  const handleUnlockShughul = useCallback(async (file) => {
    // Create preview URL locally for privacy
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    
    // Trigger Processing Animation (Key Rotation)
    setAppState('processing');

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send image to FastAPI backend
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/unlock-shughul`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('API Request Failed');
      }

      const data = await response.json();
      
      // Result Modal expects roast, score, title, and share_text
      setRoastResult({
        roast: data.roast,
        score: data.score,
        title: data.title || 'نتائج الفحص',
        share_text: data.share_text
      });
      
      // Trigger Result Modal
      setAppState('result');
    } catch (error) {
      console.error("Error unlocking shughul:", error);
      alert('الماسورة ضربت، حاول تاني');
      
      // Revert state
      if (url) URL.revokeObjectURL(url);
      setImageUrl(null);
      setAppState('idle');
    }
  }, []);

  const handleBurn = useCallback(() => {
    // Clean up
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setRoastResult(null);
    setAppState('idle');
  }, [imageUrl]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {appState === 'idle' && <UploadZone onUpload={handleUnlockShughul} />}
      </main>

      {appState !== 'idle' && <div className="flex-1" />}

      <Footer />

      {/* Processing Overlay */}
      {appState === 'processing' && <ProcessingAnimation />}

      {/* Result Modal */}
      {appState === 'result' && roastResult && (
        <ResultModal
          result={roastResult}
          imageUrl={imageUrl}
          onBurn={handleBurn}
        />
      )}
    </div>
  );
}
