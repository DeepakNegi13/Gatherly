import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"

// Create the React application at the root element supplied by index.html.
createRoot(document.getElementById("root")).render(
  // Redux Provider makes the shared store available to every nested component.
  <Provider store={store}>
    {/* BrowserRouter enables client-side route matching and navigation. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
