# Take2Save

Take2Save is a decentralized platform that enables secure product purchases with a built-in scoring and certification system. It allows customers to rate their shopping experiences across multiple metrics (quality, speed, attention) and retailers to earn certifications based on their performance.

## Features

- **Tokenized Payments**: Native dollar-pegged token for transactions
- **Product Management**: Retailers can list and manage product inventories
- **Customer Scoring System**: Multi-metric feedback system including:
  - Quality scores
  - Speed of service scores
  - Attention to customer scores
- **Performance Certifications**: NFT-based certifications for retailers achieving high scores
- **Transparent Feedback**: On-chain verification of customer experiences

## Smart Contracts

### Core Contracts

1. **Dollar.sol**
   - ERC20 token for platform payments
   - Pegged to USD for stable pricing

2. **Product.sol**
   - ERC721 token for product listings
   - Handles product inventory and purchases
   - Tracks ownership and usage status

3. **Score.sol**
   - Manages the scoring system
   - Links products, customers, and ratings
   - Distributes score tokens to retailers

4. **Certification.sol**
   - ERC721 token for retailer certifications
   - Issues achievement-based certificates
   - IPFS integration for certificate metadata

### Token Contracts

- **Quality.sol**: ERC20 token for quality scores
- **Speed.sol**: ERC20 token for speed scores
- **Attention.sol**: ERC20 token for customer attention scores

## Getting Started

### Prerequisites

- Node.js >= 18.18.0
- Yarn >= 3.2.3
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Take2save.git
cd Take2save
```

2. Install dependencies:
```bash
yarn install
```

3. Set up your environment:
```bash
cp packages/hardhat/.env.example packages/hardhat/.env
cp packages/nextjs/.env.example packages/nextjs/.env
```

### Development Setup

1. Start the local Hardhat network:
```bash
yarn chain
```

2. Deploy the contracts:
```bash
yarn deploy
```

3. Start the frontend:
```bash
yarn start
```

### Testing

Run the test suite:
```bash
cd packages/hardhat
npx hardhat test
```

## Project Structure

```
Take2save/
├── packages/
│   ├── hardhat/
│   │   ├── contracts/        # Smart contracts
│   │   ├── deploy/          # Deployment scripts
│   │   └── test/            # Contract tests
│   └── nextjs/
│       ├── components/      # React components
│       ├── pages/          # Next.js pages
│       └── hooks/          # Custom React hooks
```

## Contract Interactions

### Core Flow

1. Retailers list products using the Product contract
2. Customers purchase products using Dollar tokens
3. After using products, customers provide scores
4. Retailers accumulate score tokens based on ratings
5. High-performing retailers can claim certification NFTs

### Scoring System

- Each purchase can be rated on three metrics:
  - Quality (0-10)
  - Speed (0-10)
  - Attention (0-10)
- Minimum score of 10 tokens required for certification
- Scores are permanently recorded on-chain

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

- Smart contracts are open source and can be audited
- Use discretion when interacting with unaudited contracts
- Report security vulnerabilities to security@take2save.com

## Support

For support and inquiries:
- Open an issue on GitHub
- Join our Discord community
- Email: support@take2save.com

## Acknowledgments

- OpenZeppelin for smart contract libraries
- Scaffold-ETH for initial development framework
- The Ethereum community for continuous inspiration