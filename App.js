import 'react-native-gesture-handler';

import Nav from 'navigation/Nav';

// context
import React from 'react';
import UserContextProvider from 'context/UserContext';

const App = () => {
  return (
    <UserContextProvider>
      <Nav />
    </UserContextProvider>
  );
};

export default App;
