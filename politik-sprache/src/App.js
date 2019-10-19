import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

var wordtype = {}

const colors = [
  "#f38020",
  "#cac003",
  "#8cee08",
  "#4bff2d",
  "#18ee68",
  "#02c0aa",
  "#0d80e0",
  "#3641fd",
  "#7412f8",
  "#b501d3",
  "#e81298",
  "#fe4056"
]

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    fetch("/wordtype_perc.json")
      .then(res => res.json())
      .then(res => {
        const result = {}
        for (const party in res) {
          result[party] = []
          for (const year in res[party]) {
            result[party].push({ year, ...res[party][year] })

          }
        }

        console.log(result)
        this.setState({ "wordtype": result })
      })

  }
  render() {
    if (this.state.wordtype) {
      console.log(this.state.wordtype)

      return (
        <div className="App" >
          <LineChart
            width={1500}
            height={300}
            data={this.state.wordtype["CDU/CSU"]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {
              Object.keys(this.state.wordtype["CDU/CSU"][0]).map((value, index) => {
                console.log(value)
                if (value !== "year") {
                  return <Line type="monotone" dataKey={value} stroke={colors[index]} activeDot={{ r: 8 }} />

                } else {
                  return
                }
              })
            }

          </LineChart>
        </div>
      );
    } else {
      return null
    }

  }

}

export default App;
