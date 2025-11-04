import { Link } from "react-router-dom";

export default function UsersList({ users = [] }) {
    if (!users || users.length === 0) return <p>No users</p>;
    return (
        <ul>
            {users.map((u) => (
                <li key={u.id}>
                    <Link to={`/profile/${u.id}`}>{u.username}</Link>
                </li>
            ))}
        </ul>
    );
}
