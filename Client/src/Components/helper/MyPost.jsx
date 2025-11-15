import React, { useContext } from 'react'
import { List, PlusCircle, User, MessageSquare, Tag, PenTool, BookOpen, Hash } from 'lucide-react';
import { PostListConTXT } from './PostList-Store';


const MyPost = ({ post }) => {

    const { deletePost } = useContext(PostListConTXT);

    const onDeletePost = (id) => {
        deletePost(id)
    }

    return (
        <div>
            <div className="p-6">

                <div className="space-y-6">

                    {/* --- Post Item 1 --- */}
                    <div className="card w-full bg-base-100 shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300">
                        <div className="card-body p-5">

                            {/* Title */}
                            <h3 className="card-title text-2xl text-primary flex items-center gap-2">
                                <BookOpen className="w-6 h-6" />
                                {post?.title}
                            </h3>

                            {/* Subject and User ID */}
                            <div className="flex justify-between items-center text-sm text-gray-600 border-b pb-2 mb-2">
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold text-secondary">Subject:</span> {post?.subject}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span className="font-semibold">User ID:</span> {post?.userId}
                                </div>
                            </div>

                            {/* Tags Section */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                                    <Hash className="w-3 h-3" /> Tags:
                                </span>
                                {post?.tags?.map((tag) => {
                                    return (
                                        <div className="badge badge-info badge-outline">#{tag}</div>
                                    )
                                })}
                            </div>

                            <button onClick={() => onDeletePost(post?.userId)} className='bg-red-500 text-white p-4 rounded-md pt-3'>
                                Delete
                            </button>

                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default MyPost


