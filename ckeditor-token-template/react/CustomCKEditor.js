import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CustomCKEditor = () => {
  const editorRef = useRef();

  const insertToken = (editor, token) => {
    const viewFragment = editor.data.processor.toView(`<span class='token-block'>${token}</span>`);
    const modelFragment = editor.data.toModel(viewFragment);
    editor.model.insertContent(modelFragment);
  };

  const onEditorReady = editor => {
    editorRef.current = editor;
  };

  const handleInsert = (type) => {
    const editor = editorRef.current;
    if (!editor) return;

    let token = '';
    switch (type) {
      case 'variable':
        const name = prompt('Enter variable name (e.g., %%loanamount%%)');
        if (name) token = name;
        break;
      case 'foreach':
        token = '[[foreach allclientsinfo as aci]]...[[/]]';
        break;
      case 'showif':
        token = '[[showif %%loanamount%% > 100]]...[[/]]';
        break;
      case 'calc':
        token = '[[calc %%loanamount%%*%%interestrate%%/%%loanterm%%|%]]';
        break;
      case 'datecalc':
        token = '[[datecalc %%today%%+1m| F, j Y]]';
        break;
      default:
        return;
    }
    insertToken(editor, token);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">CKEditor 5 with Mortgage Automator-style Tokens</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => handleInsert('variable')}>Insert Variable</button>
        <button onClick={() => handleInsert('foreach')}>Insert Foreach</button>
        <button onClick={() => handleInsert('showif')}>Insert ShowIf</button>
        <button onClick={() => handleInsert('calc')}>Insert Calc</button>
        <button onClick={() => handleInsert('datecalc')}>Insert DateCalc</button>
      </div>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Start editing your document...</p>"
        onReady={onEditorReady}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ data });
        }}
      />
      <style>{\`
        .token-block {
          background: #eef3ff;
          border: 1px dashed #6a6a6a;
          border-radius: 4px;
          padding: 2px 6px;
          display: inline-block;
          font-family: monospace;
          color: #333;
        }
      \`}</style>
    </div>
  );
};

export default CustomCKEditor;
