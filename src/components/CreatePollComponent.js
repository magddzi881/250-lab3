import React, { useState, useEffect } from 'react';
import { createPoll, getUsers, createVoteOption } from '../api';

const CreatePollComponent = () => {
  const [question, setQuestion] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voteOptions, setVoteOptions] = useState([]);
  const [newOption, setNewOption] = useState('');

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

  const handleAddOption = () => {
    if (newOption) {
      setVoteOptions([...voteOptions, newOption]);
      setNewOption('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the poll
      const pollResponse = await createPoll({ question, creator: { id: creatorId } });
      const pollId = pollResponse.data.id;

      // Create vote options for the new poll
      await Promise.all(voteOptions.map((option, index) =>
        createVoteOption({
          pollId,
          caption: option,
          presentationOrder: index + 1
        })
      ));

      setMessage('Poll and vote options created successfully!');
      setVoteOptions([]);
    } catch (error) {
      setMessage('Error creating poll or vote options.');
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="container">
      <h2>Create Poll</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={creatorId}
          onChange={(e) => setCreatorId(e.target.value)}
        >
          <option value="" disabled>Select Creator</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Poll Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Add vote option"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
        />
        <button type="button" onClick={handleAddOption}>Add Option</button>
        
        {voteOptions.length > 0 && (
          <table className="vote-options-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {voteOptions.map((option, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{option}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
<button
  type="submit"
  disabled={!creatorId || voteOptions.length < 2}
>
  Create Poll
</button>

      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreatePollComponent;
