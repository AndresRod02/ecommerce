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
import ProtectedRoutes from './components/ProtectedRoutes'
import 'boxicons'
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
        <Route element={<ProtectedRoutes/>}>
        <Route path="/purchases" element={<Purchases/>} />
        </Route>
        <Route path="/" element={<Home/>} />
        <Route path={"/product/:id"} element={<ProductDetail/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
    </HashRouter>
  )
}

export default App
