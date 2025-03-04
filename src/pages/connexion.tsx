import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Main from "../components/main/main";

interface ConnexionProps{

}

export default class Connexion extends React.Component<ConnexionProps>{
  constructor(props: ConnexionProps) {
    document.title = "Connexion | Reverso";
    super(props);
  }

  render(){
    return (<div className={"connection-page"}>
      <Header/>
      <Main page={"connexion"} type={""} />
      <Footer/>
    </div>);
  }
}