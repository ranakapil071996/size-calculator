import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Radio, Slider, StepLabel, TextField } from '@material-ui/core';
import {
  bellyShape,
  calculator,
  company,
  fit,
  height,
  matchResult,
  shoulderShape,
  weight
} from './contant';
import { Restore } from '@material-ui/icons';
import ShopIcon from '../header/shop.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: 60
  },
  button: {
    marginRight: theme.spacing(1)
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: 'inline-block'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center'
  }
}));

function getSteps() {
  return [
    'Step 1 of 5: Tell me about youself',
    'Step 2 of 5: Brand?',
    'Step 3 of 5: Shoulder Shape',
    'Step 4 of 5: Belly Shape',
    'Step 5 of 5: Fit'
  ];
}
const initialData = {
  name: '',
  age: 16,
  weight: 45,
  gender: 'MALE',
  height: ['5', '0']
};

const initialAnswer = { 1: '', 2: '', 3: '', 4: '' };

export default function HorizontalNonLinearAlternativeLabelStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [finalResult, setFinalResult] = useState();
  const [answers, setAnswers] = useState(initialAnswer);
  const [data, setData] = useState(initialData);
  const [custom, setCustom] = useState([0, 0, 0]);

  const getResult = () => {
    if (validation()) {
      alert('Fill all steps');
      return;
    }
    let tempheight = +data.height.join('.');
    let tempweight = +data.weight;
    let heightIndex;
    let weightIndex;
    console.log(tempweight, tempheight);
    if (data.height.join('.') === '5.10') {
      heightIndex = 9;
    } else if (tempheight <= 5.1) {
      heightIndex = 0;
    } else if (tempheight >= 6.5) {
      heightIndex = height.length - 1;
    } else {
      height.some((item, i) => {
        let value = +item;
        if (value === tempheight) {
          heightIndex = i;
          return true;
        }
        return false;
      });
    }
    if (tempweight <= 55) {
      weightIndex = 0;
    } else if (tempweight >= 106) {
      weightIndex = weight.length - 1;
    } else {
      weight.some((item, i) => {
        if (tempweight >= item[0] && tempweight <= item[1]) {
          weightIndex = i;
          return true;
        }
        return false;
        // debugger;
      });
    }
    const tempSize = calculator[heightIndex][weightIndex];
    if (tempSize) {
      let sizes = tempSize.split('/').map((item) => item.trim().toUpperCase());
      let selectedSize = sizes[0];
      if (sizes.length === 2) {
        selectedSize = sizes[1];
      }
      console.log(company, selectedSize, sizes);
      let companyArray =
        answers['1'] === 'CUSTOM' ? custom : company[answers[1]][selectedSize];
      let tempShoulder = shoulderShape[answers[2]]
        ? shoulderShape[answers[2]]
        : 0;
      let tempBellyShape = bellyShape[answers[3]] ? bellyShape[answers[3]] : 0;
      let tempFit = fit[answers[4]] ? fit[answers[4]] : 0;
      console.log(tempShoulder, tempBellyShape, tempFit, 'F');
      const finalAnswer = companyArray.map((item, index) => {
        if (index === 1) {
          return companyArray[index];
        }
        return companyArray[index] + tempShoulder + tempBellyShape + tempFit;
      });
      if (finalAnswer && finalAnswer.length) {
        const test = matchResult.some((item, j) => {
          const chestValue = Math.round(finalAnswer[0]);
          if (chestValue >= item.range[0] && chestValue <= item.range[1]) {
            if (item.type === 'XXL') {
              setFinalResult(['XXL']);
            } else {
              setFinalResult([item.type, matchResult[j + 1].type]);
            }
            return true;
          }
          return false;
        });
        if (!test) {
          alert('Something went wrong');
        }
      }
    } else {
      alert('You size not available. Kindly refer to size chart');
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div
            style={{
              width: '30%',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #e72744',
              padding: 20,
              borderRadius: 16
            }}
          >
            <TextField
              style={{ width: '100%', marginBottom: 15 }}
              label='Name'
              value={data.name}
              variant='outlined'
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <p style={{ margin: 0 }}>Age</p>
            <Slider
              style={{ width: '100%', marginBottom: 15 }}
              defaultValue={16}
              // getAriaValueText={50}
              value={data.age}
              onChange={(e, value) => setData({ ...data, age: value })}
              aria-labelledby='input-slide'
              valueLabelDisplay='auto'
            />
            <p style={{ margin: 0 }}>Weight</p>
            <Slider
              style={{ width: '100%', marginBottom: 15 }}
              defaultValue={45}
              // getAriaValueText={50}
              value={data.weight}
              min={1}
              max={106}
              onChange={(e, value) => setData({ ...data, weight: value })}
              aria-labelledby='input-slide'
              valueLabelDisplay='auto'
            />
            <p style={{ margin: 0 }}>Gender</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                style={{ outline: 0, borderRadius: 0 }}
                color='primary'
                variant={data.gender === 'MALE' ? 'contained' : 'outlined'}
                onClick={(e) => setData({ ...data, gender: 'MALE' })}
              >
                Male
              </Button>
              <Button
                style={{ outline: 0, borderRadius: 0 }}
                color='primary'
                onClick={(e) => setData({ ...data, gender: 'FEMALE' })}
                variant={data.gender === 'FEMALE' ? 'contained' : 'outlined'}
              >
                Female
              </Button>
            </div>
            <div>
              <p style={{ marginBottom: 10 }}>Height:</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value < 1 || value > 7) {
                      return;
                    }
                    setData({
                      ...data,
                      height: [e.target.value, data.height[1]]
                    });
                  }}
                  value={data.height[0]}
                  variant='outlined'
                  type='number'
                  label='ft'
                />
                <TextField
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value < 0 || value > 11) {
                      return;
                    }
                    setData({
                      ...data,
                      height: [data.height[0], e.target.value]
                    });
                  }}
                  value={data.height[1]}
                  style={{ marginLeft: 10 }}
                  variant='outlined'
                  type='number'
                  label='inch'
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div
            style={{ width: '50%', display: 'flex', flexDirection: 'column' }}
          >
            <h3>Choose a brand of jacket that fits you most?</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                onClick={() => setAnswers({ ...answers, 1: 'Roadster' })}
                style={{ marginRight: 10, flex: 1 }}
              >
                <div>Roadster</div>
                <Radio checked={answers['1'] === 'Roadster'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 1: 'WROGN' })}
                style={{ marginRight: 10, flex: 1 }}
              >
                <div>WROGN</div>
                <Radio checked={answers['1'] === 'WROGN'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 1: 'HNM' })}
                style={{ marginRight: 10, flex: 1 }}
              >
                <div>HNM</div>
                <Radio checked={answers['1'] === 'HNM'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 1: 'Fort_collins' })}
                style={{ marginRight: 10, flex: 1 }}
              >
                <div>Fort collins</div>
                <Radio checked={answers['1'] === 'Fort_collins'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 1: 'CUSTOM' })}
                style={{ marginRight: 10, flex: 1 }}
              >
                <div>CUSTOM</div>
                <Radio checked={answers['1'] === 'CUSTOM'} />
                {answers['1'] === 'CUSTOM' && (
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <TextField
                      type='number'
                      style={{ width: '48%' }}
                      label='Chest'
                      value={custom[0]}
                      onChange={(e) => {
                        const tempCustom = [...custom];
                        tempCustom[0] = parseFloat(e.target.value);
                        setCustom(tempCustom);
                      }}
                    />
                    <TextField
                      type='number'
                      style={{ width: '48%' }}
                      label='Shoulder'
                      value={custom[2]}
                      onChange={(e) => {
                        const tempCustom = [...custom];
                        tempCustom[2] = parseFloat(e.target.value);
                        setCustom(tempCustom);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div
            style={{ width: '25%', display: 'flex', flexDirection: 'column' }}
          >
            <h3>What's your shoulder shape looks like?</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                onClick={() => setAnswers({ ...answers, 2: 'Narrow' })}
                style={{ marginRight: 10 }}
              >
                <div>Narrow</div>
                <Radio checked={answers['2'] === 'Narrow'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 2: 'Regular' })}
                style={{ marginRight: 10 }}
              >
                <div>Regular</div>
                <Radio checked={answers['2'] === 'Regular'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 2: 'Broad' })}
                style={{ marginRight: 10 }}
              >
                <div>Broad</div>
                <Radio checked={answers['2'] === 'Broad'} />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div
            style={{ width: '25%', display: 'flex', flexDirection: 'column' }}
          >
            <h3>What's your belly shape looks like?</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                onClick={() => setAnswers({ ...answers, 3: 'Regular' })}
                style={{ marginRight: 10 }}
              >
                <div>Regular</div>
                <Radio checked={answers['3'] === 'Regular'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 3: 'Flat' })}
                style={{ marginRight: 10 }}
              >
                <div>Flat</div>
                <Radio checked={answers['3'] === 'Flat'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 3: 'Rounded' })}
                style={{ marginRight: 10 }}
              >
                <div>Rounded</div>
                <Radio checked={answers['3'] === 'Rounded'} />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div
            style={{ width: '25%', display: 'flex', flexDirection: 'column' }}
          >
            <h3>What's type of fit you desire to wear?</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                onClick={() => setAnswers({ ...answers, 4: 'Regular' })}
                style={{ marginRight: 10 }}
              >
                <div>Regular</div>
                <Radio checked={answers['4'] === 'Regular'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 4: 'Snug' })}
                style={{ marginRight: 10 }}
              >
                <div>Snug</div>
                <Radio checked={answers['4'] === 'Snug'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 4: 'Loose' })}
                style={{ marginRight: 10 }}
              >
                <div>Loose</div>
                <Radio checked={answers['4'] === 'Loose'} />
              </div>
            </div>
          </div>
        );
      default:
        return 'Unknown step';
    }
  }

  const totalSteps = () => {
    return getSteps().length;
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderCompleted = (index) => {
    if (index === 0) {
      if (
        data.name &&
        data.age > 0 &&
        data.weight > 0 &&
        data.gender &&
        height &&
        height.length
      ) {
        return true;
      }
      return false;
    } else {
      if (answers[index.toString()]) {
        return true;
      } else {
        return false;
      }
    }
  };

  const validation = () => {
    return getSteps().some((item, index) => !renderCompleted(index));
  };

  if (finalResult) {
    return (
      <div className={classes.root}>
        <div
          style={{ flexDirection: 'column' }}
          className={classes.instructions}
        >
          <h1>Final Result</h1>
          <h5>Hi, {data.name}, You final result is</h5>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                background: '#f05524',
                color: '#fff',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '1px solid #e72744',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 25,
                fontWeight: 600,
                textTransform: 'uppercase'
              }}
            >
              {finalResult[0]}
            </div>
            {finalResult && finalResult.length === 2 ? (
              <>
                <div style={{ margin: '0 20px', color: '#777', fontSize: 16 }}>
                  OR
                </div>
                <div
                  style={{
                    background: '#f05524',
                    color: '#fff',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    border: '1px solid #e72744',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 25,
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}
                >
                  {finalResult[1]}
                </div>
              </>
            ) : null}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={ShopIcon} style={{ width: 200 }} alt='shop' />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '20px 0'
            }}
          >
            <Button
              onClick={() => {
                setData(initialData);
                setAnswers(initialAnswer);
                setFinalResult(null);
                setActiveStep(0);
              }}
              variant='outlined'
              color='primary'
            >
              Reset <Restore style={{ marginLeft: 10 }} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step
              completed={
                index === 0
                  ? renderCompleted(index)
                  : Boolean(answers[index.toString()])
              }
              key={label}
            >
              <StepButton onClick={() => setActiveStep(index)}>
                <StepLabel>{label}</StepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <div>
          <Typography className={classes.instructions}>
            {getStepContent(activeStep)}
          </Typography>
          <div style={{ marginTop: 20 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={activeStep === 4 ? getResult : handleNext}
              className={classes.button}
            >
              {activeStep === 4 ? 'Result' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
      {false && (
        <div
          onClick={() => {
            setCompleted();
            setSkipped();
          }}
        ></div>
      )}
    </div>
  );
}
