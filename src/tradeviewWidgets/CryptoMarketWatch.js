import React, { Component } from 'react'

export default class TechnicalAnalysis extends Component {
    constructor(props) {
        super(props)
        this._ref = React.createRef()
    }
    componentDidMount() {
        const script = document.createElement('script')
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'
        script.async = true
        script.innerHTML = JSON.stringify({
            width: '100%',
            height: '100%',
            defaultColumn: 'overview',
            screener_type: 'crypto_mkt',
            displayCurrency: 'USD',
            //colorTheme: 'dark',
            locale: 'en',
        })
        this._ref.current.appendChild(script)
    }
    render() {
        return (
            <div className='tradingview-widget-container' ref={this._ref}>
                <div className='tradingview-widget-container__widget'></div>
            </div>
        )
    }
}


// <div className="tradingview-widget-container">
//   <div id="tradingview_3800e"></div>
//   <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/BTCUSDT/?exchange=BINANCE" rel="noopener" target="_blank"><span className="blue-text">BTCUSDT Chart</span></a> by TradingView</div>
//   <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
//   <script type="text/javascript">
//   new TradingView.widget(
//   {
//   "autosize": true,
//   "symbol": "BINANCE:BTCUSDT",
//   "interval": "1",
//   "timezone": "Etc/UTC",
//   "theme": "dark",
//   "style": "2",
//   "locale": "en",
//   "toolbar_bg": "#f1f3f6",
//   "enable_publishing": false,
//   "hide_top_toolbar": true,
//   "save_image": false,
//   "container_id": "tradingview_3800e"
//   );
//   </script>
// </div>
