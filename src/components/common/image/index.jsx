import React from "react"

const Image = ({ src, alt, css }) => {
  return <img src={src} alt={alt} className={`${css}`} />
}

export default Image
