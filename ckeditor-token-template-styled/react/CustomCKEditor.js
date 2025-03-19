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
    <div style={{
      backgroundColor: '#2b2b2b',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#3a3a3a',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 0 12px rgba(0, 0, 0, 0.3)',
        width: '700px'
      }}>
        <h2 style={{ color: '#fff', textAlign: 'center' }}>CKEditor Token Editor</h2>
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <button onClick={() => handleInsert('variable')} style={btnStyle}>Insert Variable</button>
          <button onClick={() => handleInsert('foreach')} style={btnStyle}>Insert Foreach</button>
          <button onClick={() => handleInsert('showif')} style={btnStyle}>Insert ShowIf</button>
          <button onClick={() => handleInsert('calc')} style={btnStyle}>Insert Calc</button>
          <button onClick={() => handleInsert('datecalc')} style={btnStyle}>Insert DateCalc</button>
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
    </div>
  );
};

const btnStyle = {
  margin: '5px',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#69aaf9',
  color: 'white',
  fontSize: '0.95rem',
  cursor: 'pointer'
};

export default CustomCKEditor;
