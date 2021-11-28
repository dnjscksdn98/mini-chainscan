CREATE TABLE `Chain` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chainId` int NOT NULL,
  `syncedBlock` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `Block` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chainId` int NOT NULL,
  `baseFeePerGas` varchar(32) NOT NULL,
  `difficulty` varchar(32) NOT NULL,
  `extraData` varchar(32) NOT NULL,
  `gasLimit` int NOT NULL,
  `gasUsed` int NOT NULL,
  `hash` varchar(66) NOT NULL,
  `logsBloom` text NOT NULL,
  `miner` varchar(42) NOT NULL,
  `mixHash` varchar(66) NOT NULL,
  `nonce` varchar(32) NOT NULL,
  `number` int NOT NULL,
  `parentHash` varchar(66) NOT NULL,
  `receiptsRoot` varchar(66) NOT NULL,
  `sha3Uncles` varchar(66) NOT NULL,
  `size` int NOT NULL,
  `stateRoot` varchar(66) NOT NULL,
  `timestamp` int NOT NULL,
  `totalDifficulty` varchar(32) NOT NULL,
  `transactionsRoot` varchar(66) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Block_chainId` (`chainId`),
  CONSTRAINT `FK_Block_chainId` FOREIGN KEY (`chainId`) REFERENCES `Chain` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `Transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blockId` int NOT NULL,
  `from` varchar(42) NOT NULL,
  `gas` int NOT NULL,
  `gasPrice` varchar(32) NOT NULL,
  `maxFeePerGas` varchar(32) NOT NULL,
  `maxPriorityFeePerGas` varchar(32) NOT NULL,
  `hash` varchar(66) NOT NULL,
  `input` text NOT NULL,
  `nonce` int NOT NULL,
  `to` varchar(42) NOT NULL,
  `transactionIndex` int NOT NULL,
  `value` varchar(32) NOT NULL,
  `type` int NOT NULL,
  `v` varchar(8) NOT NULL,
  `r` varchar(66) NOT NULL,
  `s` varchar(66) NOT NULL,
  `contractAddress` varchar(42) NULL,
  `cumulativeGasUsed` int NOT NULL,
  `effectiveGasPrice` varchar(32) NOT NULL,
  `gasUsed` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Transaction_blockId` (`blockId`),
  CONSTRAINT `FK_Transaction_blockId` FOREIGN KEY (`blockId`) REFERENCES `Block` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `TransactionLog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transactionId` int NOT NULL,
  `address` varchar(42) NOT NULL,
  `data` text NOT NULL,
  `logIndex` int NOT NULL,
  `removed` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_TransactionLog_transactionId` (`transactionId`),
  CONSTRAINT `FK_TransactionLog_transactionId` FOREIGN KEY (`transactionId`) REFERENCES `Transaction` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `TransactionLogTopic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logId` int NOT NULL,
  `topic` varchar(66) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_TransactionLogTopic_logId` (`logId`),
  CONSTRAINT `FK_TransactionLogTopic_logId` FOREIGN KEY (`logId`) REFERENCES `TransactionLog` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
