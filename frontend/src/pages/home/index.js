/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import './styles.css';
import apiBlockchain from '../../services/apiBlockchain';
const NUMBER_OF_ELECTIONS_PER_PAGE = 4;

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      elections: [],
      electionCount: 0,
      actualPageElections: [],
      previousPageElections: [],
      nextPageElections: [],
      pageNumber: 1,
    };

    this.nextElections = this.nextElections.bind(this);
    this.previousElections = this.previousElections.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async fetchAllElections() {
    const allElections = await apiBlockchain.get('/getElections');
    const elections = [];
    const electionCount = await apiBlockchain.get('/getCountElections');

    for (let i = 0; i < allElections.data.length; i++) {
      const candidates = await this.getCandidates(allElections.data[i]);

      const formatedElection = {
        id: allElections.data[i].electionID - 1,
        electionName: allElections.data[i].electionName,
        data: candidates,
      };

      elections.push(formatedElection);
    }

    this.setState({
      elections,
      electionCount: electionCount.data.countElection,
    });
  }

  async getCandidates({ electionID, candidatesCount }) {
    const candidates = [];
    const candidatesList = await apiBlockchain.get(`/getCandidates/${electionID}`);
    const haveVote = false;

    candidatesList.data.map((candidate) => {
      candidates.push({
        title: candidate.name,
        value: candidate.voteCount || 1,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      });
    });

    return candidates;
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

    for( ;index < indexEnd && index < elections.length; index++ ) {
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

    console.log(index, indexEnd);

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

  async componentDidMount() {
    await this.fetchAllElections();

    const { elections, electionCount } = this.state;

    const actualPageElections = [];
    for (let i = 0; i < 4 && i < electionCount; i++) {
      actualPageElections.push(elections[i]);
    }

    let nextPageElections = [];
    for (let i = 4; i < 8 && i < electionCount; i++) {
      nextPageElections.push(elections[i]);
    }

    this.setState({
      actualPageElections,
      nextPageElections,
    });
  }

  render() {
    const { actualPageElections } = this.state;

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
        {actualPageElections.length > 0 &&
          actualPageElections.map(election => (
            <Link key={election.id} to={`/vote/${election.id + 1}`}>
              <section key={election.id} className="election-description">
                <strong>{election.electionName}</strong>
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
                  {election.data.map((candidate, index) => {
                    return (<li key={index}>
                      <div style={{ background:candidate.color }} />
                      {candidate.title}
                    </li>)
                  })}
                </ul>
              </section>
            </Link>
          ))
        }
      </section>
      <section className="home-navigation">
        <button className="bt-input-send" onClick={this.previousElections}>
              Anterior
        </button>
        <button className="bt-input-send" onClick={this.nextElections}>
              Próximo
        </button>
      </section>
      </div>
    );
  }
}
