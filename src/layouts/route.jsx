import { createBrowserRouter } from "react-router-dom";
import Forms from "../components/Forms/Forms";
import Login from "../components/Forms/Login";
import Main from "./Main";

const router = createBrowserRouter([
    {path: '/', element: <Main></Main>,
    children: [
        {path: '/', element: <Forms></Forms>},
        {path: 'login', element: <Login></Login>},
        {path: 'forms', element: <Forms></Forms>},
    ]
}
]);

export default router;