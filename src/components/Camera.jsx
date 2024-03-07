import React, { useRef, useEffect } from 'react';

const CameraComponent = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        let stream = null;

        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Error accessing camera:', err);
            }
        };

        startCamera();

        // Cleanup function
        return () => {
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
        </div>
    );
};

export default CameraComponent;
