import React from "react";
import ReactModalLogin from "react-modal-login";
import { Button } from "react-bootstrap";
import { facebookConfig, googleConfig } from "./social-config";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      loading: false,
      error: null,
    };
  }

  openModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null,
    });
  }

  onLoginSuccess(method, response) {
    console.log("logged successfully with " + method);
    this.setState({
      loading: false,
    });
  }

  onLoginFail(method, response) {
    console.log("logging failed with " + method);
    this.setState({
      error: response,
    });
    this.setState({
      loading: false,
    });
  }

  startLoading() {
    this.setState({
      loading: true,
    });
  }

  finishLoading() {
    this.setState({
      loading: false,
    });
  }

  afterTabsChange() {
    this.setState({
      error: null,
    });
  }
  render() {
    return (
      <div>
        <Button
          className="btn"
          variant="success"
          style={{
            display: "inline-block",
            textAlign: "center",
            marginBottom: "4px",
          }}
          onClick={() => {
            this.openModal();
          }}
        >
          Sign in
        </Button>
        <ReactModalLogin
          id="form"
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={this.state.loading}
          error={this.state.error}
          //  form={<Form></Form>}
          tabs={{
            afterChange: this.afterTabsChange.bind(this),
          }}
          loginError={{
            label: "Couldn't sign in, please try again.",
          }}
          registerError={{
            label: "Couldn't sign up, please try again.",
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          providers={{
            facebook: {
              config: facebookConfig,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              label: "Continue with Facebook",
            },
            google: {
              config: googleConfig,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              label: "Continue with Google",
            },
          }}
        />
      </div>
    );
  }
}
export default Login;
