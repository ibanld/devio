import MainPage from './pages/MainPage'
import { OrdersProvider } from './context/ordersContext'
import { AlertProvider } from './context/alertsContenxt'

function App() {
  return (
    <AlertProvider>
      <OrdersProvider>
        <MainPage />
      </OrdersProvider>
    </AlertProvider>
  );
}

export default App;
