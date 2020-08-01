import React from "react";
import spinner from "./spinner.gif";

export default () => (
  <div
    style={{
      width: "500px",
      margin: "100px auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <h1 style={{color:'cornflowerblue'}}>Sorry for the slow loading ... this is a free Heroku server :)</h1>
    <img
      src={spinner}
      style={{
        width: "200px",
      }}
      alt="Loading..."
    />
  </div>
);
