import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer" aria-label="Footer">
        <div className="container-fluid">
          <div className="row" role="contentinfo">
            <div className="col-4">
              Done with <a href="https://getbootstrap.com/">Bootstrap</a>
            </div>
            <div className="col-4">
              <a href="/contact">
                Nous contacter
              </a>
            </div>
            <div className="col-4">
              <a href="./sitemap.xml">Plan du site</a>
            </div>
            <div className="col-4">
              CGU
            </div>
          </div>
        </div>
      </footer>
    );
  }
}