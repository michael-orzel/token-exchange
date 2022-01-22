import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from 'react-apexcharts'
import { chartOptions } from './PriceChart.config'
import {
  priceChartLoadedSelector,
  priceChartSelector
} from '../store/selectors'
import Spinner from './Spinner'

const priceSymbol = (lastPriceChange) => {
  let symbol

  if(lastPriceChange === '+') {
    symbol = <span className="text-success">&#9650;</span>
  } else {
    symbol = <span className="text-danger">&#9660;</span>
  }

  return symbol
}

const showPriceChart = (priceChart) => {
  return(
    <div className="price-chart">
      <div className="price">
        <h4>SHVL/ETH &nbsp; {priceSymbol(priceChart.lastPriceChange)} &nbsp; {priceChart.lastPrice}</h4>
      </div>
      <Chart options={chartOptions} series={priceChart.series} type='candlestick' width='100%' height='100%' />
    </div>
  )
}

class PriceChart extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          Price Chart
        </div>
        <div className="card-body">
        { this.props.priceChartLoaded ? showPriceChart(this.props.priceChart) : <Spinner type="notTable" /> }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {  
  return {
    priceChartLoaded: priceChartLoadedSelector(state),
    priceChart: priceChartSelector(state)
  }
}

export default connect(mapStateToProps)(PriceChart)
