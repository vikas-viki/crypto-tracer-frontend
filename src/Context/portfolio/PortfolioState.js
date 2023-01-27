import React from 'react';
import portContext from './portfolioContext';

const PortfolioState = (props) => {
    const hello = "hello wrold";
  return (
    <portContext.Provider value={{hello}}>
        {props.children}
    </portContext.Provider>
  )
}

export default PortfolioState