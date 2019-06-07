import React from 'react';

import './styles.css';

import { Chart } from 'primereact/components/chart/Chart';

const electionPage = () => {
  const data = {
    labels: ['Bolsonaro', 'Haddad', 'Ciro'],
    datasets: [
      {
        data: [400, 100, 50],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <div className="content-section introduction">
        <h1>PieChart</h1>
        <p>A pie chart is a circular statistical graphic ...</p>
      </div>

      <div className="content-section implementation">
        <Chart type="pie" data={data} />
      </div>
    </div>
  );
};

export default electionPage;
