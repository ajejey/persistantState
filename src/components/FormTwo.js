import React, { useEffect } from 'react'
import usePersistentState from '../usePersistentState'
import Plot from 'react-plotly.js';

const FormTwo = () => {
  const [oneValue, setOneValue] = usePersistentState('oneValue', '')
  const [twoValue, setTwoValue] = usePersistentState('twoValue', '')
  const [graphData, setGraphData] = usePersistentState('graphData', [])

  const handleOneChange = (e) => {
    setOneValue(e.target.value)
  }

  // useEffect(() => {
  //   const getAPI = async () => {

  //     function generateTimeSeriesData(size) {
  //       const trace = {
  //         x: [],
  //         y: [],
  //         mode: 'markers',
  //         type: 'scatter'
  //       };

  //       let lastY = 0;

  //       for (let i = 0; i < size; i++) {
  //         trace.x.push(i);
  //         lastY += Math.random() * 10 - 4.5; // Generate random value for y
  //         trace.y.push(lastY);
  //       }

  //       return trace;
  //     }

  //     // Usage:
  //     var trace1 = generateTimeSeriesData(10); // Generate 1000 data points
  //     setGraphData(trace1)
  //   }
  //   getAPI()
  // }, [])

  return (
    <div>
      <h3>Form Two</h3>
      <div>
        <input type="text" onChange={handleOneChange} value={oneValue} />
        <label htmlFor="two">Two</label>
        <input type="text" id="two" onChange={(e) => setTwoValue(e.target.value)} value={twoValue} />
      </div>
      <div>
        {/* <Plot
          data={[graphData]}
          layout={{ title: 'A Fancy Plot' }}
        /> */}
        {graphData?.x?.length}
        <br />
        {twoValue}
        <br />
        {JSON.stringify(graphData, null, 2)}
      </div>
    </div>
  )
}

export default FormTwo