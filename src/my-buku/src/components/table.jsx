import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
function BukuTamu() {
  const [buku, setBuku] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [newEntry, setNewEntry] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3000/api/bukutamu')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBuku(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const deleteBuku = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      fetch(`http://localhost:3000/api/bukutamu/${id}`, {
        method: 'DELETE',
      })
        .then(() => fetchData())
        .catch(error => console.error('Error deleting data:', error));
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setEditedData({ ...item });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNewEntryChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const addBuku = () => {
    const requiredFields = ['nama_tamu', 'no_hp', 'jabatan', 'unit_kerja', 'tujuan', 'yang_dituju', 'keterangan'];

    const isValid = requiredFields.every(field => newEntry[field]);

    if (!isValid) {
      alert('Please fill in all fields');
      return;
    }

    fetch('http://localhost:3000/api/bukutamu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
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
        setNewEntry({});
        setShowAddForm(false);
      })
      .catch(error => {
        console.error('Error adding data:', error);
        alert('Error adding data: ' + error.message);
      });
  };

  const updateBuku = (id) => {
    const requiredFields = ['nama_tamu', 'no_hp', 'jabatan', 'unit_kerja', 'tujuan', 'yang_dituju', 'keterangan'];

    const isValid = requiredFields.every(field => editedData[field]);

    if (!isValid) {
      alert('Please fill in all fields');
      return;
    }

    fetch(`http://localhost:3000/api/bukutamu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedData)
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
        fetchData();
        setEditingItem(null);
      })
      .catch(error => {
        console.error('Error saving data:', error);
        alert('Error saving data: ' + error.message);
      });
  };

  const cancelEditing = () => {
    setEditingItem(null);
  };

  const cancelAdding = () => {
    setNewEntry({});
    setShowAddForm(false);
  };

  const renderTable = () => (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>No</th>
            <th>Nama Tamu</th>
            <th>No Hp</th>
            <th>Jabatan</th>
            <th>Unit Kerja</th>
            <th>Tujuan</th>
            <th>Yang Dituju</th>
            <th>Keterangan</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {buku.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nama_tamu}</td>
              <td>{item.no_hp}</td>
              <td>{item.jabatan}</td>
              <td>{item.unit_kerja}</td>
              <td>{item.tujuan}</td>
              <td>{item.yang_dituju}</td>
              <td>{item.keterangan}</td>
              <td>
            <td>
              <button className="btn btn-primary" onClick={() => startEditing(item)}>Edit</button>
            </td>
              </td>
            <td>
              <button className="btn btn-danger" onClick={() => deleteBuku(item.id)}>Delete</button>
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
          <h1 className="card-title">Buku Tamu</h1>

          {/* Add Entry Button */}
          {!showAddForm && !editingItem && (
            <div className="mb-3 text-end">
              <button className="btn btn-success" onClick={() => setShowAddForm(true)}>
                <i className="bi bi-plus"></i> Add New Entry
              </button>
            </div>
          )}

          {/* Add Entry Form */}
          {showAddForm && (
            <div>
              <h2>Add New Entry</h2>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="nama_tamu"
                    className="form-control"
                    placeholder="Nama Tamu"
                    value={newEntry.nama_tamu || ''}
                    onChange={handleNewEntryChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="no_hp"
                    className="form-control"
                    placeholder="No Hp"
                    value={newEntry.no_hp || ''}
                    onChange={handleNewEntryChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="jabatan"
                    className="form-control"
                    placeholder="Jabatan"
                    value={newEntry.jabatan || ''}
                    onChange={handleNewEntryChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="unit_kerja"
                    className="form-control"
                    placeholder="Unit Kerja"
                    value={newEntry.unit_kerja || ''}
                    onChange={handleNewEntryChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="tujuan"
                    className="form-control"
                    placeholder="Tujuan"
                    value={newEntry.tujuan || ''}
                    onChange={handleNewEntryChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="yang_dituju"
                    className="form-control"
                    placeholder="Yang Dituju"
                    value={newEntry.yang_dituju || ''}
                    onChange={handleNewEntryChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="keterangan"
                    className="form-control"
                    placeholder="Keterangan"
                    value={newEntry.keterangan || ''}
                    onChange={handleNewEntryChange}
                  />
                </div>
                <button type="button" onClick={addBuku} className="btn btn-success">
                  <i className="bi bi-check2"></i> Add
                </button>
                <button type="button" onClick={cancelAdding} className="btn btn-secondary">
                  <i className="bi bi-x"></i> Cancel
                </button>
              </form>
            </div>
          )}

          {/* Edit Entry Form */}
          {editingItem && (
            <div>
              <h2>Edit Entry</h2>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="nama_tamu"
                    className="form-control"
                    placeholder="Nama Tamu"
                    value={editedData.nama_tamu || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="no_hp"
                    className="form-control"
                    placeholder="No Hp"
                    value={editedData.no_hp || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="jabatan"
                    className="form-control"
                    placeholder="Jabatan"
                    value={editedData.jabatan || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="unit_kerja"
                    className="form-control"
                    placeholder="Unit Kerja"
                    value={editedData.unit_kerja || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="tujuan"
                    className="form-control"
                    placeholder="Tujuan"
                    value={editedData.tujuan || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="yang_dituju"
                    className="form-control"
                    placeholder="Yang Dituju"
                    value={editedData.yang_dituju || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="keterangan"
                    className="form-control"
                    placeholder="Keterangan"
                    value={editedData.keterangan || ''}
                    onChange={handleChange}
                  />
                </div>
                <button type="button" onClick={() => updateBuku(editingItem.id)} className="btn btn-primary">
                  <i className="bi bi-save"></i> Save
                </button>
                <button type="button" onClick={cancelEditing} className="btn btn-secondary">
                  <i className="bi bi-x"></i> Cancel
                </button>
              </form>
            </div>
          )}

          {/* Render Table */}
          {!showAddForm && !editingItem && renderTable()}
        </div>
      </div>
    </div>
  );
}

export default BukuTamu;
