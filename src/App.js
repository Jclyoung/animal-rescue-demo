import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import routes from "./routes";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <Routes>
          {routes
            .filter((r) => r.isNav)
            .map((r) => (
              <Route
                exact={true}
                path={r.path}
                key={r.title}
                element={<r.element />}
              />
            ))}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
