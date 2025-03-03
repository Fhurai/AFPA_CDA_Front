import React from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Main from "../../components/main/main";

interface ClientIndexPageProps {
  typePage: string;
}

export default class ClientIndexPage extends React.Component<ClientIndexPageProps> {
  render() {
    const {typePage} = this.props;

    return (
      <div className="client-page">
        <Header/>
        <Main page="index" type={typePage}/>
        <Footer/>
      </div>
    );
  }
}