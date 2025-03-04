import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Main from "../components/main/main";

interface DeconnexionProps{

}

export default class Deconnexion extends React.Component<DeconnexionProps>{
  constructor(props: DeconnexionProps) {
    document.title = "Connexion | Reverso";
    super(props);
  }

  render(){
    return (<div className={"disconnection-page"}>
      <Header/>
      <Main page={"deconnexion"} type={""} />
      <Footer/>
    </div>);
  }
}