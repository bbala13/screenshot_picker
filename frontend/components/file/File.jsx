import React, { useState } from 'react';
import styles from './File.module.css';

const File = ({ directory, fileObj, addFileHandler, deleteFileHandler }) => {
    const [borderColor, setBorderColor] = useState('');

    function onClickAddHandler() {
        addFileHandler(fileObj.fullpath);
        setBorderColor('green');
    }

    function onClickDeleteHandler() {
        deleteFileHandler(fileObj.fullpath);
        setBorderColor('red');
    }

    return (
        <div className={styles.file}>
            <div
                className={`${styles.imgContainer} ${
                    borderColor === 'green' ? styles.green : ''
                } ${borderColor === 'red' ? styles.red : ''}`}
            >
                <img
                    src={`http://localhost:3000/static/img/${directory}/${fileObj.filename}`}
                    className={styles.file__image}
                    height="100px"
                />
            </div>

            <div className={styles.file__reactions}>
                <button
                    className={styles.button}
                    title="Add File"
                    onClick={onClickAddHandler}
                >
                    Add file
                </button>
                <button
                    className={styles.button}
                    title="Remove File"
                    onClick={onClickDeleteHandler}
                >
                    Remove file
                </button>
            </div>
        </div>
    );
};

export default File;
