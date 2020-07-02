import React from 'react';
import { history } from 'umi';
import { localStorageGet } from '@/utils/util';

const auth = localStorageGet('auth')

export default (props: { children: React.ReactNode }) => {
  if (auth === 'admin') {
    return <div>{ props.children }</div>;
  } else {
    history.push('/layouts/403');
    return null
  }
}