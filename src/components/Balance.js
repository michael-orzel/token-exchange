import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import {
  etherDepositAmountChanged,
  etherWithdrawAmountChanged,
  tokenDepositAmountChanged,
  tokenWithdrawAmountChanged
} from '../store/actions'
import {
  loadBalances,
  depositEther,
  withdrawEther,
  depositToken,
  withdrawToken
} from '../store/interactions'
import {
  web3Selector,
  accountSelector,
  tokenSelector,
  exchangeSelector,
  etherBalanceSelector,
  tokenBalanceSelector,
  exchangeEtherBalanceSelector,
  exchangeTokenBalanceSelector,
  balancesLoadingSelector,
  etherDepositAmountSelector,
  etherWithdrawAmountSelector,
  tokenDepositAmountSelector,
  tokenWithdrawAmountSelector
} from '../store/selectors'
import Spinner from './Spinner'

const showForm = (props) => {
  const {
    web3,
    account,
    token,
    exchange,
    etherBalance,
    tokenBalance,
    exchangeEtherBalance,
    exchangeTokenBalance,
    etherDepositAmount,
    etherWithdrawAmount,
    tokenDepositAmount,
    tokenWithdrawAmount,
    dispatch
  } = props

  return(
    <Tabs defaultActiveKey="deposit" className="bg-dark text-white">
      
      <Tab eventKey="deposit" title="Deposit" className="bg-dark">
        
        <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>{etherBalance}</td>
              <td>{exchangeEtherBalance}</td>
            </tr>
          </tbody>
        </table>

        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          depositEther(web3, account, exchange, etherDepositAmount, dispatch)
        }}>
          <div className="col-12 col-sm pr-sm-2">
            <input 
              type="text"
              placeholder="ETH Amount"
              onChange={(e) => dispatch( etherDepositAmountChanged(e.target.value) )}
              className="form-control form-control-sm bg-dark text-white"
              required
            />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</button>
          </div>
        </form>

        <table className="table table-dark table-sm small">
          <tbody>
            <tr>
              <td>SHVL</td>
              <td>{tokenBalance}</td>
              <td>{exchangeTokenBalance}</td>
            </tr>
          </tbody>
        </table>

        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          depositToken(web3, account, token, exchange, tokenDepositAmount, dispatch)
        }}>
          <div className="col-12 col-sm pr-sm-2">
            <input 
              type="text"
              placeholder="SHVL Amount"
              onChange={(e) => dispatch( tokenDepositAmountChanged(e.target.value) )}
              className="form-control form-control-sm bg-dark text-white"
              required
            />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</button>
          </div>
        </form>

      </Tab>

      <Tab eventKey="withdraw" title="Withdraw" className="bg-dark">
        
        <table className="table table-dark table-sm small">
          <thead>
            <tr>
              <th>Token</th>
              <th>Wallet</th>
              <th>Exchange</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ETH</td>
              <td>{etherBalance}</td>
              <td>{exchangeEtherBalance}</td>
            </tr>
          </tbody>
        </table>

        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          withdrawEther(web3, account, exchange, etherWithdrawAmount, dispatch)
        }}>
          <div className="col-12 col-sm pr-sm-2">
            <input 
              type="text"
              placeholder="ETH Amount"
              onChange={(e) => dispatch( etherWithdrawAmountChanged(e.target.value) )}
              className="form-control form-control-sm bg-dark text-white"
              required
            />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
          </div>
        </form>
        
        <table className="table table-dark table-sm small">
          <tbody>
            <tr>
              <td>SHVL</td>
              <td>{tokenBalance}</td>
              <td>{exchangeTokenBalance}</td>
            </tr>
          </tbody>
        </table>

        <form className="row" onSubmit={(event) => {
          event.preventDefault()
          withdrawToken(web3, account, token, exchange, tokenWithdrawAmount, dispatch)
        }}>
          <div className="col-12 col-sm pr-sm-2">
            <input 
              type="text"
              placeholder="SHVL Amount"
              onChange={(e) => dispatch( tokenWithdrawAmountChanged(e.target.value) )}
              className="form-control form-control-sm bg-dark text-white"
              required
            />
          </div>
          <div className="col-12 col-sm-auto pl-sm-0">
            <button type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
          </div>
        </form>

      </Tab>

    </Tabs>
  )
}

class Balance extends Component {
  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const { web3, account, token, exchange, dispatch } = this.props

    await loadBalances(web3, account, token, exchange, dispatch)
  }

  render() {
    return(
      <div className="card bg-dark text-white">
        <div className="card-header">
          Balance
        </div>
        <div className="card-body">
          { this.props.showForm ? showForm(this.props) : <Spinner type="notTable" /> }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const balancesLoading = balancesLoadingSelector(state)

  return {
    web3: web3Selector(state),
    account: accountSelector(state),
    token: tokenSelector(state),
    exchange: exchangeSelector(state),
    etherBalance: etherBalanceSelector(state),
    tokenBalance: tokenBalanceSelector(state),
    exchangeEtherBalance: exchangeEtherBalanceSelector(state),
    exchangeTokenBalance: exchangeTokenBalanceSelector(state),
    balancesLoading,
    showForm: !balancesLoading,
    etherDepositAmount: etherDepositAmountSelector(state),
    etherWithdrawAmount: etherWithdrawAmountSelector(state),
    tokenDepositAmount: tokenDepositAmountSelector(state),
    tokenWithdrawAmount: tokenWithdrawAmountSelector(state)
  }
}

export default connect(mapStateToProps)(Balance)
