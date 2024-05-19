import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormComponentView from './components/FormComponentView';
import ViewPage from './components/ViewPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/" exact element = {<FormComponentView/>}/>
          <Route path = "/view" exact element = {<ViewPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
