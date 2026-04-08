import {auth, db} from "@/utils/firebase";
import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, onSnapshot, where, query} from "firebase/firestore";
import {useEffect, useState} from "react";
import Message from "@/components/message";

export default function Dashboard() {
    const route = useRouter()
    const [user, loading] = useAuthState(auth)
    const [posts, setPosts] = useState([]);

    const getData = async () => {
        if(loading) return;
        if(!user) return route.push("/auth/login")

        const collectionRef = collection(db, 'posts')
        const q = query(collectionRef, where("user", "==", user.uid))
        const unsubscribe = onSnapshot(q, ({docs}) => {
            setPosts(docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        })
        return unsubscribe;
    }

    useEffect(() => {
        getData()
    }, [user, loading])

    return (
        <div>
            <h1>Your posts</h1>
            <div>
                {posts.map((post) => (<Message {...post} key={post.id} />))}
            </div>
            <button onClick={() => auth.signOut()} className="btn-primary">Sign out</button>
        </div>
    )

}