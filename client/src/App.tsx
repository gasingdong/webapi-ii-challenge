import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import axios from 'axios';

interface Post {
  id: number,
  title: string,
  contents: string,
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [])

  return (
    <div className="App">
      {
        posts.map(post => 
        (<Fragment key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.contents}</p>
        </Fragment>))
      }
    </div>
  );
}

export default App;
