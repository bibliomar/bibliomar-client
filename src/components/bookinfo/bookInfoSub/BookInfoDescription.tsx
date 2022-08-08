import Break from "../../general/Break";

interface Props {
    description: string;
}

export default function BookInfoDescription({ description }: Props) {
    return (
        <div className="d-flex flex-wrap mt-5">
            <h4
                className="book-info-title-bold mb-4"
                style={{ fontWeight: "700" }}
            >
                Descrição
            </h4>
            <Break />
            <p className="book-info-description">{description}</p>
        </div>
    );
}
