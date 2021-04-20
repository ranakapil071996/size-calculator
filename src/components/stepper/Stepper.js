import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Radio, Slider, TextField } from '@material-ui/core';
import {
  bellyShape,
  calculator,
  company,
  fit,
  height,
  shoulderShape,
  weight
} from './contant';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
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

export default function HorizontalNonLinearAlternativeLabelStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [answers, setAnswers] = useState({ 1: '', 2: '', 3: '', 4: '' });
  const [data, setData] = useState({
    name: '',
    age: 16,
    weight: 45,
    gender: 'MALE',
    height: ['5', '0']
  });
  console.log(answers, data, 'data');

  const getResult = () => {
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
      let companyArray = company[answers[1]][selectedSize];
      let tempShoulder = shoulderShape[answers[2]];
      let tempBellyShape = bellyShape[answers[3]];
      let tempFit = fit[answers[4]];
      console.log(tempShoulder, tempBellyShape, tempFit, 'F');
      const finalAnswer = companyArray.map((item, index) => {
        if (index === 1) {
          return companyArray[index];
        }
        return companyArray[index] + tempShoulder + tempBellyShape + tempFit;
      });
      console.log(finalAnswer, 'final');
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div
            style={{ width: '20%', display: 'flex', flexDirection: 'column' }}
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
                onChange={(e) => setData({ data, gender: 'MALE' })}
              >
                Male
              </Button>
              <Button
                style={{ outline: 0, borderRadius: 0 }}
                color='primary'
                onChange={(e) => setData({ ...data, gender: 'FEMALE' })}
                variant={data.gender === 'FEMALE' ? 'contained' : 'outlined'}
              >
                Female
              </Button>
            </div>
            <div>
              <p style={{ marginBottom: 0 }}>Height:</p>
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
                <Button onClick={getResult}>Test</Button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div
            style={{ width: '25%', display: 'flex', flexDirection: 'column' }}
          >
            <h3>Choose a brand of jacket that fits you most?</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                onClick={() => setAnswers({ ...answers, 1: 'Roadster' })}
                style={{ marginRight: 10 }}
              >
                <div>Roadster</div>
                <Radio checked={answers['1'] === 'Roadster'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 1: 'WROGN' })}
                style={{ marginRight: 10 }}
              >
                <div>WROGN</div>
                <Radio checked={answers['1'] === 'WROGN'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 1: 'HNM' })}
                style={{ marginRight: 10 }}
              >
                <div>HNM</div>
                <Radio checked={answers['1'] === 'HNM'} />
              </div>
              <div
                onClick={() => setAnswers({ ...answers, 1: 'Fort_collins' })}
                style={{ marginRight: 10 }}
              >
                <div>Fort collins</div>
                <Radio checked={answers['1'] === 'Fort_collins'} />
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
            <Button onClick={getResult}>Test</Button>
          </div>
        );
      default:
        return 'Unknown step';
    }
  }

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = (step) => {
    return false;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
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

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);
    setCompleted(newCompleted);

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== totalSteps() - skippedSteps()) {
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepOptional(index)) {
            buttonProps.optional = (
              <Typography variant='caption'>Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepComplete(index)}
                {...buttonProps}
              >
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
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
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              {isStepOptional(activeStep) && !completed.has(activeStep) && (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              {activeStep !== steps.length &&
                (completed.has(activeStep) ? (
                  <Typography variant='caption' className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleComplete}
                  >
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
