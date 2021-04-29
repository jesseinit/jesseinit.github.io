import mainStyles from './main.module.css';

const Main = ({ children }) => {
  return <main className={mainStyles.hero}>{children}</main>;
};

export default Main;
