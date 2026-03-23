import {useState} from "react";

export default function Post() {
    const [post, setPost] = useState({ description: ""})

    const submitPost = async(e) => {
        e.preventDefault()
    }

    return (
        <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
            <form>
                <h1 className="text-2xl font-bold">Create a new post</h1>
                <div className="py-2">
                    <h3 className="text-lg font-medium py-2">Description</h3>
                    <textarea value={post.description} onChange={(e) => setPost({ ...post, description: e.target.value})} className="bg-gray-800 h-48 w-full text-white text-sm rounded-lg p-2"></textarea>
                    <p>{post.description.length}/300</p>
                </div>
                <button onSubmit={submitPost} className="btn-primary w-full">Submit</button>
            </form>
        </div>
    )
}