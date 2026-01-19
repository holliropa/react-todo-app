import { Header } from "@/components/Header";
import { Tasks } from "@/components/Tasks";
import { TasksProvider } from "@/contexts/TasksContext.tsx";

function App() {
  return (
    <>
      <TasksProvider>
        <Header />
        <Tasks />
      </TasksProvider>
    </>
  );
}

export default App;
