import {bindActionCreators} from 'redux';
import * as actions from 'store/actions';
import store from 'store';

export const {dispatch} = store;
export const Actions = bindActionCreators(actions, dispatch);


