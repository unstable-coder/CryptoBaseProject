import React, { useEffect, useRef } from 'react';

const TradingViewComponent = () => {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    scriptRef.current = document.createElement('script');
    scriptRef.current.type = 'text/javascript';
    scriptRef.current.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    scriptRef.current.async = true;
    scriptRef.current.innerHTML = JSON.stringify({
      width: '100%',
      height: 400,
      symbolsGroups: [
        {
          name: 'Indices',
          originalName: 'Indices',
          symbols: [
            { name: 'BINANCE:BTCUSDT' },
            { name: 'BINANCE:XRPUSDT' },
            { name: 'BITSTAMP:LTCUSD' },
            { name: 'BITSTAMP:ETHUSD' },
            { name: 'BINANCE:SOLUSDT' },
            { name: 'BTSE:DOGUSD' }
          ]
        }
      ],
      showSymbolLogo: true,
      colorTheme: 'dark',
      isTransparent: false,
      locale: 'in'
    });

    const container = containerRef.current;
    container.innerHTML = '';  // Clear existing content
    container.appendChild(scriptRef.current);

    return () => {
      // Cleanup: Remove the script when the component is unmounted
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" ref={containerRef}></div>
      <div className="tradingview-widget-copyright">
        <a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank"></a>
      </div>
    </div>
  );
};

export default TradingViewComponent;