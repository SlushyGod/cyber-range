import Link from 'next/link';
import { withAuthenticator } from "@aws-amplify/ui-react";

const Home = () => {
  return (
    <>
      <h1>Welcome to Next.js!</h1>
      <Link href="/about">
        About
      </Link>
    </>
  );
}

export default withAuthenticator(Home);
