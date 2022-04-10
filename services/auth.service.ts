import axios from "services/axios.service";
import jwtDecode from "jwt-decode";

class AuthService {
  setAxiosInterceptors = (props: any) => {
    const { onLogout } = props;
    const time = `${Date.now()}`.substr(9);

    //Default Axios
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
    // axios.defaults.timeout = 30000;
    axios.defaults.headers.Accept = "*/*";
    axios.defaults.headers["Content-Type"] = "application/json";
    //axios.default.withCredentials = false // ถ้าใ่ส่ true อาจะติด CORS

    // On Request
    axios.interceptors.request.use((request) => request);

    // On Response

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(`RES:${time}`, { status: error?.response?.status || 503, error: `${error}` });
        if (error.response && error.response.status === 401) {
          if (onLogout) {
            onLogout();
          }
        }
        return Promise.reject(error);
      }
    );
  };

  //Set Token to Axios
  setAuthorization = (accessToken: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  };

  //Remove Token to Axios
  removeAuthorization = () => {
    delete axios.defaults.headers.common["Authorization"];
  };

  // Verify Token and Verify Expries
  isValidToken = (token?: string | null) => {
    if (!token) {
      return false;
    }
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  };
}
const authService = new AuthService();

export default authService;
