import React, { Component } from 'react'
import axios from 'axios'
import {endpointPath} from '../config/api';
import Dropdowns from "../components/Dropdowns"
import ExchangeResult from "../components/ExchangeResult"
import {dropdownData} from "../data/dropdowns"

class CurrencyExchange extends Component {

    constructor(props) {
        super(props);
        this.default = {
            from: 'USD',
            into: 'EUR',
            loading: false,
            amount: 1,
            conversionResult: '',
            dropdowns: dropdownData
        }
        this.state = this.default
       
    }

    convertCurrency = async ({ from, into, amount }) => {
        try {
            this.setState({ loading: true });
            let convertedAmount = endpointPath(from, into, amount)
            let result = await axios.request(convertedAmount).then(function (response) {
                return response.data.result[into];
            })
            this.setState({
                conversionResult: result,
                loading: false
            })
    }
    catch(e) {
        console.log('theres an error', e)
    }
}

    handleInput = (event) => {
        this.setState({ amount: event.target.value });
    }

    handleFrom = (event) => {
        this.setState({ from: event.currentTarget.value });
    }

    handleInto = (event) => {
        this.setState({ into: event.currentTarget.value });
    }

    handleReset = () => {
        this.setState(this.default)
    }

    handleSwitch = () => {
        const { from, into } = this.state;
        this.setState({ from: into, into: from });
    };

    render() {
        const {
            from,
            into,
            amount,
            conversionResult,
            loading,
            dropdowns
        } = this.state
        return (
            <>
                <div className='container-fluid shadow'>
                    <input
                        className="form-control-lg mt-5 shadow amount bg-dark"
                        placeholder="Enter Amount"
                        value={amount}
                        type="number"
                        onChange={this.handleInput}
                    />
                    <div className='fromdrop'>
                        <Dropdowns
                            labelName="From"
                            handleChange={this.handleFrom}
                            value={from}
                            ddValues= {dropdowns}
                        ></Dropdowns>
                    </div>
                    <div className='text-center swap'>
                        <button className="btn shadow text-center" onClick={this.handleSwitch}><i className="fas fa-sort"></i></button>
                    </div>
                    <div className='intodrop'>
                        <Dropdowns
                            labelName="To"
                            handleChange={this.handleInto}
                            value={into}
                            ddValues= {dropdowns}
                        ></Dropdowns>
                    </div>
                    <div className="mt-5 text-center">
                        <button
                            className='btn btn-scolor btn-lg shadow'
                            disabled={amount === "0" || amount === "" || amount < 0}
                            onClick={() => this.convertCurrency(this.state)}
                        >Convert</button>
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            className='btn btn-rcolor btn-lg shadow'
                            text="Reset"
                            onClick={this.handleReset}
                        >Reset <i className="fas fa-redo-alt"></i></button>
                    </div>
                    <div className='mt-5 mb-2 text-center'>
                        <ExchangeResult
                            Loading={loading}
                            result={conversionResult}
                        ></ExchangeResult>
                    </div>
                </div>
            </>
        )
    }
}

export default CurrencyExchange