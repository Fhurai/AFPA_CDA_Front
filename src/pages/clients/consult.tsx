import React from 'react';
import Header from "../../components/header/header";
import Main from "../../components/main/main";
import Footer from "../../components/footer/footer";

interface ConsultProps {
  consulttype: string,
  datatype: string
}

export default class Consult extends React.Component<ConsultProps> {


  render() {
    const {consulttype, datatype} = this.props;

    return <div className="client-page">
      <Header/>
      <Main page={consulttype} type={datatype}/>
      <Footer/>
    </div>;
  }
}