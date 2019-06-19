import React, { Component } from 'react';

import SideBar from '../../components/sidebar';

import { InputText } from 'primereact/inputtext';

import ReactMinimalPieChart from 'react-minimal-pie-chart';

import './styles.css';

const NUMBER_OF_ELECTIONS_PER_PAGE = 4;

export default class Home extends Component {
  
  constructor() {
    super();
    this.state = {
      elections: [],
      actualPageElections: [],
      previousPageElections: [],
      nextPageElections: [],
      pageNumber: 1
    };

    this.nextElections = this.nextElections.bind(this);
    this.previousElections = this.previousElections.bind(this);
  }
  
  fetchAllElections() {
    this.loadElections();
  }

  searchElections() {
    let expression = document.getElementById('home-search-input').value;

    console.log('search: ' + expression);
    // TODO consume API to search for elections
  }

  async nextElections() {
    let { elections, previousPageElections, nextPageElections, actualPageElections, pageNumber } = this.state;

    if(this.thereIsNotNextPage()) {
      // console.log('There is not next page');
      return;
    }

    // console.log(this.state);
    
    previousPageElections = actualPageElections;
    actualPageElections = nextPageElections;
    nextPageElections = [];
    
    pageNumber++;

    let index = pageNumber * NUMBER_OF_ELECTIONS_PER_PAGE;
    let indexEnd = index + 4;

    for( ;index < indexEnd; index++ ) {
      nextPageElections.push(elections[index]);
    }

    await this.setState({
      previousPageElections,
      actualPageElections,
      nextPageElections,
      pageNumber
    });

    // console.log(this.state);
  }
 
  async previousElections() {
    let { elections, previousPageElections, nextPageElections, actualPageElections, pageNumber } = this.state;

    if(this.thereIsNotPreviousPage()) {
      // console.log('There is not previous page');
      return;
    }

    // console.log(this.state);
    
    nextPageElections = actualPageElections;
    actualPageElections = previousPageElections;
    previousPageElections = [];
    
    pageNumber--;
    
    let index = (pageNumber-2) * NUMBER_OF_ELECTIONS_PER_PAGE;
    let indexEnd = index + 4;

    // console.log(index, pageNumber);

    for( ;index < indexEnd; index++ ) {
      previousPageElections.push(elections[index]);
    }


    await this.setState({
      previousPageElections,
      actualPageElections,
      nextPageElections,
      pageNumber
    });

    console.log(this.state);
  }
  
  thereIsNotNextPage() {
    const {elections, pageNumber } = this.state;

    return pageNumber >= Math.ceil(elections.length / NUMBER_OF_ELECTIONS_PER_PAGE);
  }

  thereIsNotPreviousPage() {
    return this.state.pageNumber <= 1;
  }

  async loadElections() {
    await this.setState({
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
        {
          id: 4,
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
          id: 5,
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
          id: 6,
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
          id: 7,
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
        {
          id: 8,
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
          id: 9,
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
          id: 10,
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
          id: 11,
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
    });
  }

  async componentDidMount() {
    await this.fetchAllElections();
    const { elections } = this.state;

    let actualPageElections = [];
    actualPageElections.push(elections[0]);
    actualPageElections.push(elections[1]);
    actualPageElections.push(elections[2]);
    actualPageElections.push(elections[3]);

    let nextPageElections = [];
    nextPageElections.push(elections[4]);
    nextPageElections.push(elections[5]);
    nextPageElections.push(elections[6]);
    nextPageElections.push(elections[7]);

    this.setState({
      actualPageElections,
      nextPageElections
    });
  }

  render() {
    const { elections, actualPageElections } = this.state;

    return (

      <div className="home-wrapper">
        <SideBar />
        <span className="p-float-label">
          <InputText id="home-search-input" />
          <label className="lb-input" htmlFor="home-search-input">Search for Election</label>
          <button className="bt-input-send" onClick={this.searchElections}>
              Search
          </button>
        </span>
        <section className="home-content">
          {actualPageElections.map(election => (
            <section key={election.id} className="election-description">
              <strong>{election.electionName} - {election.id}</strong>
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
        </section>
        <section className="home-navigation">
          <button className="bt-input-send" onClick={this.previousElections}>
                Previous
          </button>
          <button className="bt-input-send" onClick={this.nextElections}>
                Next
          </button>
        </section>
      </div>
    );

    // console.log(this.state);

    // if (this.state.elections.length === 0) return '';

    // console.log(this.state.elections[0].data);
    // return <Chart type="pie" data={this.state.elections[0].data} />;
  }
}
