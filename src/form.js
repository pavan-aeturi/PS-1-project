import React from "react";
class Form extends React.Component {
  render() {
    return (
      <div className="RML-login-modal-form">
        <div className="RML-form-group">
          <label for="both-email">Email</label>
          <input
            type="email"
            class="RML-form-control"
            id="both-email"
            name="email"
            placeholder="Email"
            value=""
          />
        </div>
        <div className="RML-form-group">
          <label for="both-password">Password</label>
          <input
            type="password"
            class="RML-form-control"
            id="both-password"
            name="password"
            placeholder="Password"
            value=""
          />
        </div>
        <button className="RML-btn" id="loginSubmit">
          Sign in
        </button>
        <div className="clearfix"></div>
      </div>
    );
  }
}
export default Form;
