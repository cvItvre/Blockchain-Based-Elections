import React, { Component } from "react";
import { Chart } from 'primereact/chart';
import { InputText } from 'primereact/inputtext';

import './styles.css'

class votar extends Component {
    sendEmail() {
        const inputEmail = document.querySelector('#input-email');
        console.log('Envia email para ' + inputEmail.value)
    }

    render() {
        //dados estaticos
        this.state = {
            data: {
                electionName: 'Eleição 1',
                labels: ['candidate1', 'candidate2', 'candidate3', 'candidate4',],
                datasets: [{
                    data: [100, 50, 300, 186],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#AECB56"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#AECB56"],
                }],
            },
        };

        const { data } = this.state;

        return (
        <main className="main-content">
            <h1>{ data.electionName }</h1>
            <section className="chart-content">
                <Chart type="pie" data={ data } />
            </section>
            <section className="input-content">
                <span className="p-float-label">
                    <InputText id="input-email"/>
                    <label className="lb-input" htmlFor="email" >Email</label>
                    <button className="bt-input-send" onClick={ this.sendEmail }>Enviar</button>
                </span>
            </section>
            <section className="input-content">
                <span className="p-float-label">
                    <InputText id="input-code"/>
                    <label className="lb-input" htmlFor="code" >Code</label>
                    <button className="bt-input-send">Verificar</button>
                </span>
            </section>
        </main>
        );
       
    }
}

export default votar;

