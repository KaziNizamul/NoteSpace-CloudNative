import axios from "axios";
import {
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import userPool from "./core/userPool";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const NOTES_ENDPOINT = "/notesapp";

export const getNotes = async () => {
  const response = await axios.get(NOTES_ENDPOINT);
  return response.data;
};

export const getNoteById = async (noteId) => {
  const response = await axios.get(`${NOTES_ENDPOINT}/${noteId}`);
  return response.data;
};

export const updateNoteById = async (noteId, updatedNote) => {
  const response = await axios.put(`${NOTES_ENDPOINT}/${noteId}`, updatedNote);
  return response.data;
};

export const createNote = async (note) => {
  const response = await axios.post(NOTES_ENDPOINT, note);
  return response.data;
};

export const deleteNote = async (noteId) => {
  const response = await axios.delete(`${NOTES_ENDPOINT}/${noteId}`);
  return response.data;
};

export const login = async (credentials) => {
  const { email = "", password = "" } = credentials || {};
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const register = async (userData) => {
  const { email = "", name = "", password = "" } = userData || {};
  const attributeList = [
    new CognitoUserAttribute({ Name: "email", Value: email }),
    new CognitoUserAttribute({ Name: "name", Value: name }),
  ];
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ result, needsVerification: true });
      }
    });
  });
};

export const confirmRegistration = (email, code) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
