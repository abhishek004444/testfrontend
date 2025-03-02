import AppRouter from "./router/AppRouter";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  )
}

export default App;
