import './App.css';
import Detail from './detail';
import Movies from './movies';
import { useHistory } from './useHistory';


function App(props) {
   const location = useHistory();
   console.log(location);
  // const location = props.location;
  const GetComponent = () => {
    if (location.pathname === '/') {
      return <Movies />;
    } else if (location.pathname.match('(detail)')) {
      return <Detail params={location}/>;
    } else {
      return <>Not found</>;  
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
       <GetComponent></GetComponent>
      </div>
      </header>
    </div>
  );
}

export default App;
