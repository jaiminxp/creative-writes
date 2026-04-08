import {useEffect, useState} from "react";
import { collection, addDoc, serverTimestamp, doc, updateDoc} from 'firebase/firestore'
import {auth, db} from "@/utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import { toast } from "react-toastify";

export default function Post() {
    const [user, loading] = useAuthState(auth)
    const route = useRouter()
    const routeData = route.query
    const [post, setPost] = useState({
        description: routeData?.description || "",
        id: routeData?.id || null
    })

    //Submit post
    const submitPost = async(e) => {
        e.preventDefault()

        //Run checks for description
        if(!post.description) {
            toast.error("Description field empty 😅", {
                position: "top-center",
                autoClose: 1500
            })
            return;
        }

        if(post.description.length > 300) {
            toast.error("Description too long 😅", {
                position: "top-center",
                autoClose: 1500
            })
            return;
        }

        if (post.id) {
            //Update the post
            const docRef = doc(db, "posts", post.id)
            const updatedPost = { ...post, timestamp: serverTimestamp() }
            await updateDoc(docRef, updatedPost)
            toast.success("Post has been updated", {
                position: "top-center",
                autoClose: 1500
            })
            return route.push('/')
        } else {
        //Make new post
        const collectionRef = collection(db, "posts")
        await addDoc(collectionRef, {
            ...post,
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName,
            description: post.description,
        })
        setPost({ description: ""})
            return route.push('/')
        }
    }

    //check user
    const checkUser = async () => { 
        if (loading) return;
        if (!user) return route.push("/auth/login")
    }
    
    useEffect(() => {
        checkUser()
    }, [user, loading])

    return (
        <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
            <form onSubmit={submitPost}>
                <h1 className="text-2xl font-bold">{post.id ? "Edit Post" : "Create a new post"}</h1>
                <div className="py-2">
                    <h3 className="text-lg font-medium py-2">Description</h3>
                    <textarea value={post.description} onChange={(e) => setPost({ ...post, description: e.target.value})} className="bg-gray-800 h-48 w-full text-white text-sm rounded-lg p-2"></textarea>
                    <p>{post.description.length}/300</p>
                </div>
                <button className="btn-primary w-full">{post.id ? "Update" : "Create"} Post</button>
            </form>
        </div>
    )
}