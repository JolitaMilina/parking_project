import React, { useState } from "react";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // LOGIC FOR UPLOAD

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setUploadStatus("success");
      } else {
        setUploadStatus("error");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("error");
    }
  };

  return (
    <>
      <h2 className="my-4">Licence plate scan</h2>
      <form className="p-4 border rounded bg-light">
        <label>Upload an image:</label>
        <input class="form-control" type="file" onChange={handleFileChange} />

        <div class=" col-auto my-2">
          <button
            type="submit"
            class="btn btn-primary mb-3"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        {uploadStatus === "success" && (
          <span className="alert alert-success">
            File uploaded successfully!
          </span>
        )}
        {uploadStatus === "error" && (
          <span className="alert alert-danger">
            File upload failed! Please try again.
          </span>
        )}
      </form>
    </>
  );
};

export default Upload;
