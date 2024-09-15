import React, { useState, useEffect } from 'react';
import { getPolls, getVoteOptions, castVote, getUsers } from '../api';

const VoteComponent = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [voteOptions, setVoteOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      const { data } = await getPolls();
      setPolls(data);
    };
    fetchPolls();
  }, []);

  const handlePollSelect = async (pollId) => {
    setSelectedPoll(pollId);
    const { data } = await getVoteOptions(pollId);
    setVoteOptions(data);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setMessage('Error fetching users.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleVote = async () => {
    try {
      const vote = { user: { id: creatorId }, voteOption: { id: selectedOption } };
      await castVote(vote);
      setMessage('Vote cast successfully!');
    } catch (error) {
      setMessage('Error casting vote.');
    }
  };

  if (loading) return <p>Loading users...</p>;

  const isVoteButtonDisabled = !creatorId || !selectedOption;

  return (
    <div className="container">
      <h2>Vote on a Poll</h2>
      <select onChange={(e) => handlePollSelect(e.target.value)}>
        <option>Select a poll</option>
        {polls.map((poll) => (
          <option key={poll.id} value={poll.id}>
            {poll.question}
          </option>
        ))}
      </select>

      {voteOptions.length > 0 && (
        <div>
          <select
            value={creatorId}
            onChange={(e) => setCreatorId(e.target.value)}
          >
            <option value="" disabled>Select Voting User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>

          <div className="vote-options">
            {voteOptions.map((option) => (
              <button
                key={option.id}
                className={`toggle-button ${selectedOption === option.id ? 'active' : ''}`}
                onClick={() => setSelectedOption(option.id)}
              >
                {option.caption}
              </button>
            ))}
          </div>

          <button onClick={handleVote} disabled={isVoteButtonDisabled}>
            Vote
          </button>
        </div>
      )}
      {message && <p >{message}</p>}
    </div>
  );
};

export default VoteComponent;
