import React, { useState } from 'react';
import { List, PlusCircle, User, MessageSquare, Tag, PenTool, BookOpen, Hash } from 'lucide-react';
import MyPosts from './MyPosts.jsx';
import AddPost from './AddPost.jsx';
import PostListProvider from './PostList-Store.jsx';


const MainForm = () => {
  const [activeTab, setActiveTab] = useState('seePosts');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd handle form submission logic here
    console.log('Form Submitted (UI Placeholder)');
  };


  return (
    <PostListProvider >
      <div className="flex justify-center p-8 bg-gray-50 min-h-screen">
        <div className="card w-full max-w-2xl bg-white shadow-2xl border border-gray-100">

          {/* Tabs */}
          <div className="tabs tabs-boxed p-2 bg-base-200 rounded-b-none">

            <a
              className={`tab flex-1 flex items-center gap-2 text-lg ${activeTab === 'seePosts' ? 'tab-active bg-primary text-primary-content font-bold' : 'text-gray-600'}`}
              onClick={() => setActiveTab('seePosts')}
            >
              <List className="w-5 h-5" />
              See Posts
            </a>

            <a
              className={`tab flex-1 flex items-center gap-2 text-lg ${activeTab === 'addPost' ? 'tab-active bg-primary text-primary-content font-bold' : 'text-gray-600'}`}
              onClick={() => setActiveTab('addPost')}
            >
              <PlusCircle className="w-5 h-5" />
              Add Post
            </a>
          </div>

          {/* Content Area */}
          <div className="card-body p-0">
            {activeTab === 'seePosts' ? <MyPosts /> : <AddPost />}
          </div>
        </div>
      </div>
    </PostListProvider>
  );
};

export default MainForm;