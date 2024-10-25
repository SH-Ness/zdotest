// App.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './App.css';

function App() {
  const [currentPosition, setCurrentPosition] = useState(null);  // 초기 상태를 null로 설정

  // 지도의 스타일
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  // 사용자의 위치 추적
  const trackLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
          (position) => {
            setCurrentPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
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

  // 컴포넌트가 마운트될 때 실시간 위치 추적 시작
  useEffect(() => {
    trackLocation();
  }, []);

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
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}> {/* 환경 변수를 통해 API 키를 불러옴 */}
                  <GoogleMap
                      mapContainerStyle={mapStyles}
                      zoom={15}
                      center={currentPosition}  // 실시간 위치로 지도 중심 설정
                  >
                    {/* 실시간 위치에 마커 표시 */}
                    <Marker position={currentPosition} />
                  </GoogleMap>
                </LoadScript>
            ) : (
                <p>Loading your location...</p>  // 위치 정보가 로딩 중일 때 표시
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
