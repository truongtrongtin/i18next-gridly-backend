import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import reactLogo from './assets/react.svg';

function App() {
  const [count, setCount] = useState(0);
  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <p>{t('global_one')}</p>
      <p>{t('global_two')}</p>
      <p>{t('global_three')}</p>
      <p>{t('global_four', 'four')}</p>
      <div>
        {['en', 'vi', 'jp', 'zh'].map((lng) => (
          <button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
            }}
            type="submit"
            onClick={() => {
              i18n.changeLanguage(lng);
            }}
          >
            {lng}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
