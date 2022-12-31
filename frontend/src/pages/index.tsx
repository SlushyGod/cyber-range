import Link from 'next/link';
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';

const getChallenges = () => {
  const apiName = 'cyber-range-api';
  const path = '/challenges';
  const myInit = { };

  return API.get(apiName, path, myInit);
};


const Home = () => {

  useEffect(() => {
    getChallenges()
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
