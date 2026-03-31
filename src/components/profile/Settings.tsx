export default function Settings({ logout }: any) {
    return (
        <div className="settings-container">
            <button className="logout-btn" onClick={logout}>
                Выйти
            </button>
        </div>
    );
}