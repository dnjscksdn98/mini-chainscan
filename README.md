## Mini ChainScan

----

### Introduction
Mini ChainScan can be attached to any EVM node. It consumes every new mined block from the node and abstracts the triggered transactions and saves the data to your database. Since this process is up and running, it will replace your attempt to use a third-party library to fetch blockchain data from the node to a single simple api call.

### Architecture
<img width="775" src="https://user-images.githubusercontent.com/59077132/144713750-ae684932-c2cd-4a5b-ae3a-00958e924666.png">

### Tech Stack
> Application

<img width="758" src="https://user-images.githubusercontent.com/59077132/144713147-0ef14f62-9487-4784-932c-c4095420af2b.png">

> DataBase

<img width="462" src="https://user-images.githubusercontent.com/59077132/144713203-91bb78b2-5248-4cea-8590-f52864ecd3f6.png">

> DevOps

<img width="278" src="https://user-images.githubusercontent.com/59077132/144713254-5c6b77ba-fcbf-428b-91b7-1ae362d0ef87.png">

### Get Started
Create a config.json file in your home directory and then run the following command.
```
docker run -d --name <app-name> -p 3000:3000 <your username>/mini-chainscan
```

### Members
- [@dnjscksdn98](https://github.com/dnjscknsd98)
