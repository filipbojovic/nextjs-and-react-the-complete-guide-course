"use client";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

type ImagePickerProps = {
  label: string;
  name: string;
};

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  function handlePickClick() {
    imageInput.current?.click();
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file: File | null = event.target.files && event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    // convert file to url
    const fileReader = new FileReader();
    // onload method will be triggered once 'readAsDataURL' call is finished
    fileReader.onload = () => {
      // .result gives us generated url
      setPickedImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="The image selected by the user." fill />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="iamge/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        {/* with specifying type as button, the form won't be submitted on click */}
        <button className={classes.button} type="button" onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
