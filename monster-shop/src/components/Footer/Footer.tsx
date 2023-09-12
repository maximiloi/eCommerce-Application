import { Link } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { creators } from '../../helper/variables';

import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <List className="footer__creators">
        {creators.map((link) => (
          <ListItem key={link.name}>
            <Link className="footer__link" to={link.path} target="_blank">
              {link.name}
            </Link>
          </ListItem>
        ))}
      </List>
      <div className="footer__date">
        <CopyrightIcon sx={{ mr: 1 }} /> 2023
      </div>
    </div>
  );
}

export default Footer;
