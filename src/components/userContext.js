import React from 'react'

const UserContext = React.createContext('No Data Yet')

const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

const UserContextFP = React.createContext('No Data Yet')

const UserProviderFP = UserContextFP.Provider;
const UserConsumerFP = UserContextFP.Consumer;

export {UserProvider, UserConsumer, UserProviderFP, UserConsumerFP}