import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import PageNextJs from 'nextjs/PageNextJs';

const Validators = dynamic(() => import('ui/pages/ValidatorsHistory'), { ssr: false });

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/validators/history">
      <Validators/>
    </PageNextJs>
  );
};

export default Page;

export { platonAppchain as getServerSideProps } from 'nextjs/getServerSideProps';
