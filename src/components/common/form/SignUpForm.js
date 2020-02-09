import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { color, font } from 'styles/__utils';
import { ENV_MODE_DEV } from 'lib/setting';
import { useImmer } from 'use-immer';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TermsOfUseInfo } from 'components/base/terms';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {VisibleEyes} from 'components/common/icon';


import {
  icon_lock,
  icon_house,
  icon_person,
  icon_spot,
  icon_email,
  icon_key,
  icon_check,
} from 'components/base/images';

function SignUpForm({
  onSubmit,
  error,
  countryData,
  cityData,
  onChange,
  onClick,
}) {
  const classes = useStyles();
  const [values, setValues] = useImmer({
    isPublicCheck: "public",
    storeName: "",
    nickname: "",
    conutry: {
      active: true,
    },
    city: {
      active: false,
    },
    email: {
      value: "",
      valid: false,
    },
    verificationCode: {
      value: "",
    },
    password: {
      value: '',
      show: false,
    },
    checkPassword: {
      value: '',
      show: false,
    }
  });

  const {
    isPublicCheck,
    storeName,
    nickname,
    email            : { value: emailVal },
    password         : { value: passwordVal, show: passwordShow },
    checkPassword    : { value: checkPasswordVal, show: checkPasswordShow },
    city             : { active: cityActive },
    verificationCode : { value: verificationCodeVal },
  } = values;

  const {
    email         : {isVaild:errorEmail, regEmail : isRegEmail, isVaildAttempt:errorAttempEmail} ,
    verifyCode    : {isVaild:errorVerifyCode, regVerifyCode : isRegVerifyCode},
    password      : {isVaild:errorPassword, regPassword : isRegPassword},
    checkPassword : {isVaild:errorCheckPassword},
    nickname      : {regNickName:isRegNickName},
    country       : {isVaild:errorCountry},
    city          : {isVaild:errorCity},
  } = error;


  const handleChange = prop => e => {
    const inputType = (prop === 'remember' || prop === 'auto') ? 'checked' : 'value';
    const targetValue = e.target[inputType];
    setValues(draft => {
      if (['email', 'password', 'checkPassword', 'city', 'country', 'verificationCode'].indexOf(prop) !== -1) {
        draft[prop].value = targetValue;
      } else {
        draft[prop] = targetValue;
      }
    });
  };
  const handleClick = (config) => e => {
    const { type, value } = config;
    if (type === 'verify') {
      const valueObj ={
        email:()=>onClick({ type: "verify", name: "email", value: {
          email:emailVal,
          verifyCode:verificationCodeVal
        } }),
        verificationCode:()=>onClick({ type: "verify", name: "verifyCode", value: {
          email:emailVal,
          verifyCode:verificationCodeVal
        } })
      }
      const fnClickValue = valueObj[value];
      if(fnClickValue) fnClickValue();

    } else if (type === 'eyeIcon') {
      setValues(draft => {
        draft[value].show = !draft[value].show;
      });

    }else if (type === 'selected'){
      if (value === 'country') {
        setValues(draft => {
          draft.city.active = true;
        });
      }
      onChange({
        type: value,
        value: e.target.value
      })
    }else if (type === 'submit'){
      onSubmit(values);
    }else if (type === 'preventDefault'){
      e.preventDefault();
    }
  };

  const devInsertAccount = () => {
    setValues(draft => {
      draft.storeName = '아무개 업체'
      draft.email.value = "hello@gmail.com";
      draft.email.vaild = true;
      draft.city.active = true;
      draft.nickname = "아무개";
      draft.password.value = "123a123a@";
      draft.password.show = true;
      draft.checkPassword.value = "123a123a@";
      draft.checkPassword.show = true;
      draft.verificationCode.value = 'q1w2e3r4';
    })
  };
  

  return (
    <Styled.SignUpForm>
      <h1 className="signup__title">DOF Launcher 계정 만들기
      {ENV_MODE_DEV && true && <Button
          variant="contained"
          color="inherit"
          style={{ marginBottom: 20 }}
          onClick={devInsertAccount}>Dev Test</Button>}
      </h1>

      <form action="" className={classes.root}>
        <Grid container spacing={3}>
          <Grid container >
            <Grid item xs={3}>
              <label htmlFor="isPublic" className="input__label">
                <span className="label__img_box">
                  <img src={icon_lock} alt="icon_lock" />
                </span>
                <span>
                  공개여부
              </span>
              </label>
            </Grid>
            <Grid item xs={8}>
              <RadioGroup aria-label="position" name="position" value={isPublicCheck} onChange={handleChange(`isPublicCheck`)} row>
                <FormControlLabel
                  value="public"
                  control={<Radio color="default" size="small" />}
                  label={<span className="signup__input public text">전체 공개</span>}
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="partner"
                  control={<Radio color="default" size="small" />}
                  label={<span className="signup__input public text">파트너 맺은 업체에만 공개</span>}
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="privacy"
                  control={<Radio color="default" size="small" />}
                  label={<span className="signup__input public text">비공개</span>}
                  labelPlacement="end"
                />
              </RadioGroup>
              <div className={cx(`input__info`)}>
                <span className={cx(`input__info text`, { active: false })}>-</span>
              </div>
            </Grid>
          </Grid>

          <Grid container >
            <Grid item xs={3}>
              <label htmlFor="storeName" className="input__label">
                <span className="label__img_box">
                  <img src={icon_house} alt="icon_house" />
                </span>
                <span>
                  업체명
              </span>
              </label>
            </Grid>
            <Grid item xs={8}>
              <TextField
                error={false}
                id="storeName"
                name="storeName"
                value={storeName}
                onChange={handleChange(`storeName`)}
                variant="outlined"
                fullWidth
                inputProps={{
                  maxLength: 25,
                }}
              />
              <div className={cx(`input__info`)}>
                <span className={cx(`input__info text`, { active: false })}>-</span>
              </div>
            </Grid>
          </Grid>

          <Grid container >
            <Grid item xs={3}>
              <label htmlFor="nickname" className="input__label">
                <span className="label__img_box">
                  <img src={icon_person} alt="icon_mypage_person" />
                </span>
                <span>
                  이름
              </span>
              </label>
            </Grid>
            <Grid item xs={8}>
              <TextField
                error={false}
                id="nickname"
                value={nickname}
                name="nickname"
                onChange={handleChange(`nickname`)}
                variant="outlined"
                fullWidth
                inputProps={{
                  maxLength: 25,
                }}
              />
              <div className={cx(`input__info`)}>
                <span className={cx(`input__info text`, { active: isRegNickName === false })}>
                  *이름을 확인해주세요.
                </span>
              </div>
            </Grid>
          </Grid>

          <Grid container >
            <Grid item xs={3}>
              <label htmlFor="area" className="input__label">
                <span className="label__img_box">
                  <img src={icon_spot} alt="icon_spot" />
                </span>
                <span>
                  지역
              </span>
              </label>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl} variant="outlined">
                    <Select
                      value={countryData.current}
                      onChange={handleClick({type:'selected',value:'country'})}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem disabled value="">
                        <em>국가선택</em>
                      </MenuItem>
                      {Array.isArray(countryData.list) && countryData.list.map(item => (
                        <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl} disabled={!cityActive} variant="outlined">
                    <Select
                      value={cityData.current}
                      onChange={handleClick({type:"selected",value:"city"})}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem disabled value="">
                        <em>선택</em>
                      </MenuItem>
                      {Array.isArray(cityData.list) && cityData.list.map(item => (
                        <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <div className={cx(`input__info`)}>
                <span className={cx(`input__info text`, { active: errorCountry === false || errorCity ===false})}>
                *국가 or 지역을 확인해주세요.
                </span>
              </div>
            </Grid>
          </Grid>

          <Grid container >
            <Grid item xs={3}>
              <label htmlFor="email" className="input__label">
                <span className="label__img_box">
                  <img src={icon_email} alt="icon_email" />
                </span>
                <span>
                  이메일주소
              </span>
              </label>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <TextField
                    // error={errorEmail}
                    id="email"
                    value={emailVal}
                    name="email"
                    onChange={handleChange(`email`)}
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    className={cx(classes.btn, `blue`)}
                    onClick={handleClick({ type: "verify", value: 'email' })}
                  >확인</Button>
                </Grid>
              </Grid>
              <div className={cx(`input__info email`)}>
                <span className={cx(`input__info text`, { active: (errorEmail || isRegEmail === false || errorAttempEmail) })}>
                  {isRegEmail === false && '*이메일 형식이 맞지 않습니다'}
                  {errorEmail && "*사용 중인 이메일 주소입니다. 다른 메일주소를 입력해주세요."}
                  {isRegEmail && errorAttempEmail && "*이메일 인증을 진행해주세요."}
                  {/* 중복 or 인증코드 전송 */}
                  .
              </span>
              </div>
            </Grid>
          </Grid>

          <Grid container >
            <Grid item xs={3}>
              <label htmlFor="verificationCode" className="input__label">
                <span className="label__img_box">
                  <img src={icon_email} alt="icon_email" />
                </span>
                <span>
                  인증코드
              </span>
              </label>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={10}>
                  <TextField
                    // error={errorEmail}
                    id="verificationCode"
                    value={verificationCodeVal}
                    name="verificationCode"
                    onChange={handleChange(`verificationCode`)}
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    className={cx(classes.btn, `blue`)}
                    onClick={handleClick({ type: "verify", value: `verificationCode` })}
                  >인증</Button>
                </Grid>
              </Grid>
              <div className={cx(`input__info email`)}>
                <span className={cx(`input__info text`, { active: errorVerifyCode || isRegVerifyCode === false })}>
                  *인증코드를 확인해주세요."
              </span>
              </div>
            </Grid>
          </Grid>


          <Grid container>
            <Grid item xs={3}>
              <label htmlFor="password" className="input__label">
                <span className="label__img_box">
                  <img src={icon_key} alt="icon_key" />
                </span>
                <span>
                  비밀번호
              </span>
              </label>
            </Grid>
            <Grid item xs={8}>
              <OutlinedInput
                // error={errorPassword}
                id="password"
                type={passwordShow ? 'text' : 'password'}
                value={passwordVal}
                onChange={handleChange('password')}
                className={classes.input}
                autoComplete="off"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClick({ type: "eyeIcon", value: `password` })}
                      onMouseDown={handleClick({type:"preventDefault"})}
                      edge="end"
                      className={classes.eyeIcon}
                    >
                      <VisibleEyes show={values.password.show}/>
                      
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={0}
              />
              <div className={cx(`input__info password`)}>
                <span className={cx(`input__info text`, { active: errorPassword || isRegPassword === false })}>
                  *8자 이상 16자 이하의 문자, 숫자 및 특수 문자를 조합하여 비밀번호를 설정해주세요.
              </span>
              </div>
            </Grid>
          </Grid>

          <Grid container >
            <Grid item xs={3}>
              <label htmlFor="checkPassword" className="input__label">
                <span className="label__img_box">
                  <img src={icon_check} alt="icon_check" />
                </span>
                <span>
                  비밀번호확인
              </span>
              </label>
            </Grid>
            <Grid item xs={8}>
              <OutlinedInput
                // error={errorPassword}
                id="checkPassword"
                type={checkPasswordShow ? 'text' : 'password'}
                value={checkPasswordVal}
                onChange={handleChange('checkPassword')}
                className={classes.input}
                autoComplete="off"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClick({ type: "eyeIcon", value: `checkPassword` })}
                      onMouseDown={handleClick({type:"preventDefault"})}
                      edge="end"
                      className={classes.eyeIcon}
                    >
                      <VisibleEyes show={values.checkPassword.show}/>
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={0}
              />
              <div className={cx(`input__info checkPassword`)}>
                <span className={cx(`input__info text`, { active: errorCheckPassword })}>
                  *비밀번호가 일치하지 않습니다.
              </span>
              </div>
            </Grid>
          </Grid>


          <Grid item xs={12} sm={12}>
            <div className="signup__btn_box">
              <Button
                variant="contained"
                color="primary"
                className={cx(classes.btn, 'signup bold')}
                name="user"
                onClick={handleClick({type:"submit"})}>
                동의하고 계정 생성하기
            </Button>
            </div>
          </Grid>

        </Grid>
      </form>
      <TermsOfUseInfo />
      <p className="signup__info login">이미 계정이 있으신가요?
        <span className="login__info"><Link to="/auth/signin">로그인하기</Link></span>
      </p>

    </Styled.SignUpForm>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  textField: {
    width: '100%',
    marginBottom: 25,
  },
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
    '&.signup': {
      width: `300px`,
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
  },
  formControl: {
    width: `100%`
  },
  input: {
    height: 35,
  },
  label: {
    fontSize: 14,
    top: `-17%`,
  },
  eyeIcon: {
    fontSize: 15
  },
}));

const Styled = {
  SignUpForm: styled.div`
    width:580px;
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{
      border-color:${color.blue}
    }
    .signup__info{
      margin-top:20px;
      ${font(12, color.black_font2)};
      &.login{
        text-align:center;
      }
    }
    .signup__title{
      ${font(27, color.black_font2)};
      text-align:center;
      margin-bottom:50px;
    }
    .signup__btn_box{
      margin-bottom:12px;
      margin-top:30px;
      text-align:center;
    }
    .login__info{
      ${font(12, color.blue_font)};
      font-weight:bold;
      margin-left:10px;
      &:hover{
        text-decoration:underline;
        text-underline-position:under;
      }
    }
    .signup__input{
      &.public.text{
        ${font(12, color.gray_font)};
      }
    }
    .input__info{
      padding:5px 0;
      padding-bottom:10px;
      &.text{
        transition:.3s;
        opacity:0;
        ${font(12, color.blue_font)};
        color:red;
        &.active{
          opacity:1;
        }
      }
    }
    .label__img_box{
      margin-right:5px;
      opacity:0;
      &>img{
        position:relative;
        top:2px;
        width:14px;
        height:16px;
      }
    }
    .input__label{
      position:relative;
      top:8px;
      display:block;
      ${font(14, color.black_font)};
      font-weight:bold;
    }
    .MuiSelect-outlined.MuiSelect-outlined{
      padding:10px ;
    }
  `
}

export default SignUpForm;