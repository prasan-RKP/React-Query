import React, { useContext } from 'react'
import Post from './MyPost.jsx'
import { PostListConTXT } from './PostList-Store.jsx'
import MyPost from './MyPost.jsx';

const MyPosts = () => {
  const { posts, deleteAll } = useContext(PostListConTXT);
  console.log(posts);
  return (
    <div>


      {posts.length > 0 && (
        <p onClick={deleteAll} className="text-center cursor-pointer mt-4 bg-red-500 text-white p-4 rounded-md">
          Delete All
        </p>
      )}
      {posts.length === 0 ? (
        <p className='text-xl text-center mt-7 text-black'>No Posts Added yet 🍕</p>
      ) : (
        posts.map((post) => {
          return (
            <MyPost key={post?.userId} post={post} />
          )
        })
      )}

    </div>
  )
}

export default MyPosts
