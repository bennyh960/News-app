const LogIn = ({ handleChange, email, password, handleSubmit, handleSigninLogin }) => {
  return (
    <div className="login">
      <h1>Log in</h1>
      <div>
        <label htmlFor="">Email</label>
        <input type="text" placeholder="Email..." id="email" onChange={handleChange} value={email} />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="text" placeholder="Password..." id="password" onChange={handleChange} value={password} />
      </div>
      <div style={{ display: "inline" }}>
        <span style={{ marginRight: "1rem" }} className="btn">
          <b>Forgot password?</b>
        </span>
        <br />
        <span className="btn" onClick={handleSigninLogin}>
          <b>Not a member?</b>
        </span>
      </div>
      <label>
        <input type="checkbox" style={{ marginRight: "1rem" }} />
        <span className="checkmark">remmber me?</span>
      </label>
      <div className="buttons-form">
        <button onClick={handleSubmit} id="login">
          login
        </button>
      </div>
    </div>
  );
};

export default LogIn;
