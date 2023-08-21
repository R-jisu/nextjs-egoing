"use client"

import { useParams, useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL+`topics/${id}`).then(res=> res.json()).then(result => {
      console.log(result);
      setTitle(result.title);
      setBody(result.body);
    })
  }, [])
  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const title = e.target.title.value as string;
      const body = e.target.body.value as string;
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body})
      }
      fetch(process.env.NEXT_PUBLIC_API_URL+`topics/${id}`, options).then(
        res=> res.json()
      ).then(result => {
        console.log(result);
        const lastid = result.id;
        router.refresh();
        router.push(`/read/${lastid}`)
      })
    }}>
      <p>
        <input type="text" name="title" placeholder="title" value={title} onChange={e => setTitle(e.target.value)}/>  
      </p>      
      <p>
        <textarea name="body" placeholder="body" value={body} onChange={e => setBody(e.target.value)}></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  )
}