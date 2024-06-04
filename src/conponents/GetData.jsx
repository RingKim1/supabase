import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const myUrl = `https://jhjvnwjixzbcoqzkmbmb.supabase.co`;
const myKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoanZud2ppeHpiY29xemttYm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MTMwOTIsImV4cCI6MjAzMjk4OTA5Mn0.cDfx4w7fBkdnBA4SzUpgeYmFl1in5vGYekLHmfpd0Lw`;

const supabase = createClient(myUrl, myKey);

function GetData() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const { data } = await supabase.from("posts").select();
    setPosts(data);
  }

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.date}</p>
            <h2>{post.title}</h2>
            <span>{post.like}</span>
            <p>{post.description}</p>
            <p>{post.writer}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default GetData;
