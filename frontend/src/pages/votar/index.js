/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, Fragment } from 'react';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Growl } from 'primereact/growl';
import Web3 from 'web3';
import Chart from './chart';
import apiBlockchain from '../../services/apiBlockchain';

import SideBar from '../../components/sidebar';

import './styles.css';

class votar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        electionName: null,
      }
    };

    this.vote = this.vote.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const election = await apiBlockchain.get(`/getElection/${id}`);
    const { labels, candidatesSelectItems, colors, data } = await this.getCandidatesLabel(election.data.electionID, election.data.candidatesCount);

    const dataState = {
      canVote: false,
      hasVoted: false,
      electionID: election.data.electionID,
      electionName: election.data.electionName,
      domain: election.data.emailDomain,
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    };

    this.setState({
      data: dataState,
      candidateSelect: 1,
      candidatesSelectItems,
    });
  }

  async getCandidatesLabel(electionID, candidateCount) {
    const labels = [];
    const candidatesSelectItems = [];
    const colors = [];
    const data = [];
    
    for (let i = 1; i <= candidateCount; i++) {
      const candidate = await apiBlockchain.get(`/getCandidate/${electionID}/${i}`);
      labels.push(candidate.data.name);
      candidatesSelectItems.push({
        label: candidate.data.name,
        value: i,
      });
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
      data.push(candidate.data.voteCount);
    }
    return { labels, candidatesSelectItems, colors, data };
  } 

  async sendEmail() {
    try {
      const { data } = this.state;
      const inputEmail = document.querySelector('#input-email');
      const email = inputEmail.value;
      // obtem dados eleicao
      const election = await apiBlockchain.get(`/getElection/${ data.electionID }`);
      const domain = election.data.emailDomain;

      let dataPost = {
        email,
        domain,
      };
      // valida email
      const validation = await apiBlockchain.post('/validationEmail', dataPost);
      const { sucess } = validation.data;
      if (sucess) {
        dataPost = {
          email,
        };
        // enviar email
        await apiBlockchain.post('/sendEmail', dataPost);
        localStorage.setItem('email', email);
        // se tudo ok, recebe um código
        this.growl.show({ severity: 'success', summary: 'Código de confirmação enviado para email' });
      } else {
        this.growl.show({ severity: 'error', summary: 'Email inválido' });
      }
    } catch (e) {
      this.growl.show({ severity: 'error', summary: 'Email inválido' });
    }
  }

  async verifyCode() {
    try {
      const { data } = this.state;
      const web3 = new Web3(Web3.givenProvider);

      const inputCode = document.querySelector('#input-code');
      const code = inputCode.value;
      const email = localStorage.getItem('email');

      let dataPost = {
        code,
        email,
      };

      if (Web3.givenProvider !== null) {
        // envia codigo para backend
        const validation = await apiBlockchain.post('/validationCode', dataPost);
        const { sucess } = validation.data;
        
        if (sucess) {
          await Web3.givenProvider.enable();
          web3.eth.getAccounts(async (error, accounts) => {
            // enviar id candidate e id election para backend
            dataPost = {
              ownerAddress: accounts[0],
              voter: {
                electionID: data.electionID,
                email,
              },
            };

            // envia requisicao de direito de voto
            await apiBlockchain.post('/giveRightToVote', dataPost);
            // checa se pode votar
            const canVoteResult = await apiBlockchain.get(`/canVote/${data.electionID}/${email}`);
            const { canVote } = canVoteResult.data;
            // checa se já votou
            const hasVotedResult = await apiBlockchain.get(`/hasVoted/${data.electionID}/${email}`);
            const { hasVoted } = hasVotedResult.data;
            console.log(canVote, hasVoted);
            this.setState((prevState) => {
              const newData = { ...prevState.data };
              newData.canVote = canVote;
              newData.hasVoted = hasVoted;
              return { data: newData };
            });
          });
        } else {
          this.growl.show({ severity: 'error', summary: 'Código incorreto' });
        }
      } else {
        this.growl.show({ severity: 'error', summary: 'É preciso estar conectado ao MetaMask para prosseguir' });
      }
    } catch (e) {
      this.growl.show({ severity: 'error', summary: 'Código incorreto' });
    }
  }

  async vote() {
    try {
      const { candidateSelect, data } = this.state;
      const web3 = new Web3(Web3.givenProvider);

      if (Web3.givenProvider !== null) {
        await Web3.givenProvider.enable();
        web3.eth.getAccounts(async (error, accounts) => {
          // enviar id candidate e id election para backend
          const dataPost = {
            ownerAddress: accounts[0],
            voteData: {
              electionID: data.electionID,
              candidateID: candidateSelect,
            },
          };
          const validation = await apiBlockchain.post('/vote', dataPost);
          const { sucess } = validation.data;
          if (sucess) {
            this.growl.show({ severity: 'success', summary: 'Voto concluído' });
            // checa se já votou
            this.setState((prevState) => {
              const newData = { ...prevState.data };
              newData.hasVoted = true;
              return { data: newData };
            });
          } else {
            this.growl.show({ severity: 'error', summary: 'Erro ao votar' });
          }
        });
      } else {
        this.growl.show({ severity: 'error', summary: 'É preciso estar conectado ao MetaMask para prosseguir' });
      }
    } catch (e) {
      this.growl.show({ severity: 'error', summary: 'Erro ao votar' });
    }
  }

  componentValidationEmail() {
    const { data } = this.state;

    return (
      <Fragment>
        <section className="input-content">
          <span className="p-float-label">
            <InputText id="input-email" data-domain={data.domain} />
            <label className="lb-input" htmlFor="input-email">
              Email
            </label>
            <span className="domain-input-send">{data.domain}</span>
            <button type="button" className="bt-input-send" onClick={this.sendEmail}>
              Enviar
            </button>
          </span>
        </section>

        <section className="input-content">
          <span className="p-float-label">
            <InputText id="input-code" />
            <label className="lb-input" htmlFor="input-code">
              Code
            </label>
            <button type="button" className="bt-input-code" onClick={this.verifyCode}>
              Verificar
            </button>
          </span>
        </section>
      </Fragment>
    );
  }

  componentVoteCandidate() {
    const { data, candidatesSelectItems, candidateSelect } = this.state;
    return (
      <Fragment>
        <section className="vote-content">
          {data.hasVoted ? (
            <h2>Você já votou</h2>
          ) : (
            <Fragment>
              <SelectButton
                id="vote-select"
                value={candidateSelect}
                options={candidatesSelectItems}
                onChange={e => this.setState({ candidateSelect: e.value })}
              />
              <button className="bt-vote" type="button" onClick={this.vote}>
                Votar!
              </button>
            </Fragment>
          )}
        </section>
      </Fragment>
    );
  }

  render() {
    // dados estaticos
    const { data } = this.state;

    return (
      <main className="main-content">
        <SideBar />
        <Growl
          ref={(el) => {
            this.growl = el;
          }}
        />
        <h1>{data.electionName}</h1>
        <Chart data={data} />

        {data.canVote ? this.componentVoteCandidate() : this.componentValidationEmail()}
      </main>
    );
  }
}

export default votar;
