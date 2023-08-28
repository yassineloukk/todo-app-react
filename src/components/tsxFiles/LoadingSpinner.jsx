import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';

export default function LoadingSpinner(props) {

  const css = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
  };

  let [color, setColor] = useState("#ffffff");
  
  return (
    <div className="sweet-loading">  
      <ClipLoader
        color={color}
        loading={props.isLoading.toString()}
        cssOverride={css}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
