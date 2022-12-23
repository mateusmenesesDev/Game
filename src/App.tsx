import { Header } from './components/Header';
import { Genres } from './components/Genres';
import { ContextProvider } from './contexts/Context';

function App() {
  return (
    <ContextProvider>
      <Header />
      <main>
        <Genres />
      </main>
    </ContextProvider>
  );
}

export default App;
