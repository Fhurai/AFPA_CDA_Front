import React from 'react';
import Header from "../components/header/header";
import Main from "../components/main/main";
import Footer from "../components/footer/footer";
import Strings from "../utilities/Strings";

interface ConsultProps {
  consulttype: string,
  datatype: string
}

export default class Consult extends React.Component<ConsultProps> {

  constructor(props: ConsultProps) {
    document.title = Strings.nameToLabel(props.consulttype) + " " + Strings.nameToLabel(props.datatype) + " | Reverso";
    super(props);
  }

  render() {
    const {consulttype, datatype} = this.props;

    return <div className="client-page">
      <Header/>
      <Main page={consulttype} type={datatype}/>
      <Footer/>
    </div>;
  }
}