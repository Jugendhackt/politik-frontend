import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart } from "react-chartkick";
import 'chart.js'
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
    this.charts = []
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
          var data = {}

          for (const year in res[party]) {
            let i = 0;
            for (const wordtype in res[party][year]) {


              if (!(i in result[party])) {
                result[party][i] = {}
              }
              if (!("data" in result[party][i])) {
                result[party][i]["data"] = {}
              }
              if (!(year in result[party][i]["data"])) {
                result[party][i]["data"][year] = {}
              }
              // data[wordtype][year] = (res[party][year][wordtype]);
              result[party][i]["name"] = wordtype;
              result[party][i]["data"][year] = res[party][year][wordtype]
              i++;

            }

            console.log(result)
          }

        }
        // console.log(result)
        this.setState({ [varname]: result })
      })
  }
  handle_party_change(party) {
    this.setState(({ "party": party.value }));
    this.forceUpdate();
    for (const chart of this.charts) {
      chart.forceUpdate();
    }
  }
  plotter(varname) {

    if (this.state[varname]) {
      return (
        <LineChart data={this.state[varname][this.state.party]} curve={false} />
      )

    } else {
      return null
    }
  }
  render() {
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
        {this.plotter("wordtype")}
      </div>
    );
  }

}



export default App;
