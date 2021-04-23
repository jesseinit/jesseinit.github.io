import navStyles from './navigation.module.css';

const NavBar = () => {
  return (
    <>
      <nav className={navStyles.site__navbar}>
        <p>__init__</p>
        <ul>
          <li>blog</li>
          <li>about</li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
