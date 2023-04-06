import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateReimbursements = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [reimbursements, setReimbursements] = useState([]);

  useEffect(() => {
    fetchReimbursements();
  }, []);

  const fetchReimbursements = async () => {
    try {
      const response = await axios.get('/api/reimbursements');
      setReimbursements(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/reimbursements', {
        title,
        description,
        amount,
        assignedTo,
        status: 'pending',
      });

      setReimbursements([...reimbursements, response.data]);

      setTitle('');
      setDescription('');
      setAmount('');
      setAssignedTo('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`/api/reimbursements/${id}`, { status });

      const updatedReimbursements = reimbursements.map((reimbursement) =>
        reimbursement._id === id ? { ...reimbursement, status } : reimbursement
      );

      setReimbursements(updatedReimbursements);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    const reimbursement = reimbursements.find((reimbursement) => reimbursement._id === id);
    setTitle(reimbursement.title);
    setDescription(reimbursement.description);
    setAmount(reimbursement.amount);
    setAssignedTo(reimbursement.assignedTo);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/reimbursements/${id}`);

      const updatedReimbursements = reimbursements.filter((reimbursement) => reimbursement._id !== id);

      setReimbursements(updatedReimbursements);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create Reimbursements</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <br />
        <label>
          Assigned To:
          <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
            <option value="">Select a person/manager</option>
            <option value="person1">Person 1</option>
            <option value="person2">Person 2</option>
            <option value="manager1">Manager 1</option>
            <option value="manager2">Manager 2</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Reimbursement</button>
      </form>
      <hr />
      <h2>Existing Reimbursements</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reimbursements.map((reimbursement) => (
            <tr key={reimbursement._id}>
              <td>{reimbursement.title}</td>
              <td>{reimbursement.description}</td>
              <td>{reimbursement.amount}</td>
              <td>{reimbursement.assignedTo}</td>
              <td>{reimbursement.status}</td>
              <td>
                <button onClick={() => handleUpdateStatus(reimbursement._id, 'approved')}>Approve</button>
                <button onClick={() => handleUpdateStatus(reimbursement._id, 'rejected')}>Reject</button>
                <button onClick={() => handleEdit(reimbursement)}>Edit</button>
                <button onClick={() => handleDelete(reimbursement._id)}>Delete</button>
            </td>
            </tr>
          ))}
       </tbody>
      </table>
      </div>
)};
export default CreateReimbursements;
