import { TextField, Stack, Button } from '@mui/material';
import { useState } from 'react';
import './App.css';

function App() {
  const [interest, setInterest] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [year, setYear] = useState(0);
  const [rate, setRate] = useState(0);

  const [invalidPrincipal, setInvalidPrincipal] = useState(false);
  const [invalidRate, setInvalidRate] = useState(false);
  const [invalidYear, setInvalidYear] = useState(false);

  const validateInputs = (inputTag) => {
    console.log(typeof inputTag);
    const { name, value } = inputTag;
    console.log(name, value);
    console.log(!!value.match(/^\d*\.?\d+$/));
    if (name == 'principal') {
      setPrincipal(value);
      if (!!value.match(/^\d*\.?\d+$/)) {
        setInvalidPrincipal(false);
      } else {
        setInvalidPrincipal(true);
      }
    } else if (name == 'rate') {
      setRate(value);
      if (!!value.match(/^\d*\.?\d+$/)) {
        setInvalidRate(false);
      } else {
        setInvalidRate(true);
      }
    } else if (name == 'year') {
      setYear(value);
      if (!!value.match(/^\d*\.?\d+$/)) {
        setInvalidYear(false);
      } else {
        setInvalidYear(true);
      }
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (principal && rate && year) {
      setInterest((principal * rate * year) / 100);
    } else {
      alert('Please fill the form completely!!!');
    }
  };

  const handleReset = () => {
    setPrincipal(0);
    setInterest(0);
    setRate(0);
    setYear(0);
    setInvalidPrincipal(false);
    setInvalidRate(false);
    setInvalidYear(false);
  };

  return (
    <div
      style={{ width: '100%', minHeight: '100vh' }}
      className="d-flex justify-content-center align-items-center bg-dark"
    >
      <div
        className="bg-light text-dark rounded p-5"
        style={{ width: '600px' }}
      >
        <h3>Simple Interest Calculator</h3>
        <p>Calculate your simple interest easily!</p>
        <div className="bg-warning rounded p-3">
          <h1 className="text-center">₹ {interest}</h1>
          <p className="fw-bolder text-center">Total Simple Interest</p>
        </div>
        <form className="mt-5">
          {/* principal amount */}
          <div className="mb-3">
            <TextField
              value={principal || ''}
              className="w-100"
              onChange={(e) => validateInputs(e.target)}
              name="principal"
              id="outlined-principal"
              label="₹ Principal Amount"
              variant="outlined"
            />
          </div>
          {/* invalid principal amount */}
          {invalidPrincipal && (
            <div className="mb-3 text-danger fw-bolder">
              Invalid Principal Amount!!!
            </div>
          )}
          <div className="mb-3">
            <TextField
              value={rate || ''}
              className="w-100"
              onChange={(e) => validateInputs(e.target)}
              name="rate"
              id="outlined-rate"
              label="% Rate of Interest"
              variant="outlined"
            />
          </div>
          {/* invalid rate */}
          {invalidRate && (
            <div className="mb-3 text-danger fw-bolder">
              Invalid Rate of Interest!!!
            </div>
          )}
          <div className="mb-3">
            <TextField
              value={year || ''}
              className="w-100"
              onChange={(e) => validateInputs(e.target)}
              id="outlined-year"
              name="year"
              label="Time Period (Yr)"
              variant="outlined"
            />
          </div>
          {/* invalid year */}
          {invalidYear && (
            <div className="mb-3 text-danger fw-bolder">Invalid Year!!!</div>
          )}
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              onClick={handleCalculate}
              disabled={invalidPrincipal || invalidRate || invalidYear}
              className="bg-dark"
              style={{ width: '50%', height: '70px' }}
              variant="contained"
            >
              Calculate
            </Button>
            <Button
              onClick={handleReset}
              className="border border-dark rounded text-dark"
              variant="outlined"
              style={{ width: '50%', height: '70px' }}
            >
              Reset
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default App;
