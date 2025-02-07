import React from "react";

function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to Job Portal</h1>
      <p>Find your dream job here!</p>
      <a href="/login"> Login </a>
      <br />
      <a href="/register"> Register </a>
    </div>
  );
}

export default Home;
