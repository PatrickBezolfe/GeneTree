import React, { Component } from 'react';

import SessionMain from './components/SessionMain';

import './global.css';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

class App extends Component {
  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <SessionMain/>
        </div>
      </QueryClientProvider>
    );
  }
}

export default App;
