# GoFundMe Token Bot

A Telegram bot for running story-based fundraising competitions with SUNO token rewards on Solana.

## Features

- **Story-Based Fundraising**: Users share their stories and compete for SUNO token prizes
- **Voting System**: Community votes for stories they want to support
- **Treasury Bonus System**: Random bonus prizes from accumulated treasury
- **Multi-Tier System**: Different reward tiers based on contribution amount
- **Automatic Token Purchase**: Integrates with PumpPortal API and Jupiter for token purchases
- **Payment Timeouts**: Automatic cleanup of expired payment sessions

## Recent Improvements (v2.0)

### API Error Handling
- ✅ **Retry Logic**: 3 automatic retry attempts with exponential backoff (2s, 4s delays)
- ✅ **Request Timeout**: 30-second timeout prevents hanging requests
- ✅ **Jupiter Fallback**: Automatic fallback to Jupiter aggregator if PumpPortal fails
- ✅ **Better Error Messages**: Detailed logging for debugging API issues

### Configuration Improvements
- ✅ **Increased Slippage**: 15% slippage tolerance (up from 10%) for better success rate
- ✅ **Higher Priority Fees**: 0.0002 SOL priority fee (up from 0.0001) for faster execution
- ✅ **Transaction Validation**: Validates transaction data before processing

### Bug Fixes
- ✅ Fixed webhook URL configuration
- ✅ Fixed redirect URL references
- ✅ Fixed self-ping URL for Render deployment
- ✅ Improved balance tracking after token purchases

## Environment Variables

Required environment variables:

```bash
BOT_TOKEN=your_telegram_bot_token
BOT_USERNAME=@your_bot_username
BOT_PRIVATE_KEY=[your_treasury_keypair_array]
SOLANA_RPC_URL=your_solana_rpc_url
PORT=10000
```

## Installation

```bash
npm install
```

## Running the Bot

```bash
npm start
```

## Architecture

### Token Purchase Flow
1. User submits SOL payment
2. 10% transaction fee sent to fee wallet
3. Remaining 90% SOL used to buy SUNO tokens via:
   - **Primary**: PumpPortal API (with auto pool detection)
   - **Fallback**: Jupiter Aggregator
4. Tokens split between user and competition pool
5. User receives their portion immediately

### Competition Phases
1. **Submission Phase** (5 minutes): Users share stories and make payments
2. **Voting Phase** (5 minutes): Community votes on stories
3. **Winners Phase**: Top 5 stories win prizes, bonus prize chance activates
4. **Cooldown** (1 minute): Brief pause before next round starts

### Tier System
- 🎵 **Basic** (0.01-0.049 SOL): 50% retention, 1.0x multiplier
- 💎 **Mid Tier** (0.05-0.099 SOL): 55% retention, 1.05x multiplier
- 👑 **High Tier** (0.10-0.499 SOL): 60% retention, 1.10x multiplier
- 🐋 **Whale** (0.50+ SOL): 65-75% retention, 1.15-1.50x multiplier

## API Integration

### PumpPortal API
- Handles both pump.fun bonding curve and Raydium pool trades
- Auto-detects the appropriate pool
- Returns raw binary transaction data

### Jupiter Aggregator
- Fallback for when PumpPortal fails
- Uses best route across all DEXes
- Higher reliability for graduated tokens

## Deployment

Designed for deployment on Render.com:
- Automatic webhook setup
- Self-ping to prevent sleep on free tier
- State persistence to file system

## Security Features

- Rate limiting on all endpoints
- Input validation for payments
- Wallet address validation
- Transaction confirmation before proceeding
- Payment timeout and cleanup

## Support

For issues or questions, contact the development team.

## License

Private - All rights reserved
