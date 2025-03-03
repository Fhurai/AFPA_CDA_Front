import React from 'react';
import Header from "../components/header/header";
import Main from "../components/main/main";
import Footer from "../components/footer/footer";

interface ErrorProps {

}

export default class Error extends React.Component<ErrorProps> {

  constructor(props: ErrorProps) {
    document.title = "Erreur | Reverso";
    super(props);
  }

  render() {
    return (
      <div className={"error-page"}>
        <Header/>
        <Main page={"error"} type={""}/>
        <Footer/>
      </div>
    );
  }
}