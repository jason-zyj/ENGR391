import { GameProvider } from './contexts/GameContext';
import SceneManager from './components/SceneManager';

function App() {
  return (
    <GameProvider>
      <SceneManager />
    </GameProvider>
  );
}

export default App;
