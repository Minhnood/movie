import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import Footer from "./components/Footer";
import NavHeadt from "./components/NavHeadt";
import HomePage from "./pages/HomePage";
import DetailMovie from './pages/DetailMovie';
import MyHotFlix from './pages/MyHotFlix';
import Catalog from './pages/Catalog';
import LoginForm from './pages/Login';
import SearchPage from './pages/SearchPage';
import CategoryMovie from './pages/CategoryMovie';
import Favourite from './pages/Favourite';
import CastListPage from './pages/CastListPage';
import ActorPage from './pages/ActorPage';
import TvPage from './pages/TvPage';
import ScrollToTop from './pages/ScrollToTop';

function App() {

  // myProfile
  // my_profile
  // my-profile
  // detail-movie

  // MyProfile: rat it su dung

  return (
    <BrowserRouter>
      <NavHeadt />
      <Routes>
        <ScrollToTop />
        <Route path="/" element={<HomePage />} />
        <Route path="/myProfile" element={<MyHotFlix />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/DetailMovie/:id" element={<DetailMovie />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category" element={<CategoryMovie />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/DetailMovie/:id/cast" element={<CastListPage />} />
        <Route path="/person/:id" element={<ActorPage />} />
        <Route path="/tv_list" element={<TvPage />} />
      </Routes>
      <Footer />
    </BrowserRouter >
  );
}

export default App;
