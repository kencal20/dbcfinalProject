import React, { useState } from "react";
import SignupComponent from "../signup_component";
import LoginComponent from "../login_component";
import Navbar from "../elements/navbar";
import image from "../img/bgimg2.png";

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
      <Navbar
        onSignupButtonClick={openSignupModal}
        onLoginButtonClick={openLoginModal}
      />
      <img
        style={{
          width: "100%",
          height: "30vh", // Adjusted height
          marginBottom: "10px",
          marginTop: "0px",
        }}
        src={image}
        alt="background"
      />

      <button className="btn btn-info" onClick={openSignupModal}>
        Register
      </button>
      <br />
      <br />
      <button className="btn btn-primary" onClick={openLoginModal}>
       Login
      </button>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur omnis
        explicabo, deleniti obcaecati soluta modi reprehenderit repudiandae ex
        corrupti natus minima incidunt alias non possimus! Veniam eos voluptatem
        est expedita. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Laudantium iure quam voluptates, et omnis voluptatem temporibus
        architecto molestias sed, placeat cupiditate tempore nam modi dolore
        rerum consequatur ea dolorem commodi! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Quo magnam excepturi numquam libero quidem
        deleniti voluptates laboriosam molestias natus similique eius sunt
        repellat laborum ex illo, voluptatibus distinctio labore dolores?
      </p>
      <SignupComponent
        visible={signupModalVisible}
        closeModal={closeSignupModal}
      />
      <LoginComponent
        visible={loginModalVisible}
        closeModal={closeLoginModal}
      />
    </div>
  );
}
