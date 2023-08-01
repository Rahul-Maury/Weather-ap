import './App.css';
// import CurrentLocation from './CurrentLocation.js'
import Current from './Current';

function App() {
  return (
   <>
    <div className='container'> 
   {/* <CurrentLocation/> */}
   <Current/>
 
    </div>
    <div className='footer-info'>
   <a href='#github'>  <span className='footer__copy'>&#169; Rahul Maurya. All rights reserved</span></a>
    </div>
   
   </>
  );
}

export default App;
