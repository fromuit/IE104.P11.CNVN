import Section from './Section/Section';
import Aside from './Aside/Aside';
import './Main.css';

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