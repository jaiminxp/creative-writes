import Link from "next/link";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/utils/firebase";

export default function Nav() {
    const [user, loading] = useAuthState(auth)
    return (
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
                <button className="text-lg font-medium">Creative Writes</button>
            </Link>
            <ul className="flex items-center gap-10">
                {!user && <Link
                    className="btn-primary ml-8"
                    href="/auth/login"
                >
                    Join Now
                </Link>}
                {user && <div className="flex items-center gap-6">
                    <Link href="/post">
                        <button className="btn-primary ml-8">Post</button>
                    </Link>
                    <Link href="/dashboard">
                        <img className="w-12 rounded-full cursor-pointer" src={user.photoURL} />
                    </Link>
                </div>}
            </ul>
        </nav>
    );
}
``