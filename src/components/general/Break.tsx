interface Breaking {
    className?: string;
}

export default function Break({ className }: Breaking) {
    return <div className={`break ${className ? className : null}`} />;
}
