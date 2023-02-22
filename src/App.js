import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
import "./App.css";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "549890286771691",
        cookie: true,
        xfbml: true,
        version: "v15.0",
      });

      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const getLoginStatus = () => {
    window.FB.getLoginStatus(function (response) {
      window.statusChangeCallback(response);
    });
  };

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div class="container">
      {/* <Card style={{ width: "600px" }}>
        <Card.Header>
          {!login && (
            <FacebookLogin
              appId="549890286771691"
              // autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook"
            />
          )}
          {login && <Image src={picture} roundedCircle />}
        </Card.Header>
        {login && (
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>{data.email}</Card.Text>
          </Card.Body>
        )}
      </Card> */}
      <button
        onClick={() =>
          window.FB.login(function (response) {
            console.log("check", response);
            if (response.authResponse) {
              console.log("Welcome!  Fetching your information.... ");
              window.FB.api("/me", function (response) {
                console.log("Good to see you, " + response.name + ".");
              });
            } else {
              console.log("User cancelled login or did not fully authorize.");
            }
          })
        }
      >
        Click
      </button>
    </div>
  );
}

export default App;
