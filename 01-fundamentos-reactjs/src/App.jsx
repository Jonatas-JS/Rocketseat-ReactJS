import './styles.css';
import { Header } from './components/Header';
import { Post } from './Post';


export function App() {
  return (
    <div>
      <Header />

      <Post 
        author="Jônatas Fernandes" 
        content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod saepe inventore numquam blanditiis voluptatem praesentium obcaecati illum quidem dolorem! Optio accusamus non alias assumenda possimus nihil earum veritatis voluptatum molestiae?" 
      />

      <Post 
        author="Diego Fernandes"
        content="Um novo post show de bola"
      />
    </div>
    
  )
}
