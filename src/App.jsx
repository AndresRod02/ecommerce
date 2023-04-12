import './App.css'
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
function App() {
  const isLoading = useSelector(state => state.isLoading)
  return (
    
      <HashRouter>
    <div className="App">
    {
        isLoading && <Loader/>
      }
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/purchases" element={<Purchases/>} />
      </Routes>
    </div>
    </HashRouter>
  )
}

export default App
