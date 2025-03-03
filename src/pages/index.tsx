import React from 'react';
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Main from "../components/main/main";

interface IndexPageProps {
  typePage: string;
}

export default class IndexPage extends React.Component<IndexPageProps> {
  render() {
    const {typePage} = this.props;

    return (
      <div className="index-page">
        <Header/>
        <Main page="index" type={typePage}/>
        <Footer/>
      </div>
    );
  }
}