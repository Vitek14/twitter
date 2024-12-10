import './App.css'
import ReactDOM from 'react-dom/client'
import ProfilePage from "./pages/ProfilePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([{
  path: "/",
  element: <ProfilePage />,
}])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)

// export default App;
//