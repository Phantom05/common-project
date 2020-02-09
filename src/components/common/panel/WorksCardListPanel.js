import React from 'react';
import styled from 'styled-components';
import { font, color } from 'styles/__utils';
import { WorksCard } from 'components/common/card';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import cx from 'classnames';
import {CaseCardDetail} from 'components/common/info';


function WorksCardList(props) {

  const [checked, setChecked] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);


  const handleChangeCard = event => {
    setChecked(event.target.checked);
  };
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let worksList = [];
  const labelColor = ['green', 'orange', 'red', 'blue'];

  for (let i = 0; i < 3; i++) {
    const ranNum = Math.floor(Math.random() * labelColor.length);
    worksList.push(
      <>
        <ExpansionPanel key={i} expanded={expanded === `panel${i}`}
          onChange={handleChange(`panel${i}`)}
        >
          <ExpansionPanelSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel1bh-content`}
            id={`panel${i}bh-header`}
          >
            <WorksCard labelColor={labelColor[ranNum]} />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={1}></Grid>
              <Grid item xs={11}>
                <Typography>
                  <CaseCardDetail />
                  {/* 리스트 열었을 때 내용 */}

                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    );
  }
  return (
    <Styled.WorksCardList >

      <Grid container className="WorksCardList__row">
        <Grid item xs className="WorksCardList__date">2020-02-05 </Grid>
        {worksList}
      </Grid>


    </Styled.WorksCardList>
  );
}

const Styled = {
  WorksCardList: styled.div`
  
  .MuiExpansionPanelSummary-root{
    padding:0;
  }

  .MuiExpansionPanel-root:before,.MuiExpansionPanel-root:after{
    opacity:0;
  }

  .MuiPaper-elevation1{
    box-shadow:none;
  }

  .WorksCardList__date {
    padding: 10px 15px;
    ${font(16, color.black_font)};
    background: ${color.blue_line_bg};
    margin-bottom: 20px;    
  }
 




`
}


export default WorksCardList;
