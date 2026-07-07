import { Routes, Route } from 'react-router';
import Home from './pages/home/Home';
import Orders from './pages/orders/Orders';
import Checkout from './pages/checkout/Checkout';
import Tracking from './pages/tracking/Tracking';
import ErrorNotFound from './pages/ErrorNotFound';
import { CartContextProvider } from './contexts/CartContext';
import Layout from './components/Layout';

function App() {
  return (
    <CartContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/tracking' element={<Tracking />} />
        </Route>
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/*' element={<ErrorNotFound />}></Route>
      </Routes>
    </CartContextProvider>
  )
}

export default App;