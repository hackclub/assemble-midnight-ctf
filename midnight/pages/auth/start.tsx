import { getAuthorizeURL } from "lib/auth";
import { useEffect } from "react";
import getCookie from "lib/cookie";
import { GetServerSidePropsContext } from "next";

export default function Login({
  loginUrl,
  error,
}: {
  loginUrl: string;
  error: string;
}) {
  useEffect(() => {
    try {
      let cookie = getCookie("assemble_access_token");
      if (cookie && !error) {
        location.replace("/");
      } else {
        location.replace(loginUrl);
      }
    } catch (err) {
      location.replace(loginUrl);
    }
  }, []);
  return <div>Please wait...</div>;
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  const props = {
    loginUrl: getAuthorizeURL(ctx.req, ctx.res, ctx.query),
    error: ctx?.query?.error?.toString() || "",
  };

  return {
    props,
  };
}
