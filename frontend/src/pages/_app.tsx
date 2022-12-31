import { AppProps } from "next/app";
import '../styles/globals.css'
import { Amplify, Auth } from "aws-amplify"
import awsconfig from "../aws-exports"
import '@aws-amplify/ui-react/styles.css'

Amplify.configure({...awsconfig,
  ssr:true,
  API: {
    endpoints: [
      {
        name: "cyber-range-api",
        endpoint: "https://91pf4z7ujf.execute-api.us-east-2.amazonaws.com",
        custom_header: async () => {
          return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
        }
      }
    ]
  }
});

function MyApp({ Component, pageProps }: AppProps) {
      return <Component {...pageProps} />
}

export default MyApp;

