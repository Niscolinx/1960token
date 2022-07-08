import React from 'react'
import CryptoMarket from '../../tradeviewWidgets/CryptoMarketWatch'


function trade() {
    return (
        <div className='h-[90vh]'>
            trade
            <div className='tradingview-widget-container'>
                <div id='tradingview_3800e' />
                <div className='tradingview-widget-copyright'>
                    <a
                        href='https://www.tradingview.com/
  symbols/BTCUSDT/?exchange=BINANCE'
                        rel='noopener'
                        target='_blank'
                    >
                        <span className='blue-text'>BTCUSDT Chart</span>
                    </a>{' '}
                    by TradingView
                </div>
            </div>{' '}
        </div>
    )
}

export default trade
