import { Nav } from 'rsuite';
import { Link } from 'react-router-dom';
import { Pages } from '..';

interface Props {
  pages: Pages[];  
}

function Navigation(props: Props) {
  const { pages } = props;

  return (
    <Nav vertical appearance="subtle">
      {pages.map((page) => {
        return <Nav.Item as={Link} to={page.path} key={page.name}>{page.name}</Nav.Item>
      })}
    </Nav>
  );
}

export default Navigation;