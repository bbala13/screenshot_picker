import React from 'react';
import { useRouter } from 'next/router';
import File from '../../../components/file/File';

function encryptStrToBase64(str) {
    const buff = Buffer.from(str, 'utf-8');
    const encryptedPath = buff.toString('base64');
    return encryptedPath;
}

async function addFileHandler(path) {
    //encrypt path
    const encryptedPath = encryptStrToBase64(`${path}`);

    //add to update.json
    const add = await fetch(
        `http://localhost:3000/api/updateFiles/${encryptedPath}`,
        {
            method: 'POST',
        }
    );
    //remove from delete.json
    const remove = await fetch(
        `http://localhost:3000/api/deleteFiles/${encryptedPath}`,
        {
            method: 'DELETE',
        }
    );
}

async function deleteFileHandler(path) {
    //encrypt path
    const encryptedPath = encryptStrToBase64(`${path}`);

    //add to update.json
    const add = await fetch(
        `http://localhost:3000/api/deleteFiles/${encryptedPath}`,
        {
            method: 'POST',
        }
    );
    console.log(add);

    //remove from delete.json
    const remove = await fetch(
        `http://localhost:3000/api/updateFiles/${encryptedPath}`,
        {
            method: 'DELETE',
        }
    );
    console.log(remove);
}

const DirectoryName = (data) => {
    const router = useRouter();
    const directoryNameParam = router.query.directoryname;
    const { files } = data;
    //console.log(files);

    return (
        <div>
            <h2>Files</h2>
            <ul style={{ listStyle: 'none' }}>
                {files &&
                    files.map((file, index) => {
                        return (
                            <li key={index}>
                                <File
                                    directory={directoryNameParam}
                                    fileObj={file}
                                    deleteFileHandler={deleteFileHandler}
                                    addFileHandler={addFileHandler}
                                />
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default DirectoryName;

export async function getServerSideProps(context) {
    // console.log('context', context);
    const { directoryname } = context.query;
    const response = await fetch(
        `http://localhost:3000/api/fs/directory/${directoryname}/files?ext=png`
    );
    const data = await response.json();
    console.log('data', data);

    return {
        props: data,
    };
}
