import React, { Component } from 'react';
import Background from '../images/blimp1.png';
// import { SSL_OP_PKCS1_CHECK_1 } from 'constants';

var sectionStyle = {
  width: "100%",
  height: "1300px",

  backgroundImage: `url(${Background})`
};
class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <div id="404" className="404">
          <header>
            <h1>404 Not Found</h1>
          </header>
        </div>
        <section style={sectionStyle}>
        </section>
      </div>
    );
  }
}

export default NotFoundPage;
