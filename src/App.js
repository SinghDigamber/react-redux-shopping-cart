import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { Routes, Route } from 'react-router-dom'

import Header from './components/header/Header'
import Products from './components/products/Products'
import Cart from './components/cart/Cart'

function App() {
  return (
    <div className="container py-3">
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
