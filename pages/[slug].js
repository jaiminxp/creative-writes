import Message from "@/components/message";
import { auth, db } from "@/utils/firebase";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Details() {
    const router = useRouter()
    const routeData = router.query
    const [comment, setComment] = useState("")
    const [allComments, setAllComments] = useState([])

    const submitMessage = async (e) => { 
        if (!auth.currentUser) return router.push('/auth/login')
        if (!comment) {
            toast.error("Comment is required 😅")
            return
        }

        const docRef = doc(db, "posts", routeData.id)
        await updateDoc(docRef, {
            comments: arrayUnion({
                comment,
                username: auth.currentUser.displayName,
                avatar: auth.currentUser.photoURL,
                time: Timestamp.now()
            })
        })

        setComment("")
    }
    
    return <div>
        <Message {...routeData} />
        <div className="my-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={comment}
                    placeholder="Send a message 😃"
                    className="bg-gray-800 w-full p-2 text-sm text-white rounded-lg"
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={submitMessage} className="btn btn-primary">Send</button>
            </div>
            {/* <div className="my-6">
                <h2 className="font-bold">Comments</h2>
                {allComments.map((c) => (<div>
                    
                </div>)) }
            </div> */}
        </div>
    </div>;
 }