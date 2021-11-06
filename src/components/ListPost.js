import React, {useState, useEffect}from 'react';
import axios from 'axios';


export default function ListPost() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setPosts(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          'https://limitless-sierra-67996.herokuapp.com/v1/docs/posts'
        );
        setPosts(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);


  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!posts) return null;
    return (
        <div>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                    {post.title} ({post.body})({post.tags})
                    </li>
                ))}
            </ul>
        </div>
    );
}
