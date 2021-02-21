import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

//Components
import SubmitButton from './SubmitButton';

//Material ui
import {
  FormControlLabel,
  Divider,
  Paper,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  RadioGroup,
  Radio,
  Typography,
  Grid,
} from '@material-ui/core';

import { toSentenceFormat } from '../../utils/textFormater';

//styles
import { makeStyles } from '@material-ui/core/styles';

//icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//page styles with material ui
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  option: {
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '20px',
    },
  },
}));

//for loading padding
const RenderFallbackOption = ({ children, ...other }) => {
  return <div style={{ textAlign: 'center' }}>{children}</div>;
};

const Payment = ({ match, paymentOptions }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [readyToView, setReadyToView] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpand = (panel, index) => (event, isExpanded) => {
    setValue(paymentOptions[index].optionType);
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (paymentOptions !== undefined) {
      setValue(paymentOptions[0].optionType);
      setExpanded(`${paymentOptions[0].optionType}`);
      setReadyToView(true);
    }
  }, [paymentOptions]);

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <Fragment>
      {readyToView ? (
        <Paper className={classes.paper}>
          {paymentOptions.map((option, index) => (
            <Accordion
              key={index}
              className={classes.root}
              expanded={expanded === `${option.optionType}`}
              onChange={handleExpand(`${option.optionType}`, index)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'>
                <FormControl component='fieldset'>
                  <RadioGroup
                    aria-label='paymentOptions'
                    name='paymentOptions'
                    defaultValue={value}
                    value={value}
                    onChange={handleChange}>
                    <FormControlLabel
                      className={classes.option}
                      value={option.optionType}
                      control={<Radio />}
                      label={`${option.optionType}`}
                    />
                  </RadioGroup>
                </FormControl>
              </AccordionSummary>
              <AccordionDetails>
                <>
                  <Grid
                    container
                    spacing={2}
                    justify='center'
                    alignItems='flex-start'>
                    {Object.keys(option).map((item, itemIndex) => (
                      <div key={itemIndex} className={classes.option}>
                        <Grid item xs={12}>
                          <Typography
                            display='inline'
                            variant='body1'
                            color='secondary'>
                            {toSentenceFormat(item)}
                          </Typography>
                          {`:  `}
                          <Typography
                            display='inline'
                            variant='subtitle1'
                            color='primary'
                            component='a'>
                            {option[`${item}`]}
                          </Typography>
                        </Grid>
                      </div>
                    ))}
                  </Grid>
                </>
                <Divider />
              </AccordionDetails>
            </Accordion>
          ))}
          <SubmitButton optionSelected={value} eventId={match.params.id} />
        </Paper>
      ) : (
        <RenderFallbackOption>
          <CircularProgress />
        </RenderFallbackOption>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  paymentOptions: state.event.event.paymentOptions,
});

export default connect(mapStateToProps, null)(Payment);
