import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Select from 'react-select';

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
    this.state = { "party": "CDU/CSU" }
  }
  componentDidMount() {
    this.fetch_for_graph("/wordtype_perc.json", "wordtype")
    this.fetch_for_graph("/vad.json", "vad")
  }

  fetch_for_graph(url, varname) {
    fetch(url)
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
        this.setState({ [varname]: result })
      })
  }
  handle_party_change(party) {
    this.setState(({ "party": party.value }));
  }
  plotter(varname) {
    if (this.state[varname]) {
      console.log(this.state[varname][this.state.party])
      return (

        <LineChart
          width={1000}
          height={500}
          data={this.state[varname][this.state.party]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {
            Object.keys(this.state[varname][this.state.party][0]).map((value, index) => {
              console.log(value)
              if (value !== "year") {
                return <Line type="monotone" dataKey={value} stroke={colors[index]} activeDot={{ r: 8 }} />

              } else {
                return
              }
            })
          }

        </LineChart>)

    } else {
      return null
    }
  }
  render() {

    console.log(this.state.wordtype)

    return (
      <div className="App" >
        <h1>Sprachpolitik</h1>
        <Select
          className="select"
          classNamePrefix="select"
          value={{ label: this.state.party, value: this.state.party }}
          onChange={this.handle_party_change.bind(this)}
          options={[{ label: "CDU/CSU", value: "CDU/CSU" }, { label: "SPD", value: "SPD" }, { label: "GRÜNE", value: "GRÜNE" }, { label: "AfD", value: "AfD" }, { label: "DIE LINKE", value: "DIE LINKE" }, { label: "NPD", value: "NPD" }]}
        />
        {this.plotter("vad")}
      </div>
    );
  }

}



export default App;
