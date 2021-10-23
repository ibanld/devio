import MainPage from './pages/MainPage'
import { OrdersProvider } from './context/ordersContext'

function App() {
  return (
    <OrdersProvider>
      <MainPage />
    </OrdersProvider>
  );
}

export default App;
