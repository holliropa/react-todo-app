import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/Home";
import { TaskDetails } from "@/pages/TaskDetails/TaskDetails.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/task/:id", element: <TaskDetails /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
