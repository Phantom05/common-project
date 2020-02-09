import React from 'react';
import styled from 'styled-components';
import {useImmer} from 'use-immer';
import { color } from 'styles/__utils';
import {TextLine} from 'components/common/textLabel';
import {ModifyMypageInfo} from 'components/common/form';
import cx from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function MypageInfo(props) {
    const {
        initData,
        onChange,
        onClick,
        countryData,
        cityData
    } = props;

    const {info, update} = initData;
    console.log(JSON.stringify(info));
    const classes = useStyles();
    
    const [valid, setValid] = useImmer({
        viewModify: true
    })

    const textConf = [
        '프로필 사진',
        '고유번호',
        '공개여부',
        '타입',
        '업체명',
        '담당자',
        '이메일 주소',
        '지역',
        '연락처',
        '주소'
    ];

    const styleConf = {
        _color: "#777777"
    }

    const handleModify = () => {
        console.log("change ");
        setValid(draft => {
            draft.viewModify = !valid.viewModify;
        });
    }


    return (
        <Styled.MyPageWrap>
            {
                valid.viewModify?
                <>
                <ModifyMypageInfo
                onClick={onClick}
                onChange={onChange}
                countryData={countryData}
                cityData={cityData}
                handleModify={handleModify}
                update={update}
                />
                {/* <Button
                    variant="contained"
                    className={cx(classes.btn, `blue`, `confirm`)}
                    onClick={onSubmit({ type: "confirm", value: `verificationCode` })}
                  >Confirm</Button> */}
                </>
                :
                <>
                <Styled.MypageListBox>
                {
                    Object.keys(info).map((i, index) => {
                        if(i !== 'profile'){
                        return (
                            <TextLine
                            key={index}
                            styleConf={styleConf}
                            cont={{
                                label: textConf[index],
                                text: info[i],
                                type: "txt"
                            }}
                            />
                            )
                        }else if(i === 'profile'){
                            return (
                            <TextLine 
                            key={index}
                            styleConf={styleConf}
                            cont={{
                                label: textConf[index],
                                img: info[i],
                                type: "img"
                            }}
                            />
                            )
                        }
                    })
                }
                </Styled.MypageListBox>
                <Button
                        variant="contained"
                        className={cx(classes.btn, `blue`, `modify`)}
                        onClick={handleModify}
                    >Modify</Button>
                </>
            }
            
        </Styled.MyPageWrap>
    );
}

const useStyles = makeStyles(theme => ({
    btn: {
      display: 'inline-block',
      margin: 'auto',
      border: `1px solid ${color.blue}`,
      boxShadow: 'none',
      '&.bold': {
        fontWeight: 'bold'
      },
      '&:hover': {
        border: `1px solid ${color.blue}`,
      },
      '&.modify, &.confirm': {
        width: `100px`,
        background: `${color.blue}`,
        '&:hover': {
          boxShadow: 'none',
          background: `${color.blue_hover}`
        },
      },
      '&.blue': {
        color: `white`,
        background: `${color.blue}`,
        '&:hover': {
          boxShadow: 'none',
          background: `${color.blue_hover}`
        },
      },
    }
  }));

const Styled = {
    MyPageWrap: styled.div`
        padding: 32px 20px;
        
    `,
    MypageListBox: styled.div`
        position: relative;
        div + div{
            margin-top: 24px;
        }
    `,
    
}


export default MypageInfo;