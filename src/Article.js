import React from 'react'

export const Article = (props) => {
  const imageStyle = {
    background: `url("${props.primaryImage}")`,
    backgroundPosition: '50% 30%',
    backgroundSize: 'cover',
    height: '300px'
  }

  const textStyle = {
    maxWidth: '700px',
    margin: '0 auto 150px auto'
  }

  return (
    <div>
      <div style={imageStyle} />
      <div style={textStyle} >
        <h1>{props.title}</h1>
        <p>{props.body}</p>
      </div>
    </div>
  )
}

export default Article
