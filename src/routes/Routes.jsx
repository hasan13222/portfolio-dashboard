import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Skills from "../pages/Skills";
import Dashboard from "../pages/Dashboard";
import Education from "../pages/Education";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Login from "../pages/Login";
import ProtectedPage from "./ProtectedRoute";



const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedPage><App/></ProtectedPage>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: '/about',
                element: <About/>
            },            
            {
                path: '/skills',
                element: <Skills/>
            },
            {
                path: '/projects',
                element: <Projects/>
            },
            {
                path: '/education',
                element: <Education/>
            },
            {
                path: '/experience',
                element: <Experience/>
            },

        ]
    },
    {
        path: 'login',
        element: <Login/>
    }
]);

export default router