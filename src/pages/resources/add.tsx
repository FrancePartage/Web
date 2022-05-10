import type { NextPage } from 'next';
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import CenterLayout from "@/components/templates/CenterLayout/CenterLayout";
import dynamic from 'next/dynamic';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
});
import 'react-quill/dist/quill.snow.css';
import Form from '@/components/atoms/Form/Form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Heading1 from '@/components/atoms/Heading1/Heading1';
import BasicInput from '@/components/molecules/BasicInput/BasicInput';
import FormButton from '@/components/atoms/FormButton/FormButton';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import Label from '@/components/atoms/Label/Label';
import Alert from '@/components/atoms/Alert/Alert';
import { isFileImage } from '@/utils/images';
import { isAuthenticated } from '@/utils/auth';
import { addResource } from '@/packages/api/resources';
import { createWriteStream } from 'fs';
import { getCookies } from 'cookies-next';

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

type AddResourcePageProps = {
	user?: any;
}

const AddResourcePage: NextPage = ({ user }: AddResourcePageProps) => {
	const [content, setContent] = useState('');
	const [tags, setTags] = useState([]);
	const [error, setError] = useState('');

	const { register, handleSubmit } = useForm();

	const onSubmit = async (data: any) => {
		setError('');

		if (data.title === '') {
			setError('Veuillez saisir un titre');
			return;
		}

		if (data.cover.length <= 0) {
			setError('Veuillez selectionner une image de couverture');
			return;
		}

		if (!isFileImage(data.cover[0])) {
			setError('La couverture que vous avez selectionné n\'est pas une image');
			return;
		}

		if (tags.length <= 0) {
			setError('Veuillez selectionner au moins un tag');
			return;
		}

		if (content === '') {
			setError('Veuillez saisir le contenu de la ressource');
			return;
		}

		const response = await addResource(data.title, data.cover[0], tags, content);
		console.log(response);
  }

	return (
		<DefaultLayout user={user}>
			<CenterLayout>
				<Heading1>Ajouter une ressource</Heading1>

				{ error !== '' && <Alert text={error} /> }

				<Form onSubmit={handleSubmit(onSubmit)}>
					<BasicInput formKey={register("title")} type="text" label="Titre" />

					<BasicInput formKey={register("cover")} type="image" label="Couverture" />

					<Label>Tags</Label>
					<TagsInput value={tags} onChange={setTags} inputProps={{ placeholder: '' }} />

					<Label>Contenu</Label>
					<QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" value={content} onChange={setContent} />

					<FormButton value="Soumettre" />
				</Form>
			</CenterLayout>
		</DefaultLayout>
	);
}

AddResourcePage.getInitialProps = async (ctx) => {
	return isAuthenticated(ctx);
}

export default AddResourcePage;