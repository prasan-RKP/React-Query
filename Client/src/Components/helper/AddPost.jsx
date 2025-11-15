import { MessageSquare, PenTool, PlusCircle, Tag, User } from 'lucide-react'
import React, { useContext, useRef } from 'react'
import { PostListConTXT } from './PostList-Store.jsx'


const AddPost = () => {

  const { addPost } = useContext(PostListConTXT);
  let userIdElem = useRef('');
  let subjectElem = useRef('');
  let titleElem = useRef('');
  let tagsElem = useRef('');

  const onFormSubmit = (e) => {

    e.preventDefault();

    let userId = userIdElem.current.value;
    let sub = subjectElem.current.value;
    let title = titleElem.current.value;
    let tags = tagsElem.current.value;

    let post = { userId, subject: sub, title, tags: tags.split(" ") };
    addPost(post);

    userIdElem.current.value = "";
    subjectElem.current.value = "";
    titleElem.current.value = "";
    tagsElem.current.value = "";
  }

  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary mb-6">Create New Post</h2>
        <form onSubmit={(e) => onFormSubmit(e)} className="space-y-5 text-gray-600">

          {/* User ID Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text flex items-center gap-2 font-medium">
                <User className="w-5 h-5 text-secondary" />
                User-ID
              </span>
            </label>
            <input
              ref={userIdElem}
              type="text"
              placeholder="e.g., U12345"
              className="input input-bordered w-full focus:input-primary"
              required
            />
          </div>

          {/* Subject Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text flex items-center gap-2 font-medium">
                <MessageSquare className="w-5 h-5 text-secondary" />
                Subject
              </span>
            </label>
            <input
              ref={subjectElem}
              type="text"
              placeholder="e.g., Web Development"
              className="input input-bordered w-full focus:input-primary"
              required
            />
          </div>

          {/* Title Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text flex items-center gap-2 font-medium">
                <PenTool className="w-5 h-5 text-secondary" />
                Post Title
              </span>
            </label>
            <input
              ref={titleElem}
              type="text"
              placeholder="A compelling title for your post"
              className="input input-bordered w-full focus:input-primary"
              required
            />
          </div>

          {/* Tags Field */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text flex items-center gap-2 font-medium">
                <Tag className="w-5 h-5 text-secondary" />
                Tags (Comma Separated)
              </span>
            </label>
            <input
              ref={tagsElem}
              type="text"
              placeholder="e.g., react, ui, frontend, tutorial"
              className="input input-bordered w-full focus:input-primary"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" className="btn btn-primary btn-block transition duration-200 ease-in-out hover:scale-[1.01]">
              <PlusCircle className="w-5 h-5" />
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPost
