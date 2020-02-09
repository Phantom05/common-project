import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { PlainTooltip } from 'components/common/tooltip';
import styled from 'styled-components';
import cx from 'classnames';
import { useImmer } from 'use-immer';
import { TeethModule } from 'components/common/module';
import CreateIcon from '@material-ui/icons/Create';
import {color,font} from 'styles/__utils';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import {CaseMemo} from 'components/common/case';
import {Visible} from 'components/base/helpers/visible';



function MemoTitle(props){
  const classes = useStyles();
  const {title,
    // type,
    showEditBtn} = props;
  return (
    <Typography className={classes.heading}>
    <span className="title__text">{title}</span> 
    {showEditBtn && 
      <span 
        className="edit__icon right" 
        // onClick={()=>handleClickEdit(type)}
      > <CreateIcon fontSize="small"/></span>  
    }
  </Typography>
  )
}

function CasePanel(props) {
  const { type,onClick,onChange ,values,onSubmit,info,profile} = props;
  const classes = useStyles();
  const [panel, setPanel] = useImmer({
    indication: {
      isOpen: true,
      hidden: false,
      isEdit:false,
    },
    sender: {
      isOpen: true,
      hidden: false,
      isEdit: false,
      editor:{
        content:``
      }
    },
    receiver: {
      isOpen: true,
      hidden: false,
      isEdit: false,
      editor:{
        content:``
      }
    },
    heading:{
      position:'relative'
    }
  });

  const isSenderEdit = panel.sender.isEdit;
  const isReceiverEdit = panel.receiver.isEdit;
  const isIndicationEdit = panel.indication.isEdit;

  const senderContent = values.memo.sender.content;
  const receiverContent = values.memo.receiver.content;

  const isCreateType = type === 'create';
  const isSelfCase = profile.userCode === info.userCode;
  
  
  // default setting
  useEffect(() => {
    if (isCreateType) {
      setPanel(draft => {
        draft.indication.isEdit = true;
        draft.sender.isEdit = true;
        draft.receiver.isEdit = true;
        draft.receiver.hidden = true;
      })
    }
  }, [setPanel,type]);


  const handleClickEdit = (name)=>{
    // setPanel(draft => {
    //   draft[name].isEdit = true;
    // })
  }

  const handleChange = type => (config)=>{
    onChange({type:'memo',name:type,value:config.data});
  }


  return (
    <Styled.CasePanel className={classes.root}>
      {/* 인디케이션 부분 */}
      <hr className="boundery__line"/>
      <ExpansionPanel
        className={cx('panel', { hidden: panel.indication.hidden })}
        expanded={panel.indication.isOpen}
      >
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          // onClick={(e)=>handleClick(e,'indication')}
        >
          <Typography className={classes.heading}>
            <span className="title__text">Indication </span>
            <PlainTooltip
              type="help"
              title={`환자 치아 정보를 입력할 수 있습니다.
              세팅이 완료된 결과값을 미리볼 수 있으며 인디케이션 설정을 통해 보다 정확한 정보를 전달할 수 있습니다.`}
              placement="right-start"
            />
            <span 
              className="edit__icon right font"
              onClick={()=>handleClickEdit({type:'edit',name:'indication'})}
            > 
            {/* isIndicationEdit */}
            <Visible  
              show={isCreateType || isSelfCase} 
              success={ <Button 
                variant="contained" 
                className="CreateCase__button CreateCase__button-blue float-right" 
                component="span">SET</Button>}
            />
            
            </span>
          </Typography>
        </ExpansionPanelSummary>
        <TeethModule />
      </ExpansionPanel>

      {/* 메모부분 */}
      <hr className="boundery__line"/>
      <ExpansionPanel
        className={cx('panel', { hidden: panel.sender.hidden })}
        expanded={panel.sender.isOpen}
      >
        <ExpansionPanelSummary
          aria-controls="panel2a-content"
          id="panel2a-header"
          // onClick={(e)=>handleClick(e,'sender')}
        >
          {/* !isSenderEdit ||  */}
          <MemoTitle 
            title={"Sender's  Memo"}
            showEditBtn={
              false
              // isCreateType
            }
            type={{type:'edit',name:'sender'}}
          />
        </ExpansionPanelSummary>
        
        <ExpansionPanelDetails>
          <Visible  
            show={isCreateType || isSelfCase} 
            failure={info.senderMemo || ""}
            success={<CaseMemo content={info.senderMemo || ""} onChange={handleChange('sender')} />}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
          className={cx('panel', { hidden: panel.receiver.hidden })}
          expanded={panel.receiver.isOpen}
        >
        <ExpansionPanelSummary
          aria-controls="panel3a-content"
          id="panel3a-header"
          // onClick={(e)=>handleClick(e,'receiver')}
        >
          {/* edit={!isReceiverEdit} */}
          <MemoTitle 
            title={"Recevier's  Memo"}
            showEditBtn={false}
            type={{type:'edit',name:'receiver'}}
          />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Visible  
              show={isCreateType || isSelfCase} 
              failure={info.receiverMemo || ""}
              success={<CaseMemo content={info.receiverMemo || ""} onChange={handleChange('receiver')}/>}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      
      

      {/* 마지막 버튼 부분*/}
 
      {(isCreateType || isSelfCase)&&
        <div className="upload__button_box">
        <hr className="boundery__line bottom"/>
          <Tooltip
            // arrow
            title={<Styled.CaseTooltip>생성된 케이스 데이터를 클라우드에 업로드합니다.</Styled.CaseTooltip>} placement="top-start"
            PopperProps={{
              popperOptions: {
              },
            }}
          >
            <Button 
              onClick={onClick('cloud')}
              variant="contained" 
              className="CreateCase__button CreateCase__button-white" 
              component="span">Upload Cloud</Button>
          </Tooltip>
          <Button 
            onClick={onSubmit('create')}
            variant="contained" 
            className="CreateCase__button CreateCase__button-blue float-right" 
            component="span">{isSelfCase?'Change':"Create"}</Button>
        </div>
      }
        
    </Styled.CasePanel>
  );
}

export default CasePanel;


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


const Styled = {
  CasePanel: styled.div`

    .panel{
      &.hidden{
        display:none;
      }
    }
    .MuiPaper-elevation1{
      box-shadow:none
    }
    .boundery__line{
      border:.5px solid ${color.grat_border6};
      &.bottom{
        margin-bottom:28px;
      }
    }
    .title__text{
      ${font(18,color.black)};
    }
    .MuiExpansionPanelSummary-root{
      padding:0;
    }
    .MuiExpansionPanelDetails-root{
      padding:5px;
    }
    .CreateCase__button{
      box-shadow:none;
      border-radius:3px;
      font-weight:600;
      &-blue{
        border:2px solid ${color.blue};
        background:${color.blue};
        color:white;
        &:hover{
          background:${color.blue_hover};
          box-shadow:none;
        }
      }
      &-white{
        border:1px solid ${color.blue};
        background:white;
        color:${color.blue};
        &:hover{
          background:white;
          box-shadow:none;
        }
      }
    }
    .upload__button_box{
      width:100%;
      background:white;
      margin-top:28px;
      z-index:10;
      
      &:after{
        display:block;
        content:"";
        clear: both;
      }
      .float-right{
        float:right;
      }
    }
    .MuiExpansionPanelSummary-root.Mui-expanded{
      cursor: default !important;
    }
    .MuiExpansionPanelSummary-content{
      position:relative;
      cursor: default;
    }
    .MuiExpansionPanel-root:before{
      height:0;
    }
    .edit__icon{
      display:inline-block;
      background:${color.blue};
      border-radius:2px;
      color:white;
      padding:2px 5px;
      cursor: pointer;
      &.right{
        position:absolute;
        right:0;
        top:50%;
        transform:translateY(-50%);
      }
      &.font{
        ${font(16,'white')};
        padding:0;
      }
    }
  `,
  CaseTooltip:styled.span`
     display:inline-block;
    font-size:12px;
    padding:5px;
  `
}





    // const handleClick = (e,name) => {
  //   e.stopPropagation();
  //   setPanel(draft => {
  //     {
  //       draft[name].isOpen = !draft[name].isOpen
  //     }
  //   })
  // };

      // if(['sender','receiver'].indexOf(type) !== -1){
    //   setPanel(draft=>{
    //     draft[type].editor.content = config.data;
    //   })
    // }