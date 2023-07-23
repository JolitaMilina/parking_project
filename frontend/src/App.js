import "./App.css";
import Navigation from "./components/Navigation";

function App({ children }) {
  return (
    <div className="App">
      <Navigation />
      {children}
    </div>
  );
}

export default App;
