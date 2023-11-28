#!/bin/bash

cd ../../
yarn install

cd src/client/
yarn install
yarn preview & # Adjust this command based on your project

cd ../../
yarn cy:run