import React from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Main from "../../components/main/main";

interface ProspectIndexPageProps {
  typePage: string;
}

export default class ProspectIndexPage extends React.Component<ProspectIndexPageProps> {

  constructor(props: ProspectIndexPageProps) {
    document.title = "Prospects | Reverso";
    super(props);
  }

  render() {
    const {typePage} = this.props;

    return (
      <div className="prospect-page">
        <Header/>
        <Main page="index" type={typePage}/>
        <Footer/>
      </div>
    );
  }
}