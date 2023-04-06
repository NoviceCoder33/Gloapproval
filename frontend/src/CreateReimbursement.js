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
    const res = await axios.get('/api/reimbursements');
    setReimbursements(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReimbursement = {
      title,
      description,
      amount,
      assignedTo,
    };

    await axios.post('/api/reimbursements', newReimbursement);
    fetchReimbursements();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/reimbursements/${id}`);
    fetchReimbursements();
  };

  const handleUpdateStatus = async (id, status) => {
    await axios.patch(`/api/reimbursements/${id}`, { status });
    fetchReimbursements();
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
