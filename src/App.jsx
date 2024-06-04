import { useEffect, useState } from "react";
import supabase from "../supabase";

function App() {
  const [posts, setPosts] = useState([]);
  const [signIn, setSignIn] = useState(false);

  console.log(posts);

  async function getPosts() {
    const { data } = await supabase.from("posts").select();
    setPosts(data);
  }

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }

  async function checkSignIn() {
    const session = await supabase.auth.getSession();
    const isSignIn = !!session.data.session;

    setSignIn(isSignIn);
  }

  async function signOut() {
    await supabase.auth.signOut();
    checkSignIn();
  }

  async function createPost() {
    const { data } = await supabase
      .from("posts")
      .insert({
        title: prompt("제목을 입력해주세요."),
        content: prompt("내용을 입력해주세요."),
      })
      .select();

    setPosts((prev) => [...prev, ...data]);
  }

  async function deletePost(id) {
    const { data } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .select();

    const [deletedPost] = data;
    const filteredList = posts.filter((post) => post.id !== deletedPost.id);

    setPosts(filteredList);
  }

  async function updatePost(id) {
    const { data } = await supabase
      .from("posts")
      .update({
        title: prompt("수정할 제목을 입력해주세요."),
        content: prompt("수정할 내용을 입력해주세요."),
      })
      .eq("id", id)
      .select();

    const [updatedPost] = data;
    const updatedList = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );

    setPosts(updatedList);
  }

  useEffect(() => {
    getPosts();
    checkSignIn();
  }, []);

  return (
    <main>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button type="button" onClick={() => deletePost(post.id)}>
              글 삭제
            </button>
            <button type="button" onClick={() => updatePost(post.id)}>
              글 수정
            </button>
          </li>
        ))}
      </ul>
      {signIn ? (
        <SignInBtn text="로그아웃" onClick={signOut} />
      ) : (
        <SignInBtn text="로그인" onClick={signInWithGithub} />
      )}
      <button type="button" onClick={createPost}>
        글 작성
      </button>
    </main>
  );
}

function SignInBtn({ text, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default App;
