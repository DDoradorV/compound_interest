import './App.css';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from './components/Input.js';
import LineChart from './components/LineChart.js';

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total += contribution;
    total *= (1 + (rate / 100));
  }

  return total.toFixed(2);
}

const chartData = (deposit, contribution, years, rate) => {
  const data = {
    labels: [],
    datasets: [
      {
        label: 'Total',
        data: [],
        fill: true,
        backgroundColor: 'rgba(48, 74, 192, 0.6)',
        borderColor: 'rgba(48, 74, 192, 1)',
        borderWidth: 3,
      },
    ],
  };

  for (let i = 0; i <= years; i++) {
    data.labels.push("Year " + i);
    data.datasets[0].data.push(compoundInterest(deposit, contribution, i, rate));
  }

  return data;
}



function App() {
  const[total, setTotal] = useState("");
  const[chart, setChart] = useState({ labels: ["Years"], datasets: [{
    label: "Total",
    data: [],
  }] });
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const total = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate));
    setTotal(total);
    const cData = chartData(Number(deposit), Number(contribution), Number(years), Number(rate));
    setChart(cData);
  }
  
  return (
    <div className='contInput'>
      <section className='sectInput'>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit} 
          validationSchema={Yup.object({
            deposit: Yup.number().positive().required("Required"),
            contribution: Yup.number().positive().required("Required"),
            years: Yup.number().positive().required("Required"),
            rate: Yup.number().positive().required("Required"),
          })}
        >
          <Form>
            
            <Input name="deposit" label="Initial Deposit (€)" /> 
            <Input name="contribution" label="Anual Contribution (€)" />
            <Input name="years" label="Years" />
            <Input name="rate" label="Estimated Interest (%)" />
            <button className='buttonInput' type='submit'>Calculate</button>
          </Form>
        </Formik>
        {total !== "" ? <span className='spanInput'>Your balance will be: {total + "€"}</span> : null}
        <div className='results'>
          <LineChart data={chart} />
        </div>
      </section>
    </div>
  );
}

export default App;