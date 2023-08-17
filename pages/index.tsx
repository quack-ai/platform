import axios from "axios";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Dashboard } from "../components/Dashboard";
import Footer from "../components/Footer";
import { LeftPanel } from "../components/LeftPanel";
import Navbar from "../components/Navbar";

import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { getAxiosErorrMessage } from "@/components/utils";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [authToken, setAuthToken] = useState<any>(null);
  const [githubToken, setGithubToken] = useState<any>(null);
  const [selectedRepoId, setSelectedRepoId] = useState<any>(null);
  const [repoConnected, setRepoConnected] = useState<any>(false);

  const router = useRouter();
  const authCode = router.query?.code;

  useEffect(() => {
    if (authCode && !githubToken) {
      // Get github token
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/login/github`, {
          code: authCode,
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        })
        .then(({ data }) => {
          if (data?.access_token) {
            setGithubToken(data?.access_token);

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
    }
  }, [authCode]);

  useEffect(() => {
    if (githubToken && !authToken) {
      // Get repos
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/login/token`, {
          github_token: githubToken,
        })
        .then(({ data }) => {
          if (data?.access_token) {
            setAuthToken(data?.access_token);
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
    }
  }, [githubToken, authToken]);

  return (
    <>
      <Navbar />
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          width: "100vw",
          height: "80vh",
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
          loadingAuth={(authCode || githubToken) && !authToken}
        />
        {authToken && repoConnected ? (
          <Dashboard
            className="flex-1"
            selectedRepoId={selectedRepoId}
            authToken={authToken}
            selectedRepoConnected={repoConnected}
          />
        ) : (
          <Label className="text-2xl w-full h-full items-center justify-center flex">
            {!authToken
              ? "Authenticate to Continue"
              : "Connect Repo to Continue"}
          </Label>
        )}
      </div>
      <Footer />
    </>
  );
}
