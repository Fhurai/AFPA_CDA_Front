import React from 'react';
import Header from "../components/header/header";
import Main from "../components/main/main";
import Footer from "../components/footer/footer";

export default class Error extends React.Component{
  render() {
    return (
      <div className={"error-page"}>
        <Header/>
        <Main page={"error"}/>
        <Footer/>
      </div>
    );
  }
}