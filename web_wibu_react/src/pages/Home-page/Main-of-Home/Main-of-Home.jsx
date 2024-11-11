import Section from './Section-of-Home/Section-of-Home';
import Aside from './Aside-of-Home/Aside-of-Home';
import './Main-of-Home.css';

function Main() {
  return (
    <main className="main">
      <div className="main__container">
        <Section />
        <Aside />
      </div>
    </main>
  );
}

export default Main;