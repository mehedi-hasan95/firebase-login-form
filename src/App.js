import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth } from "firebase/auth";
import app from "./firebase/firebase.init";
import Forms from './components/Forms/Forms';
import { RouterProvider } from 'react-router-dom';
import router from './layouts/route';
const auth = getAuth(app);

function App() {
  return (
    <div className='container'>
      <RouterProvider router={router}></RouterProvider>

    </div>
  );
}

export default App;
