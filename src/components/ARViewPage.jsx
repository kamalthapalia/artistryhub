
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

function ARViewPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [qrCodeValue, setQRCodeValue] = useState('');

    useEffect(() => {
        // Check if the user agent indicates a mobile device
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));

        // Retrieve the data from localStorage with error handling
        try {
            const arContentData = JSON.parse(localStorage.getItem('arContentData'));
            if (arContentData && arContentData.qrCodeValue) {
                setQRCodeValue(arContentData.qrCodeValue);
            }
        } catch (error) {
            console.error('Error parsing AR content data from localStorage:', error);
        }

        // Redirect mobile users directly to AR content page
        if (isMobile) {
            window.location.href = `${window.location.origin}/ARContent.html`;
        }
    }, [isMobile]); // Add isMobile as a dependency

    return (
        <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {!isMobile && (
                <div style={{ flex: '1', textAlign:'center' }}>
                    <>
                        <p style={{ fontSize: '2.5rem' }}>Run URL in your mobile web browser </p>
                        <p style={{ fontSize: '2.5rem' }}>URL: {window.location.href}</p>
                        <p style={{ fontSize: '2.5rem'}} >OR</p>
                        <p style={{ fontSize: '2.5rem' }}>Scan QR Code</p>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <QRCode value={qrCodeValue} size={300} />
                        </div>
                    </>
                </div>
            )}
            {!isMobile && (
                <p style={{ fontSize: '1.5rem', marginTop: '20px' }}>This feature is only available on mobile web browsers.</p>
            )}
        </div>
    );
}

export default ARViewPage;
