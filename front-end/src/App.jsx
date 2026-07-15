import { Routes, Route } from 'react-router';
import Home from './pages/home/Home';
import Orders from './pages/orders/Orders';
import Checkout from './pages/checkout/Checkout';
import Tracking from './pages/tracking/Tracking';
import ErrorNotFound from './pages/error/ErrorNotFound';
import { CartContextProvider } from './contexts/CartContext';
import { OrdersContextProvider } from './contexts/OrdersContext';
import Layout from './components/Layout';
import {ToastContextProvider} from './contexts/ToastContext';
import ToastContainer from './components/ToastContainer';

function App() {
  return (
    <ToastContextProvider>
      <CartContextProvider>
        <OrdersContextProvider>
          <ToastContainer />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/tracking' element={<Tracking />} />
            </Route>
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/*' element={<ErrorNotFound />} />
          </Routes>
        </OrdersContextProvider>
      </CartContextProvider>
    </ToastContextProvider>
  )
}

export default App;