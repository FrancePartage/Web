import type { NextPage } from 'next';
import DefaultLayout from '@/components/templates/DefaultLayout/DefaultLayout';
import CenterLayout from "@/components/templates/CenterLayout/CenterLayout";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Form from '@/components/atoms/Form/Form';
import { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Heading1 from '@/components/atoms/Heading1/Heading1';
import BasicInput from '@/components/molecules/BasicInput/BasicInput';
import FormButton from '@/components/atoms/FormButton/FormButton';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import Label from '@/components/atoms/Label/Label';
import Alert from '@/components/atoms/Alert/Alert';
import { isFileImage, resolveImage } from '@/utils/images';
import { isAuthenticated } from '@/utils/auth';
import { addResource, uploadImage } from '@/packages/api/resources';
import { useRouter } from 'next/router';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

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
    ['clean']
  ],
  clipboard: {
    matchVisual: false
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
];

type AddResourcePageProps = {
	user?: any;
}

const AddResourcePage: NextPage = ({ user }: AddResourcePageProps) => {
	const router = useRouter();
	const editorRef = useRef(null);
	const [content, setContent] = useState('');
	const [tags, setTags] = useState([]);
	const [error, setError] = useState('');

	const imageHandler = (a :any) => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.onchange = async () => {
			const editor = editorRef.current.getEditor();
			const file = input.files![0];

			if (/^image\//.test(file.type)) {
				const range = editor.getSelection(true);

				editor.insertEmbed(range.index, 'image', `/images/loading.gif`);
				editor.setSelection(range.index + 1);

				const response = await uploadImage(file);

				if (response && response.file) {
					editor.deleteText(range.index, 1);
					editor.insertEmbed(range.index, "image", resolveImage(`resources/${response.file}`));
				}
			} else {
				console.warn("You could only upload images.");
			}
		};
	};

	const modules = useMemo(() => ({
			toolbar: {
					container: [
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
						['clean']
					],

					handlers: {
							image: imageHandler,
					},
			},
	}), []);

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

		if (tags.length < 2) {
			setError('Veuillez entrer au moins deux tags');
			return;
		}

		if (content === '') {
			setError('Veuillez saisir le contenu de la ressource');
			return;
		}

		const response = await addResource(data.title, data.cover[0], tags, content);

		if (response.statusCode) {
			if (Array.isArray(response.message)) {
				setError(response.message.join('<br>'));
			} else {
				setError(response.message);
			}
		} else {
			router.push('/');
		}
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
					<ReactQuill 
						theme="snow"
						modules={modules}
						forwardedRef={editorRef}
						formats={formats}
						onChange={setContent}
					/>

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