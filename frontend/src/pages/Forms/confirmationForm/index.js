import React, {Component} from 'react';
import './styles.css';


export default class ConfirmationForm extends Component {
  constructor(props) {
    super(props);
      this.state = {
        electionName: this.props.electionName,
        domain: this.props.domain,
        calendarBegin: this.props.calendarBegin,
        calendarEnd: this.props.calendarEnd,
        candidates: this.props.candidates
      };


  }

  confirmarCadastro () {
    //TODO
  }




  render() {

    const nomeEleicao = this.state.electionName;
    const dominio = this.state.domain === '' ? this.state.domain : '@'+this.state.domain;
    const calendarIni = this.state.calendarBegin;
    const calendarFim = this.state.calendarEnd;
    const candidatos = this.state.candidates;

    return(

      <span className="main-form" >


        <h1>Nome da Eleição</h1>
          <h2>{nomeEleicao}</h2>
          {console.log(nomeEleicao)}
          
        <br/>
        
        <h1>Domínio</h1> 
          <h2>{dominio}</h2>
          {console.log(dominio)}
        
        <br/>

        <h1>Data e Hora de início</h1> 
          <h2>{calendarIni.toString()}</h2>
          {console.log(calendarIni)}
          
        <br/>

        <h1>Data e Hora de fim</h1> 
          <h2>{calendarFim.toString()}</h2>
          {console.log(calendarFim)}
          
        <br/>

        <h1>Candidatos</h1> {candidatos.map(
                      cand => <h2>{cand.toString()}</h2>
                      )
                    }


          <button className="bt-input-confirm" onClick={this.confirmarCadastro}>Cadastrar</button>

      </span>


    );



  }
}
