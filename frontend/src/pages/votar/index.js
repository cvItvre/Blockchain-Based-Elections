/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, Fragment } from 'react';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Growl } from 'primereact/growl';
import Chart from './chart';

import './styles.css';

class votar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        canVote: false,
        hasVoted: false,
        electionID: 1,
        electionName: 'Eleição 1',
        domain: '@ufrpe.br',
        labels: ['candidate1', 'candidate2', 'candidate3', 'candidate4'],
        datasets: [
          {
            data: [100, 50, 300, 186],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#AECB56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#AECB56'],
          },
        ],
      },
      candidateSelect: 1,
      candidatesSelectItems: [
        { label: 'candidate1', value: 1 },
        { label: 'candidate2', value: 2 },
        { label: 'candidate3', value: 3 },
        { label: 'candidate4', value: 4 },
      ],
    };

    this.vote = this.vote.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  sendEmail() {
    const inputEmail = document.querySelector('#input-email');
    // enviar email e id election para backend
    const sucess = true;
    if (sucess) {
      // enviar email
      // se tudo ok, recebe um código
      this.growl.show({ severity: 'success', summary: 'Código de confirmação enviado para email' });
    } else {
      this.growl.show({ severity: 'error', summary: 'Email inválido' });
    }
  }

  verifyCode() {
    const inputCode = document.querySelector('#input-code');
    // envia codigo para backend
    const sucess = true;
    if (sucess) {
      // checa se pode votar
      // checa se já votou
      this.setState((prevState) => {
        const data = { ...prevState.data };
        data.canVote = true;
        data.hasVoted = false;
        return { data };
      });
    } else {
      this.growl.show({ severity: 'error', summary: 'Código incorreto' });
    }
  }

  vote() {
    const { candidateSelect, data } = this.state;
    console.log(`id candidate: ${candidateSelect}`);
    console.log(`id election: ${data.electionID}`);

    // enviar id candidate e id election para backend

    const sucess = true;

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
