import { useEffect, createContext, useReducer } from "react";

// create context -> stp-1
export const PostListConTXT = createContext({
    posts: [],
    addPost: () => { },
    deletePost: () => { },
    deleteAll: () => { }
})

// create 'reducer Functions' 
const postReducer = (curPosts, action) => {
    let newPosts = curPosts;

    if (action.type === "ADD_POST") {
        newPosts = [action.payload.post, ...curPosts];
    }

    if (action.type === "DELETE_POST") {
        newPosts = curPosts.filter((post) => post?.userId !== action.payload.id);
    }

    if (action.type === "IN_POSTS") {
        newPosts = action.payload.posts;
    }
    if (action.type === "DEL_ALL") {
        newPosts = [];
    }

    localStorage.setItem("CONO", JSON.stringify(newPosts));


    return newPosts;
}


// step 3 -> Provider

const PostListProvider = ({ children }) => {
    const [posts, dispatchPost] = useReducer(postReducer, []);

    const addPost = (post) => {
        dispatchPost({
            type: "ADD_POST",
            payload: {
                post: post
            }
        })
    }

    const deletePost = (id) => {
        dispatchPost({
            type: "DELETE_POST",
            payload: {
                id: id
            }
        })
    }

    const deleteAll = () => {
        dispatchPost({ type: "DEL_ALL" });
    };


    useEffect(() => {
        let myPosts = localStorage.getItem("CONO");
        if (myPosts) {
            try {
                let rePosts = JSON.parse(myPosts);
                dispatchPost({
                    type: "IN_POSTS",
                    payload: {
                        posts: rePosts
                    }
                })
            } catch (error) {
                console.error("Error loading posts:", error);
                // Clear corrupted data
                localStorage.removeItem("contex");
            }
        }
    }, [])

    return (
        <PostListConTXT.Provider value={{ deleteAll, addPost, deletePost, posts }}>
            {children}
        </PostListConTXT.Provider>
    )
}

export default PostListProvider;