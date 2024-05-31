import { useState } from "react";
import "./App.css";
import GeneratePokemonCards from "./components/pokemon-cards";

function App() {
  return (
    <>
      <h1>Memory Card Project</h1>
      <GeneratePokemonCards />
    </>
  );
}

export default App;
