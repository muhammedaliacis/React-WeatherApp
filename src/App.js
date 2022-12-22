import {ThemeProvider} from './components/ThemeContext'
import Header from './components/Header';
import './components/Header/Header.css'




function App() {
  return (
    <ThemeProvider>

      <div className='app'>
      <h1 className='baslik'>WEATHER APP</h1>

      <Header/>
    </div>
    </ThemeProvider>
  );
}

export default App;
