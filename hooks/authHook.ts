import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {useRouter} from "next/navigation";
import {login} from "@/store/authSlice";

const useAuth = () => {
    const router = useRouter()
    const authState = useSelector((state: RootState) => state.auth.authState);
    const dispatch = useDispatch<AppDispatch>();

    if (authState) router.push('/')

    const loginHandler = (id: string, email: string, token: string) => dispatch(login({id, email, token}))

    return {loginHandler}
}

export default useAuth;