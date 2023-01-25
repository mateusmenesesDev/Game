import { HashRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { AuthProvider } from './contexts/Auth';
import { ContextProvider } from './contexts/Context';
import { RouteList } from './routes/RouteList';

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Header />
            <ContextProvider>
              <RouteList />
            </ContextProvider>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
