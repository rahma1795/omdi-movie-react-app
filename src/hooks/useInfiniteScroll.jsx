import { useEffect } from "react";

const useInfiniteScroll = (callback, hasMore, loading, threshold = 100) => {
    useEffect(() => {
        const onScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold &&
                hasMore &&
                !loading
            ) {
                callback();
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [callback, hasMore, loading, threshold]);
};

export default useInfiniteScroll;
