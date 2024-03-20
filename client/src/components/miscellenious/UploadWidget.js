import { useEffect, useRef, useState } from 'react';

const UploadWidget = ({ func }) => { // Destructure func from props
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    const [url, setUrl] = useState('');

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'snak',
            uploadPreset: 'Learning-Management-System'
        }, function (error, result) {
            if (!error && result && result.event === 'success') {
                const { secure_url } = result.info;
                setUrl(secure_url);
                func(secure_url); // Call func with the secure_url
            } else {
                console.error('Error uploading file:', error);
            }
        });
    }, []); // Add an empty dependency array to run the effect only once

    return (
        <div>
            <button onClick={() => widgetRef.current.open()}>
                Upload
            </button>
        </div>
    );

};

export default UploadWidget;
