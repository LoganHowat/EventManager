import { Sidenav, Nav } from 'rsuite';
import { Link } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import { Pages } from '..';

interface Props {
  pages: Pages[];  
}

function Navigation(props: Props) {
  const { pages } = props;

  return (
    <Sidenav
      //appearance='subtle'
      expanded={false}
    >
      <Sidenav.Body>
    <Nav vertical>
      {pages.map((page) => {
        return <Nav.Item as={Link} to={page.path} key={page.name}>{page.name}</Nav.Item>
      })}
    </Nav>
    </Sidenav.Body>
    </Sidenav>
  );
}

export default Navigation;