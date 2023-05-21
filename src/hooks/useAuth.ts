import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = (code: string | null) => {
  const [accessToken, setAccessToken] = useState<string | null>();
  const [refreshToken, setRefreshToken] = useState<string | null>();
  const [expiresIn, setExpiresIn] = useState<number | null>();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, '', "/")
      })
      .catch(() => {
      window.location.href = "/"
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location.href = "/";
        });
    }, (expiresIn - 60) * 1000);
  
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
