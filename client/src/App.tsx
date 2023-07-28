import { useState, useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    let call = async () => {
      let res = await fetch("/v1/auth/signup");
      console.log(res)
      let json = await res.json();
      console.log(json);
    };
    call();
  });
  return (
    <>
      <h2>hello world</h2>
    </>
  );
}

export default App;
