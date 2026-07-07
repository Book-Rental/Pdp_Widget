import './App.css'
import BookDetailsLayout from './components/BookDetailsLayout'
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {

const queryClient = new QueryClient();
  return (
     <QueryClientProvider client={queryClient}>
    <>
    <BookDetailsLayout />
   
    </>
    </QueryClientProvider>
  )
}

export default App
