import React, {Component} from 'react';
import {Steps} from 'primereact/steps';
import {Growl} from "primereact/growl";
import "./styles.css"
import Formulario1 from '../Forms/Form';
import ConfirmationForm from '../Forms/confirmationForm'

export default class RegisterElection extends Component {


  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      electionName: '',
      domain: '',
      calendarBegin: '',
      calendarEnd: '',
      candidates: []
    };

  }




  render() {
    this.handleElectionName = (_name) => {
      this.setState({
        electionName: _name
      });
      console.log("Election " + this.state.electionName)
    }

    this.handleDomainName = (_domain) => {
      this.setState({
        domain: _domain
      });
      console.log("domain " + this.state.domain)
    }

    this.handleCalendarBegin = (_calendarBegin) => {
      this.setState({
        calendarBegin: _calendarBegin
      });
      console.log("calendarBegin " + this.state.calendarBegin)
    }

    this.handleCalendarEnd = (_calendarEnd) => {
      this.setState({
        calendarEnd: _calendarEnd
      });
      console.log("calendarEnd " + this.state.calendarEnd)
    }

    this.handleCandidates = (_candidates) => {
      this.setState({
        candidates: _candidates
      });
      console.log("Candidates " + this.state.candidates)
    }

    const items = [{
        label: 'Info',
        command: (event) => {
          // this.growl.show({severity:'info', summary:'Informações gerais', detail: event.item.label});
        }
      },
      {
        label: 'Confirmação',
        command: (event) => {
          // this.growl.show({severity:'info', summary:'Cadastro de eleitores', detail: event.item.label});
        }
      }
    ];

    return ( 
      <main className = "main-content" >
        <h2> Cadastro de Eleição </h2> 
        <section className = "steps-content">
      

          <Growl ref = {(el) => {this.growl = el}}> </Growl> 
      
          <Steps className = "steps-custom" model={items} activeIndex={this.state.activeIndex} onSelect={(e) => this.setState({activeIndex: e.index})} readOnly={false} />
      

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

        { console.log(this.state.domain)}
        </section>
      </main>

      );
    }
  }

