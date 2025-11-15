import { createContext, useEffect, useReducer } from "react";

export const PostlListCONTXT = createContext({
    posts: [],
    addPost: () => { },
    deletePost: () => { },
    deleteAll: () => { }
})

// reducer function

const postReducer = (curPost, action) => {
    let newPosts = curPost;

    if (action.type === "ADD_POST") {
        newPosts = [action.payload.post, ...curPost];
    }

    if (action.type === "DEL_POST") {
        newPosts = curPost.filter((post) => post.userId !== action.payload.id);
    }

    if (action.type === "INIL_POST") {
        newPosts = action.payload.posts;
    }

    localStorage.setItem('MINE', JSON.stringify(newPosts));
    return newPosts;
}


const PostListProvider = ({ children }) => {
    let [posts, dispatchPost] = useReducer(postReducer, []);

    const addPost = (post) => {
        dispatchPost({
            type: "ADD_POST",
            payload: post
        })
    }


    const deletePost = (id) => {
        dispatchPost({
            type: "DEL_POST",
            id: id
        })
    }


    const deleteAll = () => {
        dispatchPost({
            type: "INIL_POST"
        })
    }


    useEffect(() => {
        let myPosts = localStorage.getItem("MINE");

        if (myPosts) {
            try {
                let rePosts = JSON.parse(myPosts);
                dispatchPost({
                    type: "INIL_POST",
                    posts: rePosts
                })
            } catch (error) {
                console.log('Error in "INIL_POST" track it', myPosts);
            }
        }
    }, [])

    return (
        <PostlListCONTXT.Provider value={{ posts, addPost, deletePost, deleteAll }}>
            {children}
        </PostlListCONTXT.Provider>
    )
}
