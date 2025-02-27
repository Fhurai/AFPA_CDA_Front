import React from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Main from "../../components/main/main";

interface ProspectIndexPageProps {
  typePage?: string;
}

export default class ProspectIndexPage extends React.Component<ProspectIndexPageProps> {
  render() {
    const { typePage } = this.props;

    return (
      <div className="prospect-page">
        <Header />
        <Main page="prospects-index" type={typePage} />
        <Footer />
      </div>
    );
  }
}