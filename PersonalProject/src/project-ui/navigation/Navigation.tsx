import { Sidenav, Nav, Button } from 'rsuite';
import { Link } from 'react-router-dom';
import { Pages } from '..';
import { useState } from 'react';

interface Props {
  pages: Pages[];  
}

function Navigation(props: Props) {
  const { pages } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <Button onClick={() => setExpanded(!expanded)}>Test</Button>
        <div className={expanded ? 'sidenav-open' : 'sidenav-closed'}>
      <Sidenav
        appearance='subtle'
      >
      <Sidenav.Body>
        <Button onClick={() => setExpanded(!expanded)}>Close</Button>
        <Nav vertical>
          {pages.map((page) => {
            return <Nav.Item as={Link} to={page.path} key={page.name}>{page.name}</Nav.Item>
          })}
        </Nav>
      </Sidenav.Body>
      </Sidenav>
      </div>
    </div>
  );
}

export default Navigation;