import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Chỉ scroll nếu không phải là route episode chi tiết
    const isEpisodeDetail = /^\/tv-details\/\d+\/\d+\/\d+$/.test(pathname);
    if (!isEpisodeDetail) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
