import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css';
import { Avatar } from './Avatar';
import { useState } from 'react';

export function Comment({ content, onDeleteComment }) {

    const [likeCount, setLikeCount] = useState(0);

    //indicar qual comentário deve ser deleted
    function handleDeleteComment() {
        onDeleteComment(content)
    }

    //handleLikeComment -> contabilizar a quantidade de likes
    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        });
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/jakeliny.png" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Jakeliny Gracielly</strong>
                            <time title="22 de Julho às 10:33h" dateTime="2024-07-22 10:33:00">Pulicado há 1h</time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={20} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment} title="Aplaudir">
                        <ThumbsUp />
                                    {/* if the likeCount for igual a 0 (valor inicial) então mostar '' em vez de 0*/}
                        Aplaudir <span>{likeCount === 0 ? '' : likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}