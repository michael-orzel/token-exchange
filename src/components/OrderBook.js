import React, { Component } from 'react'
import { connect } from 'react-redux'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { fillOrder } from '../store/interactions'
import {
  accountSelector,
  exchangeSelector,
  orderBookLoadedSelector,
  orderBookSelector,
  orderFillingSelector
} from '../store/selectors'
import Spinner from './Spinner'

const renderTooltip = (order) => {  
  return (
    <Tooltip id={order.id}>
      {`Click here to ${order.orderFillAction}`}
    </Tooltip>
  )
}

const renderOrder = (order, props) => {
  const { account, exchange, dispatch } = props
  
  return (
    <OverlayTrigger
      key={order.id}
      placement='auto'
      overlay={renderTooltip(order)}
    >
      <tr 
        key={order.id}
        className="order-book-order"
        onClick={(e) => {
          fillOrder(order, account, exchange, dispatch)
        }}
      >
        <td>{order.tokenAmount}</td>
        <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
        <td>{order.etherAmount}</td>
      </tr>
    </OverlayTrigger>
  )
}

const showOrderBook = (props) => {
  const { orderBook } = props

  return (
    <tbody>
      { orderBook.sellOrders.map((order) => renderOrder(order, props)) }
      <tr>
        <th>SHVL</th>
        <th>SHVL/ETH</th>
        <th>ETH</th>
      </tr>
      { orderBook.buyOrders.map((order) => renderOrder(order, props)) }
    </tbody>
  )
}

class OrderBook extends Component {
  render() {
    return (
      <div className="vertical">
        <div className="card bg-dark text-white">
          <div className="card-header">
            Order Book
          </div>
          <div className="card-body order-book">
            <table className="table table-dark table-sm small">
              { this.props.showOrderBook ? showOrderBook(this.props) : <Spinner type="table" /> }
            </table>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const orderBookLoaded = orderBookLoadedSelector(state)
  const orderFilling = orderFillingSelector(state)

  return {
    account: accountSelector(state),
    exchange: exchangeSelector(state),
    orderBook: orderBookSelector(state),
    showOrderBook: orderBookLoaded && !orderFilling
  }
}

export default connect(mapStateToProps)(OrderBook)
