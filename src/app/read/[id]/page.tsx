import React from 'react'

const read = async (props : {params: {id: number}}) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+`topics/${props.params.id}`,{ cache: 'no-store'})
  const topic = await response.json();
  return (
    <>
    <h2>{topic.title}</h2>
    {topic.body}
    </>
  )
}

export default read