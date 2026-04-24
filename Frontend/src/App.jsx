import AppRoutes from "./routers/AppRoutes";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import api from "./api/axios";
import { setAuth, setUser, setLoading } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

 useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;

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
}, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;