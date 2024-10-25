import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';  // App 컴포넌트를 불러옵니다

ReactDOM.render(
    <React.StrictMode>
        <App />  {/* 메인 컴포넌트로 App 렌더링 */}
    </React.StrictMode>,
    document.getElementById('root')  // index.html의 root 요소에 주입
);
