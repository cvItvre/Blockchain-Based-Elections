: "
  To execute this it's needed the follow installed programs:

    - node;
    - npm;
    - npx;
    - docker;
    - ganache.

"

echo "sudo docker pull redis"
sudo docker pull redis

echo "sudo docker run --name cacheBlockchain -p 7001:6379 -d redis"
sudo docker run --name cacheBlockchain -p 7001:6379 -d redis

echo "sudo docker container start cacheBlockchain"
sudo docker container start cacheBlockchain

read -p "Execute now ganache, and then type enter: "

read -p "Put here the address of smart contract owner: " OWNER_ADDRESS

echo "Deploying contract - owner: $OWNER_ADDRESS"
CONTRACT_ADDRESS=$(node ./src/deployContract.js $OWNER_ADDRESS)
echo "Deployed contract - address: $CONTRACT_ADDRESS"

echo "Initializing service ..."
npx --no-install -c nodemon ./server.js $CONTRACT_ADDRESS




