import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { ContextProvider } from './contexts/Context';
import { RouteList } from './routes/RouteList';

function App() {
  return (
    <div>
      <Header />
      <main>
        <ContextProvider>
          <BrowserRouter>
            <RouteList />
          </BrowserRouter>
        </ContextProvider>
      </main>
    </div>
  );
}

export default App;
