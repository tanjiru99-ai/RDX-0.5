# RDX-BoT

## Overview

RDX-BoT is a Facebook Messenger automation bot built with Node.js. It provides group management, Islamic content posting, economy system, and various utility commands for Facebook Messenger groups. The bot uses a custom Facebook Chat API wrapper for message handling and SQLite for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Entry Points
- **`index.js`** - Express server running on port 5000 that provides a web dashboard for bot configuration and management
- **`rdx.js`** - Main bot runtime that handles Facebook login via appstate, command loading, event listening, and scheduled tasks (Islamic content posting)

### Facebook Integration
- Uses `ws3-fca` (customized as `rdx-fca` in `Data/rdx-fca/`) - A Facebook Chat API wrapper for Node.js
- Authentication via `appstate.json` (Facebook session cookies stored as JSON)
- Manages `fb_dtsg` tokens for API requests in `fb_dtsg_data.json`
- Supports automatic re-login and token refresh

### Command System
- Commands stored in `rdx/commands/` directory (60+ command files)
- Each command exports a `config` object with: name, aliases, description, usage, category, permissions (adminOnly, groupOnly)
- Each command exports a `run` function that receives: api, event, args, send, config, client, Users, Threads, Currencies
- Commands loaded dynamically via `Data/system/handle/handleRefresh.js`
- Supports prefixed commands (configurable prefix, default ".")
- Command categories include: Admin, Group, Economy, Media, Fun, Utility, Friend, Profile

### Event System
- Events handled in `rdx/events/` directory
- Listen system in `Data/system/listen.js` routes events to appropriate handlers
- Handler files in `Data/system/handle/`:
  - `handleCommand.js` - Process commands
  - `handleEvent.js` - Handle events
  - `handleReaction.js` - Handle message reactions
  - `handleReply.js` - Handle reply-based interactions
  - `handleNotification.js` - Handle notifications
  - `handleCreateDatabase.js` - Auto-create database entries for new users/threads
  - `handleAutoDetect.js` - Auto-detection features

### Database Layer
- **SQLite** via `better-sqlite3` for data persistence
- Controllers in `Data/system/controllers/`:
  - `users.js` - User management, banning, name caching
  - `threads.js` - Group management, approval system, per-thread settings
  - `currencies.js` - Economy system (balance, bank, daily rewards, streaks)

### Configuration
- `Data/config/envconfig.json` - Bot settings including:
  - BOTNAME, PREFIX, ADMINBOT (admin UIDs array)
  - TIMEZONE, feature toggles (PREFIX_ENABLED, ADMIN_ONLY_MODE, AUTO_ISLAMIC_POST, etc.)
  - REACT_DELETE_EMOJI, APPROVE_ONLY mode
- `Data/config/islamic_messages.json` - Islamic content for auto-posting

### Utility Modules
- `Data/utility/logs.js` - Colored console logging with file output
- `Data/utility/send.js` - Message sending wrapper class
- `Data/utility/utils.js` - Common utilities (time formatting, number formatting, etc.)

### Key Features
1. **Group Management** - Admin commands, anti-join/anti-out, member kicking, group locking, approval system
2. **Islamic Content** - Scheduled Quran ayats, namaz reminders, duas with images
3. **Economy System** - Daily rewards with streaks, balance, bank deposits, gambling
4. **AI Chat** - Integration with Cerebras AI for conversational responses (goibot command)
5. **Media Commands** - Avatar, GIF search, image editing, cover photo generation
6. **Friend Management** - Accept/decline friend requests, friend list, blocking

## External Dependencies

### NPM Packages
- `ws3-fca` - Facebook Chat API (customized version in Data/rdx-fca/)
- `better-sqlite3` - SQLite database driver
- `express` - Web server for dashboard
- `axios` - HTTP client for external APIs
- `node-cron` - Scheduled task execution
- `moment-timezone` - Timezone-aware date/time handling
- `jimp` - Image manipulation
- `canvas` - Image/graphics generation
- `chalk` - Terminal colors for logging
- `fs-extra` - Enhanced file system operations
- `yt-search` - YouTube search functionality

### External APIs
- **Cerebras AI** (`api.cerebras.ai`) - AI chat completions for goibot command
- **Facebook Graph API** - User profile pictures, friend requests
- **Tenor API** - GIF search functionality
- **ImgBB API** - Image hosting/uploading

### Data Storage
- SQLite database (via better-sqlite3) stored in `Data/system/database/`
- JSON files for configuration and temporary data in `Data/config/` and `rdx/data/`
- Cache directory for temporary media files at `rdx/commands/cache/`
