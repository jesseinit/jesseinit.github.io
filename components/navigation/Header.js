import navStyles from './navigation.module.css';

const Header = ({ children }) => {
  return <header className={navStyles.site__header}>{children}</header>;
};

export default Header;
