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
    this.updateDescription = (evt) => {
        console.log('evt: ', evt.target.value);
        this.props.setReceipt({
            description: evt.target.value
        });
    }
    this.handleChange = (evt, target) => {
        console.log('this.props.receipt2:', target, this.props.receipt);
        console.log('evt2: ', evt, evt.target, evt.target.value);
        const CURRENT_VALUE = target === 'amount' ? parseFloat(evt.target.value): evt.target.value;
        if (!this.props.receipt.currency || !this.props.receipt.amount) {
            console.log('set: ', {
                [target]: CURRENT_VALUE
            });
            return this.props.setReceipt({
                [target]: CURRENT_VALUE
            });
        }
        rates().then(data => {
            console.log('this.props.receipt:', this.props.receipt);
            const amt = target === 'amount' ? parseFloat(CURRENT_VALUE): this.props.receipt.amount;
            console.log('data.rates[this.props.currency]: ', data.rates, );
            console.log('data.rates[this.props.currency]2: ', this.props.receipt.currency);
            console.log('data.rates[this.props.currency]3: ',  data.rates[this.props.receipt.currency]);
            const amountCAD = typeof amt !== 'number' ? null: amt * data.rates[this.props.receipt.currency];
            this.props.setReceipt({
                [target]: CURRENT_VALUE,
                amountCAD
            });
        });
    }
  }
  render() {
      console.log('props: ', this.props.receipt)
    const CURRENCY_LABEL = 'currency-label' + this.props.receiptId;
    return (
        <>
            <div>
                <label htmlFor="description">Description</label>
                <input onChange={this.updateDescription} value={this.props.receipt.description} name="description" />
            </div>
            <div>
                <InputLabel id={CURRENCY_LABEL}>Currency</InputLabel>
                <Select
                    labelId={CURRENCY_LABEL}
                    value={this.props.receipt.currency}
                    onChange={evt => this.handleChange(evt, 'currency')}
                >
                    {
                        CURRENCIES.map(currency => <MenuItem value={currency} key={currency}>{currency}</MenuItem>)
                    }
                </Select>
            </div>
            <div>
                <label htmlFor="amount">Description</label>
                <input value={this.props.receipt.amount} onChange={evt => this.handleChange(evt, 'amount')} type="number" step="0.01" name="amount" />
            </div>
            Amount in CAD: {this.props.receipt.amountCAD}
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