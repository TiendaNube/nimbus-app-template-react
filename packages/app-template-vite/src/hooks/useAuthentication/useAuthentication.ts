
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useFetch } from "@/hooks";
import { AuthenticationContent } from "./useAuthentication.types";
import { IApiResponse } from "../useFetch/useFetch.types";
import { useToast } from "@nimbus-ds/components";


const useAuthentication = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const code = query.get("code");
  const storage = localStorage.getItem("authentication");
  const authentication = storage
    ? (JSON.parse(storage as string) as AuthenticationContent)
    : null;

  const { request } = useFetch();
  const { addToast } = useToast();

  const { isLoading:loadingToken } = useQuery(
    ["access-token"],
    () =>
      request<AuthenticationContent>({
        url: code ? `/auth?code=${code}` : "/auth",
        method: "GET",
      }),
    {
      retry: false,
      onSuccess:(data) => {
        localStorage.setItem("authentication",JSON.stringify(data.content))
        navigate("/");
      },
      onError: (error:string)=> {
        addToast({
          type: "danger",
          text:error,
          duration: 4000,
          id: "",
        });
      },
    }
  );


  const LOADING_AUTHENTICATION = useMemo(()=> loadingToken,[loadingToken]);


  const ACCESS_TOKEN = useMemo(()=>authentication?.access_token,[authentication?.access_token])

  return {
    ACCESS_TOKEN,
    LOADING_AUTHENTICATION,
  };
};

export default useAuthentication;
