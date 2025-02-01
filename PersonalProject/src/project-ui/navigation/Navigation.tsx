import { Nav, Dropdown } from 'rsuite';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Nav vertical appearance="subtle">
      <Nav.Item as={Link} to="/home">Home</Nav.Item>
      <Nav.Item as={Link} to="/dashboard">Dashboard</Nav.Item>
      
      <Dropdown title="Settings">
        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
        <Dropdown.Item as={Link} to="/account">Account</Dropdown.Item>
      </Dropdown>
    </Nav>
  );
}

export default Navigation;