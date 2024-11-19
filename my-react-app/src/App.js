// App.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './App.css';

const apiUrl = 'https://2zp0lwvxyl.execute-api.ap-northeast-2.amazonaws.com/test';

function App() {
  const [currentPosition, setCurrentPosition] = useState(null);

  // 지도의 스타일
  const mapStyles = {
    height: "300px",
    width: "100%",
  };

  // 위치 데이터를 DynamoDB에 전송하는 함수
  const logLocation = async (lat, lng) => {
    const timestamp = new Date().toISOString();
    const data = { lat, lng, timestamp };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      console.log('Location log saved:', result);
    } catch (error) {
      console.error('Error logging location:', error);
    }
  };

  // 사용자의 위치 추적
  const trackLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(newPosition);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // 위치 데이터 5초마다 전송
  useEffect(() => {
    trackLocation();

    const interval = setInterval(() => {
      if (currentPosition) {
        logLocation(currentPosition.lat, currentPosition.lng);  // 5초마다 DynamoDB에 위치 저장
      }
    }, 5000);  // 5000ms = 5초

    return () => clearInterval(interval);  // 컴포넌트가 언마운트될 때 interval 정리
  }, [currentPosition]);

  return (
    <div className="container">
      <header>
        <h1>Responsive Main Page with Live Google Map</h1>
      </header>
      <section>
        <div className="content">
          <h2>Welcome to the Main Page</h2>
          <p>This is a simple responsive page created with React.</p>
        </div>
        <div className="content">
          <h2>Your Current Location</h2>
          {/* 위치 정보가 있을 때만 구글 맵 로드 */}
          {currentPosition ? (
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={15}
                center={currentPosition}
              >
                {/* 실시간 위치에 마커 표시 */}
                <Marker position={currentPosition} />
              </GoogleMap>
            </LoadScript>
          ) : (
            <p>Loading your location...</p>
          )}
        </div>
      </section>
      <footer>
        <p>&copy; 2024 My Responsive Website</p>
      </footer>
    </div>
  );
}

export default App;
