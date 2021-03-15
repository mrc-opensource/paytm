import React from 'react';
import Button from '@material-ui/core/Button';
import fetch from 'isomorphic-fetch';
import AbortController from 'abort-controller';
import { setReceipt } from '../actions/receipts';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import { CURRENCIES } from '../constants';
import rates from '../services/rates';

class Receipt extends React.Component {
  constructor() {
    super();
    this.state = {
        ...this.state
    };
    this.updateDescription = (evt) => {
        this.state.description = evt.target.value;
    }
    this.handleChange = (evt, target) => {
        const CURRENT_VALUE = target === 'amount' ? parseFloat(evt.target.value): evt.target.value;
        this.state[target] = CURRENT_VALUE;
    }
    this.updateReceipt = () => {
        if (!this.state.currency || !this.state.amount) {
            return this.props.setReceipt(this.state);
        }
        rates().then(data => {
            const amountCAD = typeof this.state.amount !== 'number' ? null: this.state.amount / data.rates[this.state.currency];
            this.state.amountCAD = amountCAD;
            this.props.setReceipt(this.state);
        });
    }
  }
  render() {
    const CURRENCY_LABEL = 'currency-label' + this.stateId;
    return (
        <>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    onChange={this.updateDescription}
                    value={this.state.description}
                    name="description"
                    onBlur={() => this.updateReceipt(true)}
                />
            </div>
            <div>
                <InputLabel id={CURRENCY_LABEL}>Currency:</InputLabel>
                <Select
                    labelId={CURRENCY_LABEL}
                    value={this.state.currency}
                    onChange={evt => { this.handleChange(evt, 'currency'); this.updateReceipt(true)}}
                >
                    {
                        CURRENCIES.map(currency => <MenuItem value={currency} key={currency}>{currency}</MenuItem>)
                    }
                </Select>
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    value={this.state.amount}
                    onChange={evt => this.handleChange(evt, 'amount')}
                    onBlur={() => this.updateReceipt(true)}
                    type="number"
                    step="0.01"
                    name="amount"
                />
            </div>
            Amount in CAD: {this.state.amountCAD}
        </>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setReceipt: setReceipt(dispatch, ownProps.receiptId)
  };
};
const mapStateToProps = (state, ownProps) => ({
  // testData: getTestData(state)
});
export default connect(mapStateToProps, mapDispatchToProps)(Receipt)