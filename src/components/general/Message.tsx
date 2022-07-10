// @ts-ignore
export default function Message({ color, message }) {
    return (
        <div className="d-flex flex-wrap justify-content-center">
            <div className="break" />
            <p className={`lead ${color}`}>{message}</p>
            <div className="break" />
        </div>
    );
}
