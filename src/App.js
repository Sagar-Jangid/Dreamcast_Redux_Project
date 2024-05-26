import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, deleteUser, editUser } from './redux/actions/userActions';
import { Table, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);

  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: { city: '', zipcode: '' }
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'city' || name === 'zipcode') {
      setSelectedUser((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [name]: value }
      }));
    } else {
      setSelectedUser((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSaveChanges = () => {
    dispatch(editUser(selectedUser));
    setShow(false);
  };

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: 'User',
      email: 'user@gmail.com',
      phone: '123456789',
      address: {
        city: 'my city',
        zipcode: '999999'
      }
    };
    dispatch(addUser(newUser));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <h1>Users</h1>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </Col>
        <Col className="text-right">
          <Button onClick={handleAddUser}>ADD USER</Button>
        </Col>
      </Row>


      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Zip Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address.city}</td>
              <td>{user.address.zipcode}</td>
              <td>
                <Button variant="warning" className='margin-right' onClick={() => handleShow(user)}>Edit</Button>
                <Button variant="danger"  onClick={() => handleDeleteUser(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={selectedUser.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={selectedUser.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={selectedUser.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter city"
                value={selectedUser.address.city}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formZipcode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipcode"
                placeholder="Enter zip code"
                value={selectedUser.address.zipcode}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
