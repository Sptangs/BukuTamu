import React, { useState, useEffect } from 'react';
import '../css/BukuTamu.css';

function BukuTamu() {
  const [buku, setBuku] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editedData, setEditedData] = useState({});

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

  const updateBuku = () => {
    // Simple validation
    if (Object.values(editedData).some(field => !field)) {
      alert('Please fill in all fields');
      return;
    }

    fetch(`http://localhost:3000/api/bukutamu/${editedData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
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

  const renderTable = () => (
    <table className="table table-bordered table-hover" style={{ width: '800px', marginLeft: '0px', marginRight: '-100px' }}>
      <thead>
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
              <button className="btn btn-primary" onClick={() => startEditing(item)}>Edit</button>
            </td>
            <td>
              <button className="btn btn-danger" onClick={() => deleteBuku(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="content">
      <div className="card-body">
        <h1>Buku Tamu</h1>
        {editingItem ? (
          <div>
            <h2>Edit Entry</h2>
            <form>
              <div>
                <label>Nama Tamu:</label>
                <input
                  type="text"
                  name="nama_tamu"
                  value={editedData.nama_tamu || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>No Hp:</label>
                <input
                  type="text"
                  name="no_hp"
                  value={editedData.no_hp || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Jabatan:</label>
                <input
                  type="text"
                  name="jabatan"
                  value={editedData.jabatan || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Unit Kerja:</label>
                <input
                  type="text"
                  name="unit_kerja"
                  value={editedData.unit_kerja || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Tujuan:</label>
                <input
                  type="text"
                  name="tujuan"
                  value={editedData.tujuan || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Yang Dituju:</label>
                <input
                  type="text"
                  name="yang_dituju"
                  value={editedData.yang_dituju || ''}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Keterangan:</label>
                <input
                  type="text"
                  name="keterangan"
                  value={editedData.keterangan || ''}
                  onChange={handleChange}
                />
              </div>
              <button type="button" onClick={updateBuku} className="btn btn-primary">Save</button>
              <button type="button" onClick={cancelEditing} className="btn btn-secondary">Cancel</button>
            </form>
          </div>
        ) : (
          renderTable()
        )}
      </div>
    </div>
  );
}

export default BukuTamu;
