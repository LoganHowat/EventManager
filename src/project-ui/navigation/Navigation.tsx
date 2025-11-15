import { Sidenav, Nav, Button } from 'rsuite';
import { Menu } from '@rsuite/icons'
import { Link } from 'react-router-dom';
import { LogoutButton, Pages } from '..';
import { useState } from 'react';


interface Props {
  pages: Pages[];
}

function Navigation(props: Props) {
  const { pages } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='sidenav-container'>
      <Button
        className='sidenav-menu-button'
        onClick={() => setExpanded(!expanded)}
      >
        <Menu />
      </Button>
      <div className={expanded ? 'sidenav-open' : 'sidenav-closed'}>
        <Sidenav
          appearance='subtle'
        >
          <Sidenav.Body>
            <div className='sidenav-close-button'>
              <Button 
                className='sidenav-menu-button'
                onClick={() => setExpanded(!expanded)}>
                <Menu />
              </Button>
            </div>
            <div className='sidenav-links'>
              <Nav vertical>
                {pages.map((page) => {
                  return (
                    <Nav.Item as={Link} to={page.path} key={page.name} onClick={() => setExpanded(!expanded)}>
                      <h3>{page.name}</h3>
                    </Nav.Item>)
                })}
              </Nav>
            </div>
            <div className='sidenav-logout'>
              <LogoutButton />
            </div>
          </Sidenav.Body>
        </Sidenav>
      </div>
    </div>
  );
}

export default Navigation;