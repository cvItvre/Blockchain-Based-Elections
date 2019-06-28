import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Chips} from 'primereact/chips';
import {Calendar} from 'primereact/calendar';
import {Messages} from 'primereact/messages';

import './styles.css';

/* eslint-disable */

export default  class Formulario1 extends Component{


    constructor(props) {
        super(props);
        this.state = {
            electionName: this.props.electionName,
            domain: this.props.domain,
            candidates: this.props.candidates,
            calendarBegin: this.props.calendarBegin,
            calendarEnd: this.props.calendarEnd
        };
        
    }

    render () {

        this.handleElectionChange = () => {
            let _name = document.querySelector('#input-election-name').value;
            this.setState({electionName: _name});
            this.props.onElectionName(_name);
    
        }

        this.handleDomainChange = () => {
            let _domain = document.querySelector('#input-domain-address').value.split('@').join('');
            this.setState({domain: _domain});
            this.props.onDomainName(_domain);

        }

        this.handleCalendarBeginChange = (_calendarBegin) => {

            this.setState({calendarBegin: _calendarBegin});
            this.props.onCalendarBeginChange(_calendarBegin);

        }

        this.handleCalendarEndChange = (_calendarEnd) => {
          this.setState({calendarEnd: _calendarEnd});
          this.props.onCalendarEndChange(_calendarEnd);
          
        }
          
        this.handleCandidatesChange = (_candidates) => {
          const arrayNames = [];
          const arrayNumbers = [];

          for(let i of this.state.candidates) {
            const match = (/^(.+?)\((\d+)\)$/gi).exec(i);
            const name = match[1].trim();
            const number = parseInt(match[2], 10);
            arrayNames.push(name);
            arrayNumbers.push(number);
          }
          
          let slice = '';
          let lastElement = _candidates.slice(-1)[0];
          let regex = /^[a-zà-úâ-ôã A-ZÀ-ÚÂ-ÔÃ]{2,20}\([0-9]{1,30}\)$/;
          slice = _candidates;
          

          const match = (/^(.+?)\((\d+)\)$/gi).exec(lastElement);
          let name = null;
          let number = null;
          let alreadyHasCandidate = -1;
          let alreadyHasNumber = -1;
          if(match !== null) {
            name = match[1].trim();
            number = parseInt(match[2], 10);
  
            alreadyHasCandidate = arrayNames.indexOf(name);
            alreadyHasNumber = arrayNumbers.indexOf(number);
          }




          
          if(alreadyHasCandidate === -1 && alreadyHasNumber === -1 && regex.test(lastElement)) {
            this.setState({candidates: slice});
            this.props.onCandidatesChange(slice);
          }else if(alreadyHasCandidate !== -1 || alreadyHasNumber !== -1) {
            this.messages.show({
              severity: 'info',
              summary: 'Candidato inválido ',
              detail: 'Nome ou número de candidato já existente.'
            })
            this.props.onCandidatesChange(false);
          }else {
            this.messages.show({
              severity: 'info',
              summary: 'Formatos aceitos: ',
              detail: 'Amaury Tavares (10) ou Amaury Tavares(10)'
            })
            this.props.onCandidatesChange(false);
          }

        }
    
        return (
            <form className="main-form">
            <fieldset >
                <legend>Cadastro</legend>
                <span className="input-content">
                    <span className="election-name-wrapper">
                        <label className="lb-input">Nome da Eleição</label>
                        <InputText value={this.state.electionName} onChange={this.handleElectionChange } id="input-election-name"/>
                    </span>
                

                    <div className="p-float-label">

                      <div className="p-float-label-input">
                        <label >Domínio</label>
                        <InputText value={'@'+this.state.domain} onChange={this.handleDomainChange } id="input-domain-address"/>
                      </div>

                      <div className="p-float-label-input">
                        <label>Data e hora de início</label>
                        <Calendar locale={br} minDate={this.minDate} id="calendar-input-begin" dateFormat="dd/mm/yy" value={this.state.calendarBegin} onChange={(e) => this.handleCalendarBeginChange(e.value)} showTime={true} readOnlyInput={true} />
                      </div>
                        
                      <div className="p-float-label-input">
                        <label>Data e hora de fim</label>
                        <Calendar locale={br} minDate={this.state.calendarBegin} id="calendar-input-end" dateFormat="dd/mm/yy" value={this.state.calendarEnd} onChange={(e) => this.handleCalendarEndChange(e.value)} showTime={true} readOnlyInput={true} />
                      </div>
                    </div>


                    <span className="candidates-input-wrapper">
                        <label className="lb-input" >Candidatos</label>
                        {/* <Chips id="cadidates-input-id" value={this.state.candidates.length === 0 ? arrayAux : this.state.candidates} onChange={(e) => this.handleCandidatesChange(e.value)} ></Chips> */}
                        <Chips id="cadidates-input-id" value={this.state.candidates} onChange={(e) => this.handleCandidatesChange(e.value)} ></Chips>
                        <Messages ref={(el) => this.messages = el} />
                    </span>
                    
                </span>
                
            </fieldset>
            </form>

        );

    this.handleCandidatesChange = _candidates => {
      let slice = "";
      let lastElement = _candidates.slice(-1)[0];
      let regex = /^[a-zà-úâ-ôã A-ZÀ-ÚÂ-ÔÃ]{2,20}\([0-9]{1,30}\)$/;

      if (
        _candidates[0] === "Aceitos: Amaury Tavares (10) ou Amaury Tavares(10)"
      ) {
        slice = _candidates.slice(1);
      } else {
        slice = _candidates;
      }

      // if(typeof lastElement === 'undefined') {
      //     slice = '';
      // }

      if (regex.test(lastElement) || typeof lastElement === "undefined") {
        this.setState({ candidates: slice });
        this.props.onCandidatesChange(slice);
      } else {
        this.messages.show({
          severity: "info",
          summary: "Formatos aceitos: ",
          detail: "Amaury Tavares (10) ou Amaury Tavares(10)"
        });
        this.props.onCandidatesChange(false);
      }
    };

    let br = {
      firstDayOfWeek: 1,
      dayNames: [
        "domingo",
        "segunda-feira",
        "terça-feira",
        "quarta-feira",
        "quinta-feira",
        "sexta-feira",
        "sábado"
      ],
      dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
      dayNamesMin: ["DOM", "SEG", "TER", "QUI", "QUA", "SEX", "SAB"],
      monthNames: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ],
      monthNamesShort: [
        "jan",
        "fev",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez"
      ],
      today: "Hoje",
      clear: "Limpo",
      dateFormat: "dd/mm/yy",
      weekHeader: "Sm"
    };

    return (
      <form className="main-form">
        <fieldset>
          <legend>Cadastro</legend>
          <span className="input-content">
            <span className="election-name-wrapper">
              <label className="lb-input">Nome da Eleição</label>
              <InputText
                value={this.state.electionName}
                onChange={this.handleElectionChange}
                id="input-election-name"
              />
            </span>

            <div className="p-float-label">
              <div className="p-float-label-input">
                <label>Domínio</label>
                <InputText
                  value={"@" + this.state.domain}
                  onChange={this.handleDomainChange}
                  id="input-domain-address"
                />
              </div>

              <div className="p-float-label-input">
                <label>Data e hora de início</label>
                <Calendar
                  locale={br}
                  minDate={this.minDate}
                  id="calendar-input-begin"
                  dateFormat="dd/mm/yy"
                  value={this.state.calendarBegin}
                  onChange={e => this.handleCalendarBeginChange(e.value)}
                  showTime={true}
                  readOnlyInput={true}
                />
              </div>

              <div className="p-float-label-input">
                <label>Data e hora de fim</label>
                <Calendar
                  locale={br}
                  minDate={this.state.calendarBegin}
                  id="calendar-input-end"
                  dateFormat="dd/mm/yy"
                  value={this.state.calendarEnd}
                  onChange={e => this.handleCalendarEndChange(e.value)}
                  showTime={true}
                  readOnlyInput={true}
                />
              </div>
            </div>

            <span className="candidates-input-wrapper">
              <label className="lb-input">Candidatos</label>
              {/* <Chips id="cadidates-input-id" value={this.state.candidates.length === 0 ? arrayAux : this.state.candidates} onChange={(e) => this.handleCandidatesChange(e.value)} ></Chips> */}
              <Chips
                id="cadidates-input-id"
                value={this.state.candidates}
                onChange={e => this.handleCandidatesChange(e.value)}
              />
              <Messages ref={el => (this.messages = el)} />
            </span>
          </span>
        </fieldset>
      </form>
    );
  }
}
