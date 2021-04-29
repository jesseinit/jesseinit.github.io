import mainStyles from './main.module.css';

const Main = ({ children }) => {
  return <main className={mainStyles.site__main}>{children}</main>;
};

export default Main;
