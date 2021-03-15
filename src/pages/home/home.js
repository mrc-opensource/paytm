import React from 'react';
import logo from '../../assets/react.svg';
import './home.css';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux'
import { setTestAction } from '../../actions/home2'
import { getTestData } from '../../selectors/home2';
import { getReceipts } from '../../selectors/receipts';
import { addReceipt } from '../../actions/receipts';
import Receipt from '../../components/receipt';
/*
class Receipt {
  constructor() {
    this.description = '';
    this.currency = '';
    this.amount = 0;
  }
}
*/
class Home extends React.Component {
  constructor() {
    super();
    this.submit = evt => {
      this.props.receipts.map((receipt, index) => {
        console.log(`Receipt #${index}: `, receipt);
      });
      console.log('total: ', this.state.total);
    };
    this.addReceipt = (evt) => {
      this.props.addReceipt();
    }
    console.log('this.props:', this.props);
    this.state = {
      isDisabled: false,
      total: 0
    };
  }
  render() {
    this.state.total = this.props.receipts.reduce((a, b) => a + b.amountCAD, 0);
    this.state.isDisabled =this.state.total > 1000;
    return (
      <div className="Home2">
        <h1>Receipts</h1>
        {
          this.props.receipts.map((receipt, key) => <Receipt receipt={receipt} receiptId={key} key={key} />)
        }
        <div>
          Total: {this.state.total}
        </div>
        {
          this.state.isDisabled &&  <div className="error">
            Expense Reporting Limit has been exceeded.
          </div>
        }
        <div>
          <Button onClick={this.addReceipt} variant="contained" color="primary">
            Add Receipt
          </Button>
          <Button onClick={this.submit} variant="contained" color="primary" disabled={this.state.isDisabled}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addReceipt: addReceipt(dispatch)
  };
};
const mapStateToProps = (state, ownProps) => ({
  receipts: getReceipts(state),
  isDisabled: false,
  total: 0
});
export default connect(mapStateToProps, mapDispatchToProps)(Home)