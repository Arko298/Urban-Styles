import React, { useState } from "react";

const Login = () => {
  // State to manage the current form (Login or Sign Up)
  const [currentState, setCurrentState] = useState("Login");

  // Handler for form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Add your authentication logic here
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 text-gray-800"
    >
      {/* Header displaying the current state (Login or Sign Up) */}
      <div className="inline-flex items-center gap-2 mt-10 mb-8">
        {" "}
        {/* Added margin-bottom here */}
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Conditionally render 'Name' input if currentState is not 'Login' */}
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-3 border border-gray-800 mb-4" // Input for name, shown only in Sign Up
          placeholder="Name"
        />
      )}

      {/* Input for email */}
      <input
        type="email"
        className="w-full px-3 py-3 border border-gray-800 mb-4" // Input for email
        placeholder="Email"
      />

      {/* Input for password */}
      <input
        type="password"
        className="w-full px-3 py-3 border border-gray-800 mb-6" // Input for password with extra margin
        placeholder="Password"
      />

      {/* Link for forgot password and switch between Login and Sign Up */}
      <div className="w-full flex justify-between text-sm mb-4">
        <p className="cursor-pointer">Forgot your Password?</p>

        {/* Conditional rendering for switching between Login and Sign Up */}
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      {/* Button text changes based on the current state */}
      <button className="bg-black text-white px-8 py-2">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
