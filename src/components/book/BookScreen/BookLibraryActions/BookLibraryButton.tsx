import { MDBBtn } from "mdb-react-ui-kit";

interface Props {
    status: number;
    category: string;
    triedCategory?: string;
    onClickHandler: any;
}

export default function BookLibraryButton(props: Props) {
    const colorBasedOnStatus = () => {
        if (props.status !== 0 && props.triedCategory !== "") {
            if (props.triedCategory !== props.category) {
                return "muted";
            } else {
                switch (props.status) {
                    case 103:
                        return "info";
                    case 200:
                        return "success";
                    case 400:
                        return "danger";
                    case 500:
                        return "danger";
                }
            }
        } else {
            return "primary";
        }
    };

    const messageBasedOnCategoryStatus = () => {
        if (
            props.status != 0 &&
            props.triedCategory !== "" &&
            props.triedCategory === props.category
        ) {
            switch (props.status) {
                case 103:
                    return "Adicionando...";
                case 200:
                    return "Adicionado";
                case 400:
                    return "Erro";
                case 500:
                    return "Erro";
            }
        } else {
            if (props.category === "reading") {
                return "Lendo agora";
            } else if (props.category === "to-read") {
                return "Planejando ler";
            } else if (props.category === "backlog") {
                return "Backlog";
            }
        }
    };

    return (
        <MDBBtn
            color={colorBasedOnStatus()}
            className="mb-2 mt-2 library-actions-button"
            onClick={async (evt) => {
                await props.onClickHandler(evt, props.category);
            }}
            disabled={
                props.status != 0 &&
                props.triedCategory !== "" &&
                props.triedCategory !== props.category
            }
        >
            {messageBasedOnCategoryStatus()}
        </MDBBtn>
    );
}
