import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';
import {
  beginAjaxCall, ajaxCallSuccess,
  ajaxCallError
} from './ajaxStatusActions';

const getMessagesSuccess = (id, data) => ({
  type: types.GET_MESSAGES_SUCCESS, id, data
});

const getMessagesFailure = () => ({
  type: types.GET_MESSAGES_FAILURE
});

const postMessageSuccess = message => ({
  type: types.POST_MESSAGE_SUCCESS, message
});

const postMessageFailure = () => ({
  type: types.POST_MESSAGE_FAILURE
});


const getMessages = groupId => (dispatch) => {
  dispatch(beginAjaxCall());
  return axios
    .get(`/api/group/${groupId}/messages`)
    .then((response) => {
      const data = response.data;
      dispatch(getMessagesSuccess(groupId, data));
      dispatch(ajaxCallSuccess());
    })
    .catch((error) => {
      dispatch(ajaxCallError());
      dispatch(getMessagesFailure());
      toastr.error(error.response.data.message);
    });
};

const postMessage = (id, message) => dispatch => axios
  .post(`/api/group/${id}/message`, message)
  .then((response) => {
    console.log("++++++ ", id);
    dispatch(postMessageSuccess(response.data.message));
    dispatch(getMessages());
  })
  .catch((error) => {
    dispatch(postMessageFailure());
    toastr.error(error.response.data.message);
  });


export {
  getMessages, getMessagesSuccess, getMessagesFailure,
  postMessage, postMessageSuccess, postMessageFailure
};
