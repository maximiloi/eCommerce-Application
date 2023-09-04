import { Box, MenuItem, MenuList } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ColoredBtn from '../components/ColoredBtn/ColoredBtn';
import PromoSlides from '../components/PromoSlides/PromoSlides';
import { navBtns } from '../helper/variables';

function MainPage() {
  return (
    <Box className="main__wrap" sx={{ display: 'flex' }}>
      <Box sx={{ width: { sm: '200px' }, flexShrink: { sm: 0 } }}>
        <MenuList>
          {navBtns.map((link) => (
            <MenuItem key={link.name}>
              <ColoredBtn type="button" variant="contained" fullWidth>
                <NavLink className="menu-link" to={link.path}>
                  {link.name}
                </NavLink>
              </ColoredBtn>
            </MenuItem>
          ))}
        </MenuList>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: 'calc(100% - 200px)' } }}
      >
        <PromoSlides />
      </Box>
    </Box>
  );
}

export default MainPage;
