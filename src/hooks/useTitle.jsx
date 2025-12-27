import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Local Chef Bazaar`;
  }, [title]);
};

export default useTitle;