import { Header } from './components/Header';
import { Genres } from './components/Genres';
import { ContextProvider } from './contexts/Context';
import { Home } from './pages/Home';

function App() {
  return (
    <ContextProvider>
      <Header />
      <main>
        <Home />
      </main>
    </ContextProvider>
  );
}

export default App;
