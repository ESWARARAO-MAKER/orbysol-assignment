import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormComponentView from './components/FormComponentView';
import ViewPage from './components/ViewPage';
import { HomePage } from './components/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element = {<HomePage/>}/>
          <Route path = "/formPage" exact element = {<FormComponentView/>}/>
          <Route path = "/view" exact element = {<ViewPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
