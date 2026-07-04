import { Routes, Route } from 'react-router';
import Home from './pages/home/Home';
import Orders from './pages/orders/Orders';
import Checkout from './pages/checkout/Checkout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/orders' element={<Orders />}/>
      <Route path='/checkout' element={<Checkout />}/>
    </Routes>
  )
}

export default App;