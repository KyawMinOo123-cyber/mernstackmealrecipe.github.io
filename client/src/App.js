import './App.css';
import {BrowserRouter as Router,Routes,Route} from  "react-router-dom"
import Home from './pages/home.js'
import Auth from './pages/auth'
import CreateRecipe from './pages/create-Recipe'
import SavedRecipe from './pages/save-Recipe'
import NavBar from './components/navBar';
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/create-recipe' element={<CreateRecipe/>}/>
          <Route path='/save-recipe' element={<SavedRecipe/>}/>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
