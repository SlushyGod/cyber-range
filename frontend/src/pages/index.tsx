import Link from 'next/link';
import { withAuthenticator } from "@aws-amplify/ui-react";
import ChallengePage from './ChallengePage';

const Home = () => {
  return (
    <ChallengePage />
  );
}

export default withAuthenticator(Home);
