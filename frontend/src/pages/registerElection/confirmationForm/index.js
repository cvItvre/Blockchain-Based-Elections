import React, { Component } from 'react';
import moment from 'moment';
import Web3 from 'web3';
import { Redirect } from 'react-router-dom';
import { Messages } from 'primereact/messages';
import { Growl } from 'primereact/growl';
import { ProgressBar } from 'primereact/progressbar';
import apiBlockchain from '../../../services/apiBlockchain';
import './styles.css';


export default class ConfirmationForm extends Component {
  constructor(props) {
    super(props);
      this.state = {
        loading: false,
        redirect: false,
        from: '',
        electionName: this.props.electionName,
        domain: this.props.domain,
        calendarBegin: this.props.calendarBegin,
        calendarEnd: this.props.calendarEnd,
        candidates: this.props.candidates,
        metamaskAddr: ""
      };

      this.factoryJson = this.factoryJson.bind(this);
      this.factoryJsonCandidate = this.factoryJsonCandidate.bind(this);


  }

  factoryJson () {
    const date1 = `${this.state.calendarBegin.getFullYear()}.${this.state.calendarBegin.getMonth()+1}.${this.state.calendarBegin.getDate()} ${this.state.calendarBegin.getHours()}:${this.state.calendarBegin.getMinutes()}`;
    const date2 = `${this.state.calendarEnd.getFullYear()}.${this.state.calendarEnd.getMonth()+1}.${this.state.calendarEnd.getDate()} ${this.state.calendarEnd.getHours()}:${this.state.calendarEnd.getMinutes()}`;
    const mom1 = moment(date1, 'YYYY.MM.DD HH:mm').unix();
    const mom2 = moment(date2, 'YYYY.MM.DD HH:mm').unix();
    const obj = {
      ownerAddress: this.state.metamaskAddr,
      election :{
      name: this.state.electionName,
      domain: '@'+this.state.domain,
      opening: mom1,
      closing: mom2
      }
    }
    console.log(obj);
    return obj;
  }

  factoryJsonCandidate (candidateName, numberToVote, electionId) {
    const obj = {
      ownerAddress: this.state.metamaskAddr,
      candidate: {
        electionID: electionId,
        name: candidateName,
        number: numberToVote,
      },
    };

    return obj;
  }

  render() {

    this.confirmarCadastro =  async () => {
      const web3 = new Web3(Web3.givenProvider);
      let currentAccount;
      const onMetaMask = this.onMetamaskAddr;
      const state = this.state;
      const facJson = this.factoryJson;
      const cadastrarEleicao = this.cadastrarEleicao;

      if(Web3.givenProvider === null) {
        this.messages.show({
          severity: 'info',
          summary: 'Aviso',
          detail: 'É preciso estar conectado ao metamask para prosseguir'
        })
      }else {
        (async function getCurrentAccount(){
          await Web3.givenProvider.enable()

          web3.eth.getAccounts((err, accounts) => {
            currentAccount = accounts
            state.metamaskAddr = currentAccount[0];
            cadastrarEleicao(facJson());
          })


        })()
      }

    }

    this.cadastrarEleicao = async jsonEleicao => {
      this.setState({ loading: true });
      const factoryCandidate = this.factoryJsonCandidate;
      await apiBlockchain.post('/createElection', jsonEleicao).then(
        response => {
          const {electionID} = response.data;
          const {candidates} = this.state;

          candidates.map(string => {
            const match = (/^(.+?)\((\d+)\)$/gi).exec(string);
            const name = match[1].trim();
            const number = parseInt(match[2], 10);

            this.cadastrarCandidatos(factoryCandidate(name, number, electionID));
          })

          this.growl.show({ severity: 'success', summary: 'Eleição cadastrada com sucesso! Redirecionando...' });
          setTimeout(() => {
            this.setState({ redirect: true, from: `/vote/${electionID}` });
          }, 2000);
        }).catch(error => {
          if(!error.response) {
            this.messages.show({
              severity: 'info',
              summary: 'Erro',
              detail: 'Não foi possível acessar o servidor, tente novamente mais tarde.'
            })
        }else {
          this.messages.show({
            severity: 'info',
            summary: 'Erro',
            detail: 'Não foi possível cadastrar a eleição verifique se os dados estão corretos, ou se você tem o direito de cadastrar.'
          })
        }
      })

    }

    this.isNumber = (num) => { //deve ter alguma função primitiva pra isso, mas como eu to sem paciencia vai assim mesmo.
      let bool = false;
      for(let i = 0; i < 10; i++) {
        if(num == i) { // sim a comparação deve ser feita com '==';
          bool = true;
          break;
        }
      }

      return bool;
    }

    this.cadastrarCandidatos = async (json) => {
      const status = await apiBlockchain.post('/addCandidate', json).catch(() => {
        this.growl.show({ severity: 'error', summary: 'Erro ao cadastrar candidatos' });
      });
    }

    const nomeEleicao = this.state.electionName;
    const dominio = this.state.domain === '' ? this.state.domain : '@'+this.state.domain;
    const calendarIni = this.state.calendarBegin;
    const calendarFim = this.state.calendarEnd;
    const candidatos = this.state.candidates;
    const redirect = this.state.redirect;
    const from = this.state.from;
    const loading = this.state.loading;

    const date1 = `${this.state.calendarBegin.getFullYear()}.${this.state.calendarBegin.getMonth()+1}.${this.state.calendarBegin.getDate()} ${this.state.calendarBegin.getHours()}:${this.state.calendarBegin.getMinutes()}`;
    const date2 = `${this.state.calendarEnd.getFullYear()}.${this.state.calendarEnd.getMonth()+1}.${this.state.calendarEnd.getDate()} ${this.state.calendarEnd.getHours()}:${this.state.calendarEnd.getMinutes()}`;
    moment.locale('pt-BR');
    const convertDate1 = moment(date1).format('LLLL');
    const convertDate2 = moment(date2).format('LLLL');

    if (redirect) return <Redirect to={from} />;

    return(

      <span className="main-form" >
        <Growl
          ref={(el) => {
            this.growl = el;
          }}
        />

        <h1>Nome da Eleição</h1>
        <h2>{nomeEleicao}</h2>
        <br/>

        <h1>Domínio</h1>
        <h2>{dominio}</h2>
        <br/>

        <h1>Data e Hora de início</h1>
        <h2>{convertDate1.toString()}</h2>
        <br/>

        <h1>Data e Hora de fim</h1>
        <h2>{convertDate2.toString()}</h2>
        <br/>

        <h1>Candidatos</h1>
        {
          candidatos.map(
            (cand, index) => <h2 key={index} >{cand.toString()}</h2>
          )
        }

        {
          loading ?
            <ProgressBar className="progressbar-confirm" style={{ height: 5 }} mode="indeterminate" />
          :
            <button type="button" className="bt-input-confirm" onClick={this.confirmarCadastro}>Cadastrar</button>
        }
        <Messages ref={(el) => this.messages = el} />

      </span>
    );
  }
}
