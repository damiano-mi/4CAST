import Navbar from "./components/Navbar"
import { Provider } from "react-redux"
import { store } from "./state/store"
import Home from "./pages/Home"

function App() {
  return (
    <Provider store={store}>
      <div className="container-fluid" id="main">
        <Navbar />
        <Home />
      </div>
    </Provider>
  );
}

export default App;