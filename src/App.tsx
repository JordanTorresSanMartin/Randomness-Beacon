import React, {useState, useEffect, Fragment} from 'react';
import {OutputValue} from './interfaces';
import './App.css';
import axios, {AxiosResponse} from 'axios';

function App() {
  const [outputValueData, setOutputValueData] = useState<OutputValue[]>([]);
  const [clickedButton, setClickedButton] = useState('');

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton(outputValueData.toString());
  };


  useEffect(() => {
    axios
      .get("https://beacon.nist.gov/beacon/2.0/chain/last/pulse/last")
      .then((response: AxiosResponse) =>{
        setOutputValueData(response.data.pulse.outputValue);
      })
  })

  return (
    <div className="container">
      <div className="App">
        <header className="App-header">
            <img src="https://evoting.com/assets/images/evoting_logo.svg" className="App-logo" alt="logo" />
            <button className="App-button" onClick={buttonHandler}>Mostrar último valor</button>
            <a className="App-a">
            {clickedButton !== ""
              ? `"${clickedButton}"` 
              : ""}
            </a>
        </header>
    </div>
    </div>
  );
}

const OutputValueList: React.FC<OutputValue> = ({outputValue}) => {
  return (
      <Fragment>
          <ul>
              <li>
                <span>{outputValue}</span>
              </li>
          </ul>
      </Fragment>
  );
};

export default App;
