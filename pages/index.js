import Message from "@/components/message";
import {useEffect, useState} from "react";
import {db} from "@/utils/firebase";
import {collection, orderBy, query, onSnapshot} from "firebase/firestore";
import Link from "next/link";

export default function Home() {
    const [allPosts, setAllPosts] = useState([]);

    const getPosts = async () => {
        const collectionRef = collection(db, 'posts')
        const q = query(collectionRef, orderBy('timestamp', 'desc'))
        const unsubscribe = onSnapshot(q, ({docs}) => {
            setAllPosts(docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        })
        return unsubscribe;
    }

    useEffect(() => {
        getPosts()
    }, []);

    return <div className="my-12 text-lg font-medium">
        <h2>See what other people are saying</h2>
        {allPosts.map((post) => <Message {...post} key={post.id} >
            <Link href={{ pathname: `/${post.id}`, query: { ...post }}}>
                <button className="btn btn-secondary">{ post.comments?.length || 0 } comments</button>
            </Link>
        </Message>)}
    </div>;
}
