import styles from '@/styles/pages/resources.module.scss';
import type { NextPage } from 'next';
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import { isMaybeAuthentificated } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { addComment, getComments, getResource } from '@/packages/api/resources';
import ResourceCard from '@/components/molecules/ResourceCard/ResourceCard';
import Heading2 from '@/components/atoms/Heading2/Heading2';
import { useForm } from 'react-hook-form';
import Form from '@/components/atoms/Form/Form';
import FormButton from '@/components/atoms/FormButton/FormButton';
import TextAreaInput from '@/components/molecules/TextAreaInput/TextAreaInput';
import Alert from '@/components/atoms/Alert/Alert';
import CommentCard from '@/components/molecules/CommentCard/CommentCard';
import Button from '@/components/atoms/Button/Button';

type ResourcePageProps = {
	user?: any;
}

const ResourcePage: NextPage = ({ user }: ResourcePageProps) => {
	const router = useRouter();
	const { id } = router.query;
	const [resource, setResource] = useState<any>(null);
	const [comments, setComments] = useState<any[]>([]);
	const [commentsPage, setCommentsPage] = useState(1);
	const [commentsHasNextPage, setCommentsHasNextPage] = useState(false);
	const { register, handleSubmit, reset } = useForm();
	const [error, setError] = useState('');

	useEffect(() => {
		setResource(null);
		setComments([]);

		const foo = async () => {
			const response = await getResource(parseInt(id!.toString()));

			if (response === null) {
				router.push('/404');
			}

			setResource(response);
		} 
		
		foo();
	}, [id])

	useEffect(() => {
		const foo = async () => {
			const remoteComments = await getComments(parseInt(id!.toString()), commentsPage);
			const _comments = [...comments];

			if (remoteComments) {
				remoteComments.data.map((comment: any) => {
					_comments.push(comment);
				});
				
				setComments(_comments);
				setCommentsHasNextPage(remoteComments.pagination.hasNextPage);
			}
		}

		foo();
	}, [commentsPage]);

	const onSubmit = async (data: any) => {
		setError('');

		if (data.comment === '') {
			setError('Vous devez remplir le champ commentaire');
			return;
		}

		const response = await addComment(parseInt(id!.toString()), data.comment);
		
		if (response && !response.statusCode) {
			const _comments = [...comments];
			_comments.unshift(response);
			setComments(_comments);
		}

		reset();
  }

	const handleLoadMore = () => {
		if (commentsHasNextPage)
			setCommentsPage(commentsPage + 1);
	}

	return (
		<DefaultLayout user={user}>
			{ resource && <ResourceCard user={user} resource={resource} /> }

			<div className={styles.Comments}>
				{
					comments.length > 0 && 
						<div>
							<Heading2>Commentaires</Heading2>

							<div className={styles.CommentsList}>
								{ comments.map((comment, index) => {
									return (
										<CommentCard key={index} comment={comment} />
									)
								}) }
							</div>
						</div>
				}

				{
					commentsHasNextPage && <div className={ styles.LoadMore }>
						<Button onClick={ handleLoadMore }>Charger plus</Button>
					</div>
				}

				{
					user &&
						<div>
							<Heading2>Ajouter un commentaire</Heading2>

							{ error !== '' && <><br/><Alert text={error} /></> }

							<Form onSubmit={handleSubmit(onSubmit)}>
								<TextAreaInput formKey={register("comment")} label="Commentaire" />
								<FormButton value="Envoyer" />
							</Form>
						</div>
				}
			</div>
		</DefaultLayout>
	);
}

ResourcePage.getInitialProps = async (ctx) => {
	return isMaybeAuthentificated(ctx);
}

export default ResourcePage;