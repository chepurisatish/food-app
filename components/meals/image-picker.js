"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export const ImagePicker = ({ lable, name }) => {
  const [pickedImage, setPickedImage] = useState();
  const imageRef = useRef();
  const handlePickClick = () => {
    imageRef.current.click();
  };

  const handleImageChange = (event) => {
    // Get the first file from the file input event
    const file = event.target.files[0];
    setPickedImage(null);
    // If no file is selected, exit the function
    // if (!file) {
    //   return;
    // }

    // Create a new FileReader instance
    const fileReader = new FileReader();

    // Define what happens when the file is successfully read
    fileReader.onload = () => {
      // Set the picked image to the result of the file reader (base64 string)
      setPickedImage(fileReader.result);
    };

    // Start reading the file as a Data URL (base64 string)
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{lable}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet..</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg "
          name={name}
          ref={imageRef}
          onClick={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};
