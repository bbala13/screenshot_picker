import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const Directory = ({ directory }) => {
    console.log(directory);
    return (
        <div>
            <h2>Directories</h2>
            <ul>
                {directory.map((el, index) => {
                    return (
                        <li key={index}>
                            <Link href={`/directory/${el}`}>
                                <a>{el}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Directory;

export async function getServerSideProps() {
    const response = await fetch('http://localhost:3000/api/fs/directory');
    const data = await response.json();

    return {
        props: data,
    };
}
