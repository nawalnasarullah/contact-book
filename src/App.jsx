import "./App.css";
import ErrorPage from "./pages/ErrorPage";
import Contact from "./pages/Contact";
import EditPage from "./pages/EditPage";
import Main from "./pages/Main";
import Layout from "./components/Layout";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
       <Route path="/home" element={<Main />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/edit/:id" element={<EditPage />} />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
