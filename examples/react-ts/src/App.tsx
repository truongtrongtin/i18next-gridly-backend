import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import './App.css';
import reactLogo from './assets/react.svg';

const languages = [
  { value: 'en', name: 'English' },
  { value: 'sv', name: 'Swedish' },
  { value: 'de', name: 'German' },
  { value: 'fr', name: 'French' },
];

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
          {t('count_is', 'count is {{number}}', { number: count })}
        </button>
        <p>
          <Trans i18nKey="description.part1">
            Edit <code>src/App.js</code> and save to test HMR
          </Trans>
        </p>
      </div>
      <p className="read-the-docs">
        {t(
          'description.part2',
          'Click on the Vite and React logos to learn more',
        )}
      </p>
      <div>
        {languages.map((lng) => (
          <button
            key={lng.value}
            style={{
              fontWeight:
                i18n.resolvedLanguage === lng.value ? 'bold' : 'normal',
            }}
            onClick={() => i18n.changeLanguage(lng.value)}
          >
            {lng.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
