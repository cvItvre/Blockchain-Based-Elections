import React, {Component} from 'react';
import {Steps} from 'primereact/steps';
import "./styles.css"
import Formulario1 from './Form';
import ConfirmationForm from './confirmationForm'
import {Messages} from 'primereact/messages';

import SideBar from '../../components/sidebar';

export default class RegisterElection extends Component {



  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      electionName: '',
      domain: '',
      calendarBegin: '',
      calendarEnd: '',
      candidates: [],
    };

    this.showSuccess = this.showSuccess.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.showWarn = this.showWarn.bind(this);
    this.showError = this.showError.bind(this);
    this.clear = this.clear.bind(this);

  }

    showSuccess() {
      this.messages.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
  }

  showInfo() {
      this.messages.show({severity: 'info', summary: 'Info Message', detail: 'PrimeReact rocks'});
  }

  showWarn() {
      this.messages.show({severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'});
  }

  showError() {
      this.messages.show({severity: 'error', summary: 'Erro', detail: 'Todos os campos são obrigatórios!'});
  }

  showErrorCandidates() {
    this.messages.show({severity: 'error', summary: 'Erro', detail: 'Sete é o número máximo de candidatos!'});
  }

  showErrorCandidatesMin() {
    this.messages.show({severity: 'error', summary: 'Erro', detail: 'É preciso de no mínimo dois candidatos!'});
  }

  showErrorDate() {
    this.messages.show({severity: 'error', summary: 'Erro', detail: 'Hora de início deve ser menor que Hora de término!'});
  }

  showErrorDomain() {
    this.messages.show({severity: 'error', summary: 'Erro', detail: 'Domínio inválido!'});
  }

  invalidFormat() {
    this.messages.show({severity: 'error', summary: 'Erro', detail: 'Formato de candidato inválido!'});
  }
  clear() {
      this.messages.clear();
  }




  render() {

    this.nonEmptyValues = () => {
      let bool = false;

      if(this.state.electionName.length > 0 && this.state.domain.length > 0 && this.state.calendarBegin.toString().length > 0
      && this.state.calendarEnd.toString().length > 0 && this.state.candidates.length > 0) {
        bool = true;
      }
      return bool;
    }

    this.candidatesNotBiggerThanSeven = () => {
      let bool = false;
      if(this.state.candidates.length <= 7) {
        bool = true;
      }
      return bool;
    }

    this.atLeastTwoCandidates = () => {
      let bool = false;
      if(this.state.candidates.length >= 2) {
        bool = true;
      }
      return bool;
    }

    this.checkDomain = () => {
      let regex = /^((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return(regex.test(this.state.domain));
    }

    this.renderForm =  (_value) => {
      if(_value === 1) {
        if(!this.nonEmptyValues()) {
          this.showError();
        }
        else if(!this.candidatesNotBiggerThanSeven()) {
          this.showErrorCandidates();
        }else if(!this.atLeastTwoCandidates()) {
          this.showErrorCandidatesMin();
        }else if(!this.checkDomain()) {
          this.showErrorDomain();
        }else {
          this.setState({activeIndex: _value});
        }
      }else {
        this.setState({activeIndex: _value});
      }


    }

    this.handleElectionName = (_name) => {


      this.setState({
        electionName: _name
      });
    }

    this.handleDomainName = (_domain) => {
      this.setState({
        domain: _domain
      });
    }

    this.handleCalendarBegin = (_calendarBegin) => {
      this.setState({
        calendarBegin: _calendarBegin
      });
    }

    this.handleCalendarEnd = (_calendarEnd) => {
      this.setState({
        calendarEnd: _calendarEnd
      });
    }

    this.handleCandidates = (_candidates) => {
      if(_candidates === false) {
        // this.invalidFormat();
      }
      this.setState({
        candidates: _candidates
      });
    }

    const items = [{
        label: 'Info',
      },
      {
        label: 'Confirmação',
      }
    ];

    return (

      <main className = "main-content" >
        <section className = "steps-content">
          <SideBar />
          <h2>Cadastro de Eleição</h2>

          <Messages ref={(el) => this.messages = el} />
          <Steps className = "steps-custom" model={items} activeIndex={this.state.activeIndex} onSelect={(e) => this.renderForm(e.index)} readOnly={false} />


          {
          this.state.activeIndex === 0 &&
          < Formulario1
            onElectionName = {this.handleElectionName}
            onDomainName = {this.handleDomainName}
            onCalendarBeginChange = {this.handleCalendarBegin}
            onCalendarEndChange = {this.handleCalendarEnd}
            onCandidatesChange = {this.handleCandidates}
            electionName = {this.state.electionName}
            domain = {this.state.domain}
            calendarBegin = {this.state.calendarBegin}
            calendarEnd = {this.state.calendarEnd}
            candidates = {this.state.candidates}
            />
        }

          {
          this.state.activeIndex === 1 &&
          < ConfirmationForm
          electionName = {this.state.electionName}
          domain = {this.state.domain}
          calendarBegin = {this.state.calendarBegin}
          calendarEnd = {this.state.calendarEnd}
          candidates = {this.state.candidates}
          />
        }
        </section>
      </main>

      );
    }
  }

