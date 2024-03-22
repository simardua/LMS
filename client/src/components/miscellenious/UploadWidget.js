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
                // console.log(url)
                func(secure_url);
            } else {
                console.error('Error uploading file:', error);
            }
        });
    }, []); 

    return (
        <div>
            <button onClick={() => widgetRef.current.open()}>
                Upload
            </button>
        </div>
    );

};

export default UploadWidget;
