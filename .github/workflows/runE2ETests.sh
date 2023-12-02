#!/bin/bash

cd ../../
yarn install

cd client/
yarn install
yarn preview & # Adjust this command based on your project

cd ../
yarn e2e:ci