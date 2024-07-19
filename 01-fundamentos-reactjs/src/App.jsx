import './global.css';
import styles from './App.module.css';

import { Header } from './components/Header';
import { Post } from './Post';
import { Sidebar } from './components/Sidebar';


export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post
            author="Jônatas Fernandes"
            content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod saepe inventore numquam blanditiis voluptatem praesentium obcaecati illum quidem dolorem! Optio accusamus non alias assumenda possimus nihil earum veritatis voluptatum molestiae?"
          />

          <Post
            author="Diego Fernandes"
            content="Um novo post show de bola"
          />
        </main>
      </div>
    </div>

  )
}
