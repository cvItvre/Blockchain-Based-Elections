/* eslint-disable react/prop-types */
import React from 'react';
import { Chart } from 'primereact/chart';

const chart = (props) => {
  const { data } = props;
  return (
    <section className="chart-content">
      <Chart type="pie" data={data} />
    </section>
  );
};

export default chart;
