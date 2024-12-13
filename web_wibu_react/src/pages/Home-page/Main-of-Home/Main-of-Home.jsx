import Section from './Section-of-Home/Section-of-Home';
import Aside from './Aside-of-Home/Aside-of-Home';
import styles from './Main-of-Home.module.scss';

function Main() {
  return (
    <main className={styles["main"]}>
      <div className={styles["main__container"]}>
        <Section />
        <Aside />
      </div>
    </main>
  );
}

export default Main;