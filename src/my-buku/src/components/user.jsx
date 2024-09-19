import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newUser, setNewUser] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3000/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
      })
        .then(() => fetchData())
        .catch(error => console.error('Error deleting data:', error));
    }
  };

  const startEditing = (user) => {
    setEditingUser(user);
    setEditedData({ ...user });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const addUser = () => {
    const requiredFields = ['name', 'email', 'password'];

    const isValid = requiredFields.every(field => newUser[field]);

    if (!isValid) {
      alert('Please fill in all fields');
      return;
    }

    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error('Network response was not ok: ' + text);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Add response:', data);
        fetchData();
        setNewUser({});
        setShowAddForm(false);
      })
      .catch(error => {
        console.error('Error adding data:', error);
        alert('Error adding data: ' + error.message);
      });
  };

  const updateUser = (id) => {
    const requiredFields = ['name', 'email', 'password'];
  
    // Check that all required fields have been filled
    const isValid = requiredFields.every(field => editedData[field]);
  
    if (!isValid) {
      alert('Please fill in all fields');
      return;
    }
  
    // Make a PUT request to the server to update the user
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedData), // Send edited data
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error('Network response was not ok: ' + text);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Update response:', data);
        fetchData(); // Refresh the data
        setEditingUser(null); // Clear the editing state
      })
      .catch(error => {
        console.error('Error saving data:', error);
        alert('Error saving data: ' + error.message);
      });
  };
  

  const cancelEditing = () => {
    setEditingUser(null);
  };

  const cancelAdding = () => {
    setNewUser({});
    setShowAddForm(false);
  };

  const renderTable = () => (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.nama}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-primary" onClick={() => startEditing(user)}>Edit</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Users</h1>

          {/* Add User Button */}
          {!showAddForm && !editingUser && (
            <div className="mb-3 text-end">
              <button className="btn btn-success" onClick={() => setShowAddForm(true)}>
                <i className="bi bi-plus"></i> Add New User
              </button>
            </div>
          )}

          {/* Add User Form */}
          {showAddForm && (
            <div>
              <h2>Add New User</h2>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={newUser.name || ''}
                    onChange={handleNewUserChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={newUser.email || ''}
                    onChange={handleNewUserChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={newUser.password || ''}
                    onChange={handleNewUserChange}
                  />
                </div>
                <button type="button" onClick={addUser} className="btn btn-success">
                  <i className="bi bi-check2"></i> Add
                </button>
                <button type="button" onClick={cancelAdding} className="btn btn-secondary">
                  <i className="bi bi-x"></i> Cancel
                </button>
              </form>
            </div>
          )}

          {/* Edit User Form */}
          {editingUser && (
            <div>
              <h2>Edit User</h2>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={editedData.name || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={editedData.email || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={editedData.password || ''}
                    onChange={handleChange}
                  />
                </div>
                <button type="button" onClick={() => updateUser(editingUser.id)} className="btn btn-primary">
                  <i className="bi bi-save"></i> Save
                </button>
                <button type="button" onClick={cancelEditing} className="btn btn-secondary">
                  <i className="bi bi-x"></i> Cancel
                </button>
              </form>
            </div>
          )}

          {/* Render Table */}
          {!showAddForm && !editingUser && renderTable()}
        </div>
      </div>
    </div>
  );
}

export default Users;
