import React from 'react';
import Header from "../components/header/header";
import Main from "../components/main/main";
import Footer from "../components/footer/footer";

export default class Contact extends React.Component {
  render() {
    return (
      <div className="contact-page">
        <Header/>
        <Main page="contact" type={""}/>
        <Footer/>
      </div>
    );
  }
}