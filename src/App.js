import logo from "./logo.svg";
import "./App.css";
import { TableF } from "./components/Table";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1> Dynamic Programming Questions </h1>
      </div>

      <TableF />
    </>
  );
}

export default App;
