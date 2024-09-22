import './styles/App.css';
import Navbar from './sections/Navbar';
import CoinList from './sections/CoinList';
import CoinChart from './sections/CoinChart';
import CoinDetails from './sections/CoinDetails';

function App() {

  return (
    <>
      <Navbar />
      <div className='main'>
        <div className='main-coin'>
          <CoinChart />
          <CoinDetails />
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
