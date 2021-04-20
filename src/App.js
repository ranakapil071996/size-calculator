import './App.css';
import Header from './components/header/Header';
import Stepper from '../src/components/stepper/Stepper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#e72744'
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Header />
        <Stepper />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
