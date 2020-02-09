import React from 'react';
import styled from 'styled-components';
import { font, color } from 'styles/__utils';
import Grid from '@material-ui/core/Grid';
import cx from 'classnames';
import {
  icon_cloud_data,
  icon_cloud_no_data,
  icon_cloud_upload,
} from 'components/base/images';
import Radio from '@material-ui/core/Radio';
import CreateIcon from '@material-ui/icons/Create';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Created', 'Working', 'Uploaded', 'Read', 'Downloaded', 'Completed'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Created';
    case 1:
      return 'Step 2: Working';
    case 2:
      return 'Step 3: Uploaded';
    case 3:
      return 'Step 4: Read';
    case 4:
      return 'Step 5: Downloaded';     
    case 5:
      return 'Step 6: Completed';
    default:
      return 'Unknown step';
  }
}

function CaseCardDetail(props) {
  const [checked, setChecked] = React.useState(true);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = step => {
    return step === 1;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
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
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
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

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  

  return (
    <Styled.CaseCardDetail>
      <Grid container className="WorksCardListPanel__info_box">

        <Grid container className="WorksCardListPanel__row">
          <Grid item xs={3}>
            <div className="WorksCardListPanel__title">Case ID</div>
          </Grid>
          <Grid item xs={9}>
            <div className="WorksCardListPanel__con">20200206_white clinic_Alice_0001</div>
          </Grid>
        </Grid>

        <Grid container className="WorksCardListPanel__row">
          <Grid container>
            <div className="WorksCardListPanel__title">Case TimeLine</div>

            <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepOptional(index)) {
            buttonProps.optional = <Typography variant="caption">02-06, 14:22</Typography>;
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
        
        
      </div>
    </div>
          </Grid>
          <Grid container>
            <div className="WorksCardListPanel__con"></div>
          </Grid>
        </Grid>

        <Grid container className="WorksCardListPanel__row">
          <Grid item xs={3}>
            <div className="WorksCardListPanel__title">Due Date</div>
          </Grid>
          <Grid item xs={9}>
            <div className="WorksCardListPanel__con">2020-03-09</div>
          </Grid>
        </Grid>

        <Grid container className="WorksCardListPanel__row">
          <Grid item xs={3}>
            <div className="WorksCardListPanel__title">Sender</div>
          </Grid>
          <Grid item xs={9}>
            <div className="WorksCardListPanel__con">White Clinic(20JAN03-0001)</div>
          </Grid>
        </Grid>

        <Grid container className="WorksCardListPanel__row">
          <Grid item xs={3}>
            <div className="WorksCardListPanel__title">Receiver</div>
          </Grid>
          <Grid item xs={9}>
            <div className="WorksCardListPanel__con">Willy Wonka chocolate lab</div>
          </Grid>
        </Grid>
{/* sender area */}
        <Grid container className={cx("WorksCardListPanel__area_box", "sender")}>
          <Grid container className={cx("WorksCardListPanel__row", "ribbon")}>
            <div className="WorksCardListPanel__area">
            <div className={cx("WorksCardListPanel__title_ribbon_box", "sender_ribbon")}>
                <div className={cx("WorksCardListPanel__title_ribbon_tx", "sender_tx")}>White Clinic's Area</div>
              </div>
            </div>
          </Grid>

          <Grid container className={cx("WorksCardListPanel__row", "area_row")}>
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">App Data</div>
            </Grid>
            <Grid item xs={9}>
              <div className="WorksCardListPanel__con">
                <div className="WorksCardListPanel_cloud_info">
                  <span className="cloud__img_box">
                    <img src={icon_cloud_data} alt="icon_cloud_data" />
                  </span>
                  <span className="cloud_tx">
                    Snap
                  </span>
                </div>

                <div className="WorksCardListPanel_cloud_info">
                  <span className="cloud__img_box">
                    <img src={icon_cloud_upload} alt="icon_cloud_upload" />
                  </span>
                  <span className="cloud_tx">
                    Smile Design
                  </span>
                </div>

                <div className="WorksCardListPanel_cloud_info">
                  <span className="cloud__img_box">
                    <img src={icon_cloud_no_data} alt="icon_cloud_no_data" />
                  </span>
                  <span className="cloud_tx">
                    Scan App
                  </span>
                </div>

                <div className="WorksCardListPanel_cloud_info">
                  <span className="cloud__img_box">
                    <img src={icon_cloud_no_data} alt="icon_cloud_no_data" />
                  </span>
                  <span className="cloud_tx">
                    IOS
                  </span>
                </div>

              </div>
            </Grid>
          </Grid>

          <Grid container className={cx("WorksCardListPanel__row", "area_row")}>
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">Data</div>
            </Grid>
            <Grid item xs={9}>
              <div className="WorksCardListPanel__con">
                <a href="/" className="WorksCardListPaner_cloud_btn">Upload</a>
                <a href="/" className="WorksCardListPaner_cloud_btn">Download</a>
                <a href="/" className="WorksCardListPaner_cloud_btn">Local View</a>
              </div>
            </Grid>
          </Grid>

          <Grid container className={cx("WorksCardListPanel__row", "area_row")}>
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">Memo</div>
            </Grid>
            <Grid item xs={9}>
            <Grid container className={cx("WorksCardListPanel__con", "WorksCardListPanel__memo", "contents")}>
                  <div className="WorksCardListPanel__memo_title">Willy Wonka chocolate lab's Memo</div>
                  <div className="WorksCardListPanel__memo_con">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unk
                  </div>
                <button className={cx("WorksCardListPanel__memo", "edit")}><CreateIcon style={{ fontSize: 16 }} /></button>
                <button className={cx("WorksCardListPanel__memo", "view")}>Veiw</button>
           </Grid>
          </Grid>
          </Grid>

          <Grid container className={cx("WorksCardListPanel__row", "area_row")}>
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">Direct Upload</div>
            </Grid>
            <Grid item xs={9}>
              <Grid container className="WorksCardListPanel__con">
                <Grid container className={cx("WorksCardListPanel__direct_upload", "table_title")}>
                  <Grid item xs={2}>No.</Grid>
                  <Grid item xs={6}>File Name</Grid>
                  <Grid item xs={2}>File Type</Grid>
                  <Grid item xs={2}>Check</Grid>
                </Grid>

                <Grid container className={cx("WorksCardListPanel__direct_upload", "table_contents")}>
                  <Grid item xs={2}>01</Grid>
                  <Grid item xs={6}>exocad_alice_zircon_001</Grid>
                  <Grid item xs={2}>zip</Grid>
                  <Grid item xs={2}>
                    <Radio
                      className={cx("WorksCardListPanel__radio_btn")}
                      style={{ width: 12, height: 12 }}
                      size="small"
                      checked={checked}
                      color="primary"
                      value="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }} />
                  </Grid>
                </Grid>

              </Grid>

            </Grid>
          </Grid>
        </Grid>

{/* receiver area */}
<Grid container className={cx("WorksCardListPanel__area_box", "receiver")}>
          <Grid container className={cx("WorksCardListPanel__row", "ribbon")}>
            <div className="WorksCardListPanel__area">
              <div className={cx("WorksCardListPanel__title_ribbon_box", "receiver_ribbon")}>
                <div className={cx("WorksCardListPanel__title_ribbon_tx", "receiver_tx")}>Willy Wonka chocolate lab's Area</div>
              </div>
            </div>
          </Grid>

          <Grid container className={cx("WorksCardListPanel__row", "area_row")}>
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">App Data</div>
            </Grid>
            <Grid item xs={9}>
              <div className="WorksCardListPanel__con">
                <div className="WorksCardListPanel_cloud_info">
                  <span className="cloud__img_box">
                    <img src={icon_cloud_data} alt="icon_cloud_data" />
                  </span>
                  <span className="cloud_tx">
                    Snap
                  </span>
                </div>

                <div className="WorksCardListPanel_cloud_info">
                  <span className="cloud__img_box">
                    <img src={icon_cloud_upload} alt="icon_cloud_upload" />
                  </span>
                  <span className="cloud_tx">
                    Smile Design
                  </span>
                </div>

                <div className="WorksCardListPanel_cloud_info">
                  <span className="cloud__img_box">
                    <img src={icon_cloud_no_data} alt="icon_cloud_no_data" />
                  </span>
                  <span className="cloud_tx">
                    Scan App
                  </span>
                </div>

                <div className="WorksCardListPanel_cloud_info">
                  <span className="cloud__img_box">
                    <img src={icon_cloud_no_data} alt="icon_cloud_no_data" />
                  </span>
                  <span className="cloud_tx">
                    IOS
                  </span>
                </div>

              </div>
            </Grid>
          </Grid>

         <Grid container className={cx("WorksCardListPanel__row", "area_row")}>
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">Data</div>
            </Grid>
            <Grid item xs={9}>
              <div className="WorksCardListPanel__con">
                <a href="/" className="WorksCardListPaner_cloud_btn">Upload</a>
                <a href="/" className="WorksCardListPaner_cloud_btn">Download</a>
                <a href="/" className="WorksCardListPaner_cloud_btn">Local View</a>
              </div>
            </Grid>
          </Grid>

         <Grid container className={cx("WorksCardListPanel__row", "area_row")}>
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">Memo</div>
            </Grid>
            <Grid item xs={9}>
              <Grid container className={cx("WorksCardListPanel__con", "WorksCardListPanel__memo", "contents")}>
                  <div className="WorksCardListPanel__memo_title">Willy Wonka chocolate lab's Memo</div>
                  <div className="WorksCardListPanel__memo_con">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unk
                  </div>
                <button className={cx("WorksCardListPanel__memo", "edit")}><CreateIcon style={{ fontSize: 16 }} /></button>
                <button className={cx("WorksCardListPanel__memo", "view")}>Veiw</button>
           </Grid>
          </Grid>
          </Grid>

         <Grid container className={cx("WorksCardListPanel__row", "area_row")}>
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">Direct Upload</div>
            </Grid>
            <Grid item xs={9}>
              <Grid container className="WorksCardListPanel__con">
                <Grid container className={cx("WorksCardListPanel__direct_upload", "table_title")}>
                  <Grid item xs={2}>No.</Grid>
                  <Grid item xs={6}>File Name</Grid>
                  <Grid item xs={2}>File Type</Grid>
                  <Grid item xs={2}>Check</Grid>
                </Grid>

                <Grid container className={cx("WorksCardListPanel__direct_upload", "table_contents")}>
                  <Grid item xs={2}>01</Grid>
                  <Grid item xs={6}>exocad_alice_zircon_001</Grid>
                  <Grid item xs={2}>zip</Grid>
                  <Grid item xs={2}>
                    <Radio
                      className={cx("WorksCardListPanel__radio_btn")}
                      style={{ width: 12, height: 12 }}
                      size="small"
                      checked={checked}
                      color="primary"
                      value="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }} />
                  </Grid>

                  <div className="WorksCardListPanel__table_btn_box">
                <button className="WorksCardListPanel__table_btn">Browse</button>
                <button className="WorksCardListPanel__table_btn">Upload</button>
                <button className="WorksCardListPanel__table_btn">Download</button>

                </div>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
  </Grid>
      

    </Styled.CaseCardDetail>
  );
}

const Styled = {
  CaseCardDetail: styled.div`

.WorksCardListPanel__row{
    padding-bottom: 15px;

    &.ribbon{
      padding-bottom: 20px;
    }

    &.area_row{
      padding-bottom: 20px;
    }
  }

  .MuiExpansionPanelDetails-root {
    padding: 0;
  }

  .WorksCardListPanel__info_box{
    padding: 15px;
  }
  
  .WorksCardListPanel__title{
  ${font(16, color.black_font)};
  font-weight: 600;
}

  .WorksCardListPanel__con{
  ${font(16, color.gray_font)};
}

.WorksCardListPanel__area_box{
  padding-top: 30px;
}

.WorksCardListPanel__title_ribbon_box {
  position: relative;
  ${font(16, color.gray_font)};
  width: 180px;
  height: 30px;
  left: 0;
  background: ${color.ribbon};
  top: 0;

    &:before {
      position: absolute;
      content: '';
      left: 180px;
      border-top: 15px solid ${color.ribbon};
      border-bottom: 15px solid ${color.ribbon};
      border-right: 10px solid transparent;
    }
}
.WorksCardListPanel__title_ribbon_box {
  &.receiver_ribbon{
  position: relative;
  ${font(16, color.gray_font)};
  width: 280px;
  height: 30px;
  left: 0;
  background: ${color.ribbon};
  top: 0;

    &:before {
      position: absolute;
      content: '';
      left: 280px;
      border-top: 15px solid ${color.ribbon};
      border-bottom: 15px solid ${color.ribbon};
      border-right: 10px solid transparent;
    }
  }
}

.WorksCardListPanel__title_ribbon_tx {
  line-height: 30px;
  color: ${color.white};
  padding-left: 10px;
}

.WorksCardListPanel_cloud_info{
  ${font(16, color.gray_font)};
  margin-right: 20px;
  display: inline-block;
}
.cloud__img_box{
  position: relative;
  top: 3px;
  margin-right: 5px;
}

.WorksCardListPaner_cloud_btn{
  padding: 5px 15px;
  background: ${color.blue};
  ${font(14, color.white)};
  margin-right: 5px;
  border-radius: 2px
}

.WorksCardListPanel__memo{
  
  &.edit{
    border: none;
    background:${color.blue};
    color:${color.white};
    padding: 5px;
    border-radius: 2px;
    margin-right: 5px;
    cursor: pointer;
  }
  &.view{
    ${font(14, color.white)};
    border: none;
    background:${color.blue};
    padding: 5px 15px;
    border-radius: 2px;
    cursor: pointer;
  }

}
.WorksCardListPanel__memo_title{
  ${font(14, color.black_font)};
  font-weight: 600;
  padding-bottom: 5px;
}

.WorksCardListPanel__memo_con{
  ${font(14, color.gray_font)};
  display: inline-block;
  width: 400px;
  padding-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.WorksCardListPanel__direct_upload{
  ${font(14, color.black_font2)};
  line-height: 30px;
  height: 30px;
  text-align: center;
  border-top: 1px solid ${color.grat_border6};

  &:last-child{
    border-bottom: 1px solid ${color.grat_border6};
  }
  &.table_title {
    background: ${color.blue_week_hover};
  }
}

.WorksCardListPanel__table_btn_box{}
.WorksCardListPanel__table_btn{
  padding: 5px 10px;
  border: 1px solid ${color.blue};
  ${font(14, color.blue)};
  background: none;
}


.MuiStepper-root {
  padding: 20px;
}
.MuiStepButton-root{
  width: 150%;
  margin: -24px -30px;
  padding: 24px 0;

}
.MuiStepConnector-alternativeLabel {
  top: 12px;
  left: calc(-50% + 4px);
  right: calc(50% + 19px);
  position: absolute;
}
.MuiStepLabel-labelContainer{
  ${font(14, color.gray_font)};
}
.MuiStepLabel-label{
  ${font(14, color.disable_btn)};
}
.MuiStepLabel-label.MuiStepLabel-active{
  ${font(14, color.blue)};
}
.MuiStepIcon-root{
  color: ${color.disable_btn};
}
.MuiStepIcon-root.MuiStepIcon-active {
  color: ${color.blue};
}
  `
}
export default CaseCardDetail;