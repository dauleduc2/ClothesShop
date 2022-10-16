import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ReactQuillInputProps {
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const ReactQuillInput: React.FunctionComponent<ReactQuillInputProps> = ({ description, setDescription }) => {
    return (
        <>
            <ReactQuill
                placeholder="Type something about this product..."
                value={description}
                onChange={setDescription}
                className="col-span-2 min-h-2xl"
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                        ['blockquote', 'code-block'],
                        ['link', 'video', 'image'],
                        [{ header: 1 }, { header: 2 }], // custom button values
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                        [{ direction: 'rtl' }], // text direction
                        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ color: [] }, { background: [] }],
                        [{ font: [] }],
                        [{ align: [] }],
                        ['clean'], // remove formatting button
                    ],
                }}
            />
        </>
    );
};

export default ReactQuillInput;
