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
                setUrl(prevUrl => {
                    func(secure_url);
                    return secure_url;
                });
                // console.log(url)
                func(secure_url);
            } else {
                console.error('Error uploading file:', error);
            }
        });
    }, [func]);

    return (
        <div>
            <button type='button' onClick={(e) => widgetRef.current.open()} >
                Upload
            </button>
        </div>
    );

};

export default UploadWidget;
