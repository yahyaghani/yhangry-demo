// App.jsx (Main Application File)
import React from 'react';
import SetMenusPage from './pages/SetMenusPage';
import './styles/App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
            <Header />
      <SetMenusPage />
    </div>
  );
}

export default App;

