import React from "react";

const Sign = ({ handleChange, email, password, password2, name, handleSubmit, handleSigninLogin }) => {
  return (
    <div className="signin">
      <h1>Sign In</h1>
      <div>
        <label htmlFor="">Full Name</label>
        <input type="text" placeholder="Full Name..." id="name" onChange={handleChange} value={name} />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input type="text" placeholder="Email..." id="email" onChange={handleChange} value={email} />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="text" placeholder="Password..." id="password" onChange={handleChange} value={password} />
      </div>
      <div>
        <label htmlFor="">Check Password</label>
        <input type="text" placeholder="Password..." id="password2" onChange={handleChange} value={password2} />
      </div>
      <div style={{ display: "inline" }}>
        <span className="btn" onClick={handleSigninLogin}>
          Already have account?
        </span>
      </div>
      <label>
        <input type="checkbox" style={{ marginRight: "1rem" }} />
        <span className="checkmark">remmber me?</span>
      </label>
      <div className="buttons-form">
        <button onClick={handleSubmit} id="signin">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Sign;
