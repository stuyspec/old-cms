import React from "react";
import SignInForm from "./SignInForm";
import axios from "axios";
import { SPEC_API_URL } from "../constants";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createSession } from "../actions";

const SignInPage = ({ createSession, push }) => {
  const handleSubmit = values => {
    axios.post(`${SPEC_API_URL}/auth/sign_in`, values).then(response => {
      const { headers: { client, uid, expiry } } = response;
      const token = response.headers["access-token"];
      localStorage.setItem("client", client);
      localStorage.setItem("token", token);
      localStorage.setItem("uid", uid);
      localStorage.setItem("expiry", expiry);
      createSession(uid);
      push("/");
    });
  };
  return (
    <div>
      <SignInForm onSubmit={handleSubmit} />
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ push, createSession }, dispatch);

export default connect(null, mapDispatchToProps)(SignInPage);
