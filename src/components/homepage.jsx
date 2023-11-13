import React, { useState } from "react";
import SignupComponent from "./signup_component";
import LoginComponent from "./login_component";

export default function Homepage() {
  const [signupModalVisible, setSignupModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const openSignupModal = () => {
    setSignupModalVisible(true);
  };

  const closeSignupModal = () => {
    setSignupModalVisible(false);
  };

  const openLoginModal = () => {
    setLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  return (
    <div>
      <button className="btn btn-info" onClick={openSignupModal}>
        Register 
      </button>

      <SignupComponent
        visible={signupModalVisible}
        closeModal={closeSignupModal}
      />
      <br />
      <br />
      <button className="btn btn-success" onClick={openLoginModal}>Login</button>
      <LoginComponent visible={loginModalVisible} closeModal={closeLoginModal} />
    </div>
  );
}
