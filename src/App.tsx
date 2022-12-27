import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { ContextProvider } from './contexts/Context';
import { RouteList } from './routes/RouteList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <ContextProvider>
            <RouteList />
          </ContextProvider>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
