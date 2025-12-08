function SignIn() {
  return (
    <div>
      <form className="pt-2">
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="p-2 border mr-8"
        ></input>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 border mr-8"
        ></input>

        <button className="btn bg-primary" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default SignIn;
