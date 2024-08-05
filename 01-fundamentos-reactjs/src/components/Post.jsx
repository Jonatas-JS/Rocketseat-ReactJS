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
        'Muito bom Devon, parabéns!! 👏👏'
    ]);

    //newCommentText -> value of campo do comentário in real time
    const [newCommentText, setNewCommentText] = useState('');

    //publishedDateFormatted -> vai armazenar a data do post e mostra-la já editada
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });

    //publishedDateRelativeToNow -> vai armazenar a data de publicação do post relativa a data atual 
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

    //handleCreateNewComment -> criar novo comentário
    function handleCreateNewComment(event) {
        //impede o comportamento normal do coponente
        //o comportamento normal de um submit seria levar o usuário para outra página, nesse caso ele impede essa ação
        event.preventDefault();

        //spread operator ... copia o que tem na variável comments
        setComments([...comments, newCommentText]);
        //setNewCommentText => volta para o estado inicial, vazio
        setNewCommentText('');
    }

    //handleNewCommentChange -> recebe o texto que está sendo digitado no comentário
    function handleNewCommentChange(event) {
        //setCustomValidity('') -> muda para vazio, quando a pessoa digitar, já que antes apresentava o texto 'Esse campo é obrigatório'
        event.target.setCustomValidity('')
        //setNewCommentText ->  receberá o valor do que está sendo digitado no <textarea>
        setNewCommentText(event.target.value);
    }

    //handleNewCommentInvalid -> muda o texto que é mostrado quando o campo está vazio
    function handleNewCommentInvalid(event) {
        //setCustomValidity -> muda o texto que é mostrado quando o campo está vazio
        event.target.setCustomValidity('Esse campo é obrigatório')
    }

    //deleteComment -> creates a filter (new list) of $comments without  the que será "deleted"
    function deleteComment(commentToDelete) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            //return a list with only os comentários diferentes de comment(comentário atual) 
            return comment !== commentToDelete
        })
        setComments(commentsWithoutDeletedOne);
    }

    //isNewCommentEmpty -> validar se o campo newCommentText está vazio para mudar o status do disable no Publicar button
    const isNewCommentEmpty = newCommentText.length === 0;

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
                        return <p key={Math.random()}>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p key={Math.random()}><a href="#">{line.content}</a></p>;
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    name="comment"
                    value={newCommentText}
                    placeholder="Deixe seu comentário"
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid} //quando for invalidado (vazio) execute a função...
                    //handleNewCommentInvalid -> feito para mudar o texto que é exibio quando <textarea> vazio
                    required    //especifica que esse campo não pode estar vafio (retorna true or false)
                />

                <footer>    
                    {/*(disabled -> the button ficará indisponível enquanto o newCommentText(o que é digitado) estiver vazio */}
                    <button 
                        type="submit" 
                        disabled={isNewCommentEmpty}> 
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={Math.random()}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}