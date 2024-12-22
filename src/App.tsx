import { store } from '@/store/store';
import '@/App.css';
import Minesweeper from '@/components/Minesweeper';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Minesweeper />
    </Provider>
  );
}

export default App;
