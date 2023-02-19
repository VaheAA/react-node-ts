import { NavLink, NavLinkProps } from 'react-router-dom';

interface CustomNavLinkProps extends NavLinkProps {
  isActive?: (match: any, location: any) => boolean;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ children, ...props }) => {
  return (
    <NavLink {...props} >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;