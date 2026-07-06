import { Routes, Route } from 'react-router';
import Home from './pages/home/Home';
import Orders from './pages/orders/Orders';
import Checkout from './pages/checkout/Checkout';
import Tracking from './pages/tracking/Tracking';
import ErrorNotFound from './pages/ErrorNotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/orders' element={<Orders />}/>
      <Route path='/checkout' element={<Checkout />}/>
      <Route path='/tracking' element={<Tracking />}/>
      <Route path='/*' element={<ErrorNotFound/>}></Route>
    </Routes>
  )
}

export default App;