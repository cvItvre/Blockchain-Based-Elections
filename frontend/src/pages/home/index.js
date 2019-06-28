/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import SideBar from '../../components/sidebar';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Growl } from 'primereact/growl';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import './styles.css';
import apiBlockchain from '../../services/apiBlockchain';
const NUMBER_OF_ELECTIONS_PER_PAGE = 4;
const FACTOR_MULTIPLICATION = 25;
const FACTOR_DIFFERENCE_COLOR = 40;

/* eslint-disable */

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      electionFounds: [],
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
    this.searchElections = this.searchElections.bind(this);
    this.resetElections = this.resetElections.bind(this);
    this.swapCandidates = this.swapCandidates.bind(this);
    this.sortDecreasingCandidatesOrder = this.sortDecreasingCandidatesOrder.bind(this);
  }

  swapCandidates(candidates, i, k) {
    let aux = candidates[k];
    candidates[k] = candidates[i];
    candidates[i] = aux;
  }

  sortDecreasingCandidatesOrder(candidates) {
    for(let k = 0; k < candidates.length; k++) {
      for(let i = k + 1; i < candidates.length; i++) {

        if(candidates[i].voteCount > candidates[k].voteCount)
          this.swapCandidates(candidates, i, k);

      }
    }

    return candidates;
  }

  async fetchAllElections() {
    const allElections = await apiBlockchain.get('/getElections');
    const electionCount = await apiBlockchain.get('/getCountElections');

    const elections = await this.formatElection(allElections.data);

    this.setState({
      elections,
      electionCount: electionCount.data.countElection,
    });
  }

  async formatElection(allElections) {
    const elections = [];

    for (let i = 0; i < allElections.length; i++) {
      const candidates = await this.getCandidates(allElections[i]);

      const formatedElection = {
        id: allElections[i].electionID - 1,
        electionName: allElections[i].electionName,
        data: candidates,
      };

      elections.push(formatedElection);
    }

    return elections;
  }

  async getCandidates({ electionID, candidatesCount }) {
    const candidates = [];
    let candidatesList = await apiBlockchain.get(`/getCandidates/${electionID}`);
    const haveVote = false;

    let red = Math.floor(Math.random() * 150);
    let green = Math.floor(Math.random() * 150);
    let blue = Math.floor(Math.random() * 150);

    candidatesList.data = this.sortDecreasingCandidatesOrder(candidatesList.data);

    if(candidatesList.data.length > 3) {
      
      red = (red + FACTOR_DIFFERENCE_COLOR) % 150;
      green = (green + FACTOR_DIFFERENCE_COLOR) % 150;
      blue = (blue + FACTOR_DIFFERENCE_COLOR) % 150;
      let candidate = candidatesList.data[0];
      candidates.push({
        title: candidate.name,
        value: candidate.voteCount*FACTOR_MULTIPLICATION || 1,
        color: `rgb(${red}, ${green}, ${blue})`
      });

      red = (red + FACTOR_DIFFERENCE_COLOR) % 150;
      green = (green + FACTOR_DIFFERENCE_COLOR) % 50;
      blue = (blue + FACTOR_DIFFERENCE_COLOR) % 150;
      candidate = candidatesList.data[1];
      candidates.push({
        title: candidate.name,
        value: candidate.voteCount*FACTOR_MULTIPLICATION || 1,
        color: `rgb(${red}, ${green}, ${blue})`
      });

      red = (red + FACTOR_DIFFERENCE_COLOR) % 150;
      green = (green + FACTOR_DIFFERENCE_COLOR) % 50;
      blue = (blue + FACTOR_DIFFERENCE_COLOR) % 150;
      let totalOthersVoteCount = candidatesList.data.slice(2).reduce( (sum, candidate) => (Number(sum) + Number(candidate.voteCount)), 0 );
      candidates.push({
        title: "Outros",
        value: totalOthersVoteCount*FACTOR_MULTIPLICATION || 1,
        // color: `rgb(${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 250)})`
        color: "rgb(0,200,0)"
      });
    
    } else {

      candidatesList.data.map((candidate) => {
        red = (red + FACTOR_DIFFERENCE_COLOR) % 150;
        green = (green + FACTOR_DIFFERENCE_COLOR) % 50;
        blue = (blue + FACTOR_DIFFERENCE_COLOR) % 150;
        candidates.push({
          title: candidate.name,
          value: candidate.voteCount*FACTOR_MULTIPLICATION || 1,
          color: `rgb(${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 250)})`
        });
      });
    
    }

    return candidates;
  }

  async searchElections() {
    const search = document.getElementById('home-search-input').value;

    if (search.trim() !== '') {
      const electionFounds = await apiBlockchain.post('/searchElection', { search });

      if (electionFounds.data.length === 0) {
        this.growl.show({ severity: 'info', summary: 'Nenhuma votação encontrada!' });
      } else {
        const elections = await this.formatElection(electionFounds.data);
        this.setState({ electionFounds: elections });
      }
    }
  }

  resetElections() {
    const search = document.getElementById('home-search-input');
    search.value = '';
    this.setState({ electionFounds: [] });
  }

  async nextElections() {
    let { elections, previousPageElections, nextPageElections, actualPageElections, pageNumber } = this.state;

    if(this.thereIsNotNextPage()) {
      return;
    }

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
  }

  async previousElections() {
    let { elections, previousPageElections, nextPageElections, actualPageElections, pageNumber } = this.state;

    if(this.thereIsNotPreviousPage()) {
      return;
    }

    nextPageElections = actualPageElections;
    actualPageElections = previousPageElections;
    previousPageElections = [];

    pageNumber--;

    let index = (pageNumber-2) * NUMBER_OF_ELECTIONS_PER_PAGE;
    let indexEnd = index + 4;

    for( ;index < indexEnd; index++ ) {
      previousPageElections.push(elections[index]);
    }


    await this.setState({
      previousPageElections,
      actualPageElections,
      nextPageElections,
      pageNumber
    });
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

    const nextPageElections = [];
    for (let i = 4; i < 8 && i < electionCount; i++) {
      nextPageElections.push(elections[i]);
    }

    this.setState({
      actualPageElections,
      nextPageElections,
    });
  }

  render() {
    const { actualPageElections, electionFounds } = this.state;
    const ElectionsShows = electionFounds.length > 0 ? electionFounds : actualPageElections;

    return (
      <div className="home-wrapper">
      <SideBar />
      <Growl
          ref={(el) => {
            this.growl = el;
          }}
        />
      <span className="p-float-label">
        <InputText id="home-search-input" />
        <label className="lb-input" htmlFor="home-search-input">Buscar Votação</label>
        <button className="bt-input-send" onClick={this.searchElections}>
            Buscar
        </button>
        <button className="bt-input-reset" onClick={this.resetElections}>
            Limpar
        </button>
      </span>
      <section className="home-content">
        {ElectionsShows.map(election => (
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
                  paddingAngle={1}
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
