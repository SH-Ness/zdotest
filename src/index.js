import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // (선택사항) CSS 파일, 필요 없다면 생략 가능합니다.
import App from './App'; // App 컴포넌트를 불러옵니다.

// ReactDOM.render() 함수로 App 컴포넌트를 index.html의 root div에 렌더링합니다
ReactDOM.render(
  <React.StrictMode>
    <App />  {/* App 컴포넌트가 여기서 렌더링됩니다 */}
  </React.StrictMode>,
  document.getElementById('root')  // public/index.html의 <div id="root"></div>에 렌더링
);