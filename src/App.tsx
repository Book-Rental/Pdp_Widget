import BookDetailsLayout from './components/BookDetailsLayout'
import "@rentbook/rentbook-ui-lib/microfrontend.min.css"
import "./index.css";
import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <BookDetailsLayout />
    </QueryClientProvider>
  )
}

export default App
