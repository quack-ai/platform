import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Dashboard } from "../components/Dashboard";
import Footer from "../components/Footer";
import { LeftPanel } from "../components/LeftPanel";
import Navbar from "../components/Navbar";
import { Label } from "../components/ui/label";
import { toast } from "../components/ui/use-toast";
import { getAxiosErorrMessage } from "../components/utils";

export default function Home() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [githubToken, setGithubToken] = useState<string | null>(null);
  const [selectedRepoId, setSelectedRepoId] = useState<number | null>(null);
  const [repoConnected, setRepoConnected] = useState<boolean>(false);

  const router = useRouter();
  const authCode = router.query?.code;

  useEffect(() => {
    const storedToken = Cookie.get("githubToken");
    if (authCode && !storedToken && !githubToken) {
      // Get github token
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/login/github`, {
          code: authCode,
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        })
        .then(({ data }) => {
          if (data?.access_token) {
            setGithubToken(data?.access_token);
            // 7 days expiration cookie
            Cookie.set("githubToken", data?.access_token, { expires: 7 });
            router.replace("", undefined, { shallow: true });
          } else {
            console.log("No access token");
            toast({
              variant: "destructive",
              title: "Could not retrieve git token",
              description: "No token returned",
            });
          }
        })
        .catch((e) => {
          toast({
            variant: "destructive",
            title: "Could not retrieve git token",
            description: getAxiosErorrMessage(e).toString(),
          });
          console.log(e);
        });
    } else if (storedToken) {
      setGithubToken(storedToken);
    }
  }, [authCode]);

  useEffect(() => {
    const storedToken = Cookie.get("authToken");
    if (githubToken && !authToken && !storedToken) {
      // Get repos
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/login/token`, {
          github_token: githubToken,
        })
        .then(({ data }) => {
          if (data?.access_token) {
            setAuthToken(data?.access_token);
            Cookie.set("authToken", data?.access_token, { expires: 7 });
          } else {
            console.log("No access token for backend");
            toast({
              variant: "destructive",
              title: "Could not retrieve auth token",
              description: "No token returned",
            });
          }
        })
        .catch((e) => {
          toast({
            variant: "destructive",
            title: "Could not get auth token",
            description: getAxiosErorrMessage(e).toString(),
          });
          console.log(e);
        });
    } else if (storedToken) {
      setAuthToken(storedToken);
    }
  }, [githubToken, authToken]);

  return (
    <>
      <Navbar />
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          height: "83vh",
          top: 0,
          left: 0,
        }}
      >
        <LeftPanel
          className="w-[400px] flex-0"
          authToken={authToken}
          githubToken={githubToken}
          selectedRepoId={selectedRepoId}
          setSelectedRepoId={setSelectedRepoId}
          setRepoConnected={setRepoConnected}
          // @ts-ignore
          loadingAuth={(authCode || githubToken) && !authToken}
        />
        {authToken && githubToken && repoConnected ? (
          <Dashboard
            className="flex-1"
            selectedRepoId={selectedRepoId}
            authToken={authToken}
            selectedRepoConnected={repoConnected}
            githubToken={githubToken}
          />
        ) : (
          <Label className="text-2xl w-full h-full items-center justify-center flex">
            {!authToken
              ? "Authenticate to continue"
              : "Select a repo to continue"}
          </Label>
        )}
      </div>
      <Footer />
    </>
  );
}
