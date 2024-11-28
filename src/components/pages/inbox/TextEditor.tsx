'use client';
import React, { Dispatch, SetStateAction } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './texteditor.css';

const TextEditor = ({
  value,
  setValue,
}: {
  value: ReactQuill.Value;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  const quillRef = React.useRef(null);

  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        ref={quillRef}
        placeholder="Enter a description..."
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['underline'],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
          ],
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true,
          },
        }}
      />
    </div>
  );
};

export default TextEditor;
