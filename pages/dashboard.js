import {auth} from "@/utils/firebase";
import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";

export default function Dashboard() {
    const route = useRouter()
    const [user, loading] = useAuthState(auth)

    if(loading) return;
    if(!user) return route.push("/auth/login")

    return (
        <div>
            <h1>Your posts</h1>
            <button onClick={() => auth.signOut()} className="btn-primary">Sign out</button>
        </div>
    )

}