import styles from './Post.module.css';
import { format, formatDistanceToNow } from 'date-fns'; //biblioteca de formato de datas
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';

//author, publishedAt e content são propriedade que foram declaradas no App.jsx, aqui eu acesso ela
//como no App.jsx ele acessa a const=posts aqui é possível utilizar essas informação para mostrar em tela
//bom lembrar que posso declarar por aqui o valor "padrão" da propriedade, Ex.: publishedAt = '2024-07-26 10:59:00'
export function Post({ author, publishedAt, content }) {

    const [comments, setComments] = useState([
        1,
        2,
    ])

    //publishedDateFormatted vai armazenar a data do post e mostra-la já editada
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    //publishedDateRelativeToNow vai armazenar a data de publicação do post relativa a data atual 
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment() {
        //impede o comportamento normal do coponente
        //o comportamento normal de um submit seria levar o usuário para outra página, nesse caso ele impede essa ação
        event.preventDefault()
        //spread operator ... copia o que tem na variável comments
        setComments([...comments, comments.length + 1])
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map(line => { //função para separa e mostrar o que é paragrafo e o que é link
                    if (line.type === 'paragraph') {
                        return <p>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p><a href="#">{line.content}</a></p>;
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    placeholder="Deixe seu comentário"
                />

                <footer>
                    <button type="submit">Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment />
                })}
            </div>
        </article>
    )
}