import React, { useState } from "react";
import axios from "axios";
import styles from "./ImageUpload.module.css"; // Import the CSS module

function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [text, setText] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/upload/",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setText(response.data.text);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className={`container ${styles.container}`}>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="mb-4" style={{ color: "#3498db" }}>
                        Tesseract Image Upload
                    </h1>
                </div>
                <div className="col-md-6">
                    <label
                        htmlFor="file"
                        className={`btn ${styles["upload-button"]} btn-primary mb-2`}
                    >
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="file"
                        className={`form-control-file ${styles["file-input"]}`}
                        onChange={handleFileChange}
                    />
                </div>
                <div className="col-md-6">
                    <button
                        onClick={handleUpload}
                        className={`btn ${styles["upload-button"]} btn-primary`}
                    >
                        Extract Text
                    </button>
                </div>
            </div>
            {text && (
                <div className={`mt-4 ${styles["extracted-text-container"]}`}>
                    <h2>Extracted Text:</h2>
                    <p>{text}</p>
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
