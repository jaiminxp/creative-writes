import Message from "@/components/message";
import {useState} from "react";
import {db} from "@/utils/firebase";
import {collection, orderBy, query, onSnapshot} from "firebase/firestore";

export default function Home() {
    const [allPosts, setAllPosts] = useState([]);

    const getPosts = async () => {
        const collectionRef = collection(db, 'posts')
        const q = query(collectionRef, orderBy('timestamp', 'desc'))
        const unsubscribe = onSnapshot(q, (docs) => {
            setAllPosts(snapshot.docs.map((doc) => doc.data()));
        })
        return unsubscribe;
    }

    return <div className="my-12 text-lg font-medium">
        <h2>See what other people are saying</h2>
        <Message />
        <Message />
    </div>;
}
