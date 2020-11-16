import React from 'react';
import { Route } from 'react-router-dom';

export function ClientRoot() {
  return (
    <>
      <Route path={'/'}>
        <div></div>
      </Route>
      <Route path={'/profile'}></Route>
    </>
  );
}
