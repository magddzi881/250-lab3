import axios from 'axios';

const API_URL = 'http://localhost:8080'; 

export const createUser = (user) => axios.post(`${API_URL}/users`, user);
export const getUsers = () => axios.get(`${API_URL}/users`);
export const createPoll = (poll) => axios.post(`${API_URL}/polls`, poll);
export const getPolls = () => axios.get(`${API_URL}/polls`);
export const castVote = (vote) => axios.post(`${API_URL}/votes`, vote);
export const getVoteOptions = (pollId) => axios.get(`${API_URL}/voteOptions/poll/${pollId}`);
export const createVoteOption = (voteOption) => axios.post(`${API_URL}/voteOptions`, voteOption);
