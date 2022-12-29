import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { ContextProvider } from './contexts/Context';
import { RouteList } from './routes/RouteList';

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <main>
          <ContextProvider>
            <RouteList />
          </ContextProvider>
        </main>
      </HashRouter>
    </>
  );
}

export default App;
