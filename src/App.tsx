import { Header } from './components/Header';
import { Genres } from './components/Genres';
import { ContextProvider } from './contexts/Context';
import { Placeholder } from './components/utils/Placeholder';

function App() {
  return (
    <ContextProvider>
      <Header />
      <main>
        <Genres />
        <Placeholder quantify={16} />
      </main>
    </ContextProvider>
  );
}

export default App;
