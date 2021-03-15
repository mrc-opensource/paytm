import React from 'react';
import logo from '../../assets/react.svg';
import './home2.css';
import Button from '@material-ui/core/Button';
import fetch from 'isomorphic-fetch';
import AbortController from 'abort-controller';

import { connect } from 'react-redux'
import { setTestAction } from '../../actions/home2'
import { getTestData } from '../../selectors/home2';

class Home2 extends React.Component {
  constructor() {
    super();
    this.handleClick = (evt, test) => {
      if (this.controller) {
        this.controller.abort();
      }
      if (typeof evt === 'string') {
        return this.props.setTestAction(evt);
      }
      this.props.setTestAction('testing');
    }
    this.api = () => {
      if (this.controller) {
        this.controller.abort();
      }
      this.controller = new AbortController();
      let url =
        'https://api.stackexchange.com/2.2/questions?site=stackoverflow&tagged=javascript';

      let responseData = fetch(url, {signal: this.controller.signal}).then(response => response.json());
      responseData.then((data) => {
        this.controller = null;
        setTimeout(() => {
          this.handleClick(JSON.stringify(data));
        },5000);
      });
    };
    this.api();
  }
  render() {
    return (
      <div className="Home2">
        home2
        <Button onClick={this.handleClick} variant="contained" color="primary">
          Hello World: {this.props.testData}
        </Button>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setTestAction: setTestAction(dispatch)
  };
};
const mapStateToProps = (state, ownProps) => ({
  testData: getTestData(state)
});
export default connect(mapStateToProps, mapDispatchToProps)(Home2)
