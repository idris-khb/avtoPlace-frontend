export default function ProfileInfo({ user }: any) {
    return (
        <div>
            <h3>Информация</h3>
            <p>Email: {user.email}</p>
        </div>
    );
}