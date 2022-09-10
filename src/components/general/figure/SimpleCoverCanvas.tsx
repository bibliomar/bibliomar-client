import Skeleton from "react-loading-skeleton";
import Cover, { CacheOptions } from "@readshape/covers";
import React from "react";
import { Book } from "../helpers/generalTypes";
import { StorageOptions } from "@readshape/covers/dist/types";
import SimpleFigureSkeleton from "./SimpleFigureSkeleton";

interface Props {
    book: Book;
    loadingClassName?: string;
}

export default function SimpleCoverCanvas({ book, loadingClassName }: Props) {
    const cacheOptions: CacheOptions = {
        identifier: `${book.md5}-canvas`,
        storage: StorageOptions.sessionstorage,
    };
    return (
        <Cover
            title={book.title}
            authors={[book.authors]}
            className="w-100 h-100"
            fallbackElement={
                <SimpleFigureSkeleton loadingClassName={loadingClassName} />
            }
            cacheOptions={cacheOptions}
        />
    );
}
