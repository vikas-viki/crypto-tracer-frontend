import './styles/App.css';
import { useContext, useEffect } from 'react'
import { Context } from './context/State';
import { ContextType } from './context/types';
import Navbar from './sections/Navbar';
import CoinList from './sections/CoinList';

function App() {
  var context: ContextType = useContext(Context);

  useEffect(() => {
    console.log(context.allCoins);
  }, [context.allCoins]);

  return (
    <>
      <Navbar />
      <div className='main'>
        <div className='main-coin'>
          left
        </div>
        <div className='main-coinlist'>
          <CoinList />
          {/* Right */}
        </div>
      </div>
    </>
  )
}

export default App
