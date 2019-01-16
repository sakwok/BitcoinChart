import axios from 'axios';
import { Line } from 'react-chartjs-2';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      bitcoinData: {},
    };
    this.getCoinDeskData = this.getCoinDeskData.bind(this);
  }

  getCoinDeskData() {
    axios.get('/bitcoin').then((res) => {
      console.log(res.data);
      this.setState({
        bitcoinData: res.data,
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getCoinDeskData();
  }

  render() {
    const { bitcoinData } = this.state;
    return (
      <div>
        <h1>Bitcoin Historical BPI Index</h1>
        <div>
          <Line id="BitCoinChart" width={1000} height={500} data={bitcoinData} options={{ maintainAspectRatio: false , responsive:false, }}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

