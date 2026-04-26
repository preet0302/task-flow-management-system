import AppRoutes from "./routers/AppRoutes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "./api/axios";
import { setAuth, setUser, setLoading } from "./redux/slices/authSlice";
import Loader from "./components/Loader";

const App = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        dispatch(setAuth(true));
        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(setAuth(false));
        dispatch(setUser(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) return <Loader />;

  return <AppRoutes />;
};

export default App;