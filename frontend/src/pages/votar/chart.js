/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import apiBlockchain from '../../services/apiBlockchain';

import './styles.css';

class chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
    this.updateStopwatch = this.updateStopwatch.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  componentDidMount() {
    const idInterval = setInterval(this.updateStopwatch, 1000);
    this.setState({ idInterval });
  }

  componentWillUnmount() {
    const { idInterval } = this.state;
    clearInterval(idInterval);
  }

  async updateStopwatch() {
    const { data } = this.state;
    const stopwatch = document.querySelector('.stopwatch');
    const dateNow = new Date().getTime() / 1000;
    let currentTimeOpening = data.openingTime - Math.round(dateNow);
    let currentTimeClosing = data.closingTime - Math.round(dateNow);

    if (isNaN(currentTimeOpening) || isNaN(currentTimeClosing)) return;

    if (currentTimeOpening > 0) {
      const days = parseInt(currentTimeOpening / 86400, 10);
      currentTimeOpening %= 86400;

      const hours = parseInt(currentTimeOpening / 3600, 10);
      currentTimeOpening %= 3600;

      const minutes = parseInt(currentTimeOpening / 60, 10);
      const seconds = parseInt(currentTimeOpening % 60, 10);

      stopwatch.innerHTML = `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} para iniciar a votação`;
    } else if (currentTimeClosing > 0 && currentTimeOpening <= 0) {
      const days = parseInt(currentTimeClosing / 86400, 10);
      currentTimeClosing %= 86400;

      const hours = parseInt(currentTimeClosing / 3600, 10);
      currentTimeClosing %= 3600;

      const minutes = parseInt(currentTimeClosing / 60, 10);
      const seconds = parseInt(currentTimeClosing % 60, 10);

      stopwatch.innerHTML = `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} para encerrar a votação`;
    } else if(currentTimeClosing <= 0 && currentTimeOpening <= 0) {
      const winner = await apiBlockchain.get(`/getWinner/${data.electionID}`);
      stopwatch.innerHTML = `Vencedor: ${winner.data.winner}`;
    }
  }

  render() {
    const { data } = this.state;

    return (
      <section className="chart-content">
        <Pie data={data} />
        <h1 align="center" className="stopwatch">Carregando...</h1>
      </section>
    );
  }
}

export default chart;
