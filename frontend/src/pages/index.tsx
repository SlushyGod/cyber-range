import Link from 'next/link';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';

import { ChallengeCard } from '../components/ChallengeCard.tsx';

const getChallenges = () => {
  const apiName = 'cyber-range-api';
  const path = '/challenges';
  const myInit = { };

  return API.get(apiName, path, myInit);
};


const Home = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    getChallenges()
      .then(data => {
        setChallenges(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let challengeCards = challenges.map(challenge =>
    <ChallengeCard challenge={challenge} id={challenge.name}/>
  );

  return (
    <>
      { challengeCards }
    </>
  );
}

export default withAuthenticator(Home);
