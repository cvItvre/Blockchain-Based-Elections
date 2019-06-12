import React, { Component } from "react";
import { Chart } from 'primereact/chart';
import { InputText } from 'primereact/inputtext';

import './styles.css'

class votar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                electionName: 'Eleição 1',
                domain: '@ufrpe.br',
                labels: ['candidate1', 'candidate2', 'candidate3', 'candidate4',],
                datasets: [{
                    data: [100, 50, 300, 186],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#AECB56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#AECB56"],
                }],
            },
        };
    }

    sendEmail(e) {
        const inputEmail = document.querySelector('#input-email');
        const domain = inputEmail.getAttribute('data-domain'); //verificar isso
        const domainEscaped = domain.replace('\.', '\\.');
        const regex = new RegExp('.+' + domainEscaped + '$', 'g');
        console.log(regex, inputEmail.value)

        if (inputEmail.value.match(regex)) {
            //enviar email
            //se tudo ok, recebe um código

        } else {
            console.log('Email com domínio inválido!');
        }
    }

    verifyCode(e) {
        const inputCode = document.querySelector('#input-code');
        const code = localStorage.getItem('CODE');

        if (code === inputCode.value) {
            console.log('Código correto');
        } else {
            console.log('Código incorreto');
        }
    }

    render() {
        //dados estaticos
        const { data } = this.state;

        return (
            <main className="main-content">
                <h1>{data.electionName}</h1>
                <section className="chart-content">
                    <Chart type="pie" data={data} />
                </section>
                <section className="input-content">
                    <span className="p-float-label">
                        <InputText id="input-email" data-domain={data.domain} />
                        <label className="lb-input" htmlFor="email" >Email</label>
                        <span className="domain-input-send" >{data.domain}</span>
                        <button className="bt-input-send" onClick={this.sendEmail}>Enviar</button>
                    </span>
                </section>
                <section className="input-content">
                    <span className="p-float-label">
                        <InputText id="input-code" />
                        <label className="lb-input" htmlFor="code" >Code</label>
                        <button className="bt-input-code" onClick={this.verifyCode}>Verificar</button>
                    </span>
                </section>
            </main>
        );

    }
}

export default votar;

