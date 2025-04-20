import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import Footer from "./components/Footer";
import NavHeadt from "./components/NavHeadt";
import HomePage from "./pages/HomePage";
import DetailMovie from './pages/detailMovie';
import MyHotFlix from './pages/MyHotFlix';
import Catalog from './pages/catalog';
import LoginForm from './pages/Login';
import SearchPage from './pages/SearchPage';
import CategoryMovie from './pages/CategoryMovie';
import Favourite from './pages/Favourite';
import CastListPage from './pages/CastListPage';
import ActorPage from './pages/ActorPage';
import TvPage from './pages/TvPage';
import DetailTv from './pages/DetailTv';
import TvSeasons from './pages/TvSeasons';
import TvPageSeasons from './pages/TvPageSeasons';
import ScrollToTop from './pages/ScrollToTop';
import TvEpisodes from './pages/TvEpisodes';
// import useScrollToTop from './hooks/useScrollToTop';

function App() {
  // useScrollToTop();

  // myProfile
  // my_profile
  // my-profile
  // detail-movie

  // MyProfile: rat it su dung

  return (
    <BrowserRouter>
      <NavHeadt />
      <ScrollToTop />
      {/* {useScrollToTop()} */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-profile" element={<MyHotFlix />} />
        {/* my-profile */}
        <Route path="/catalog" element={<Catalog />} />
        {/* catalog */}
        <Route path="/detail-movie/:id" element={<DetailMovie />} />
        {/* detail-movie/:id */}
        <Route path="/detail-movie/:id/cast" element={<CastListPage />} />
        {/* detail-movie/:id/cast */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category" element={<CategoryMovie />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/person/:id" element={<ActorPage />} />
        <Route path="/tv_list" element={<TvPage />} />
        {/* tv */}
        <Route path="tv/:id" element={<DetailTv />} />
        {/* tv/:id */}
        <Route path="/tv-details/:id/season" element={<TvSeasons />} />
        {/* tv/:id/seasons */}
        <Route path="/tv-details/:id/season-list" element={<TvPageSeasons />} />
        {/* tv/:id/seasons/:seasionId */}
        <Route path="/tv-details/:id/season-list/:seasonId" element={<TvEpisodes />} />
      </Routes>
      <Footer />
    </BrowserRouter >
  );
}

export default App;
