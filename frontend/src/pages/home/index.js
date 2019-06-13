import React, { Component } from 'react';

import { Chart } from 'primereact/chart';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

import './styles.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      elections: [],
    };
  }

  loadElections() {
    this.setState((props, prevSate) => ({
      elections: [
        {
          id: 0,
          electionName: 'Eleição Nacional',
          data: [
            {
              title: 'Bolsonaro',
              value: 54,
              color: '#FF6384',
            },
            {
              title: 'Haddad',
              value: 47,
              color: '#36A2EB',
            },
            {
              title: 'Ciro',
              value: 10,
              color: '#FFCE56',
            },
          ],
        },
        {
          id: 1,
          electionName: 'Eleição Reitoria',
          data: [
            {
              title: 'Marcelo Carneiro',
              value: 87,
              color: '#FF6384',
            },
            {
              title: 'Atual reitora',
              value: 10,
              color: '#36A2EB',
            },
            {
              title: 'Guimarães Rosa',
              value: 3,
              color: '#FFCE56',
            },
          ],
        },
        {
          id: 2,
          electionName: 'Eleição Coordenação BCC',
          data: [
            {
              title: 'Julian',
              value: 34,
              color: '#FF6384',
            },
            {
              title: 'Maurice',
              value: 12,
              color: '#36A2EB',
            },
            {
              title: 'Alex',
              value: 20,
              color: '#FFCE56',
            },
          ],
        },
        {
          id: 3,
          electionName: 'Eleição DM',
          data: [
            {
              title: 'Glória',
              value: 10,
              color: '#FF6384',
            },
            {
              title: 'Melman',
              value: 20,
              color: '#36A2EB',
            },
            {
              title: 'Marty',
              value: 50,
              color: '#FFCE56',
            },
          ],
        },
      ],
    }));
  }

  componentDidMount() {
    this.loadElections();
  }

  render() {
    const { elections } = this.state;

    const data = [
      {
        title: 'Bolsonaro',
        value: 10,
        color: '#FF6384',
      },
      {
        title: 'Bolsonaro',
        value: 10,
        color: '#36A2EB',
      },
      {
        title: 'Bolsonaro',
        value: 10,
        color: '#FFCE56',
      },
    ];

    return (
      <div className="home-content">
        {elections.map(election => (
          <section key={election.id} className="election-description">
            <strong>{election.electionName}</strong>
            {/* <Chart type="doughnut" data={election.data} width="35%" height="35%" /> */}
            <ReactMinimalPieChart
              data={election.data}
              style={{
                width: '40%',
                height: '50%',
                marginLeft: '5%',
              }}
              animate
              lineWidth={40}
            />
            <ul>
              <li>
                <div style={{ background: election.data[0].color }} />
                {election.data[0].title}
              </li>
              <li>
                <div style={{ background: election.data[1].color }} />
                {election.data[1].title}
              </li>
              <li>
                <div style={{ background: election.data[2].color }} />
                {election.data[2].title}
              </li>
            </ul>
          </section>
        ))}
      </div>
    );

    // console.log(this.state);

    // if (this.state.elections.length === 0) return '';

    // console.log(this.state.elections[0].data);
    // return <Chart type="pie" data={this.state.elections[0].data} />;
  }
}
