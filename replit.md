# RDX-BoT

## Overview

RDX-BoT is a Facebook Messenger automation bot built with Node.js. It provides group management, Islamic content posting, an economy system, and various utility commands for Facebook Messenger groups. The bot uses a custom Facebook Chat API wrapper for authentication and messaging.

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
- Each command exports:
  - `config` object with: name, aliases, description, usage, category, permissions (adminOnly, groupOnly)
  - `run` function that receives: api, event, args, send, config, client, Users, Threads, Currencies
- Commands loaded dynamically via `Data/system/handle/handleRefresh.js`
- Supports prefixed commands (configurable prefix, default ".")
- Command categories: Admin, Group, Economy, Media, Fun, Utility, Friend, Profile

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

### Database Layer
- **SQLite** via `better-sqlite3` for data persistence
- Controllers in `Data/system/controllers/`:
  - `users.js` - User management, banning, name caching
  - `threads.js` - Group management, approval system, per-thread settings
  - `currencies.js` - Economy system (balance, bank, daily rewards, streaks)

### Configuration
- `Data/config/envconfig.json` - Bot settings (name, prefix, admins, timezone, feature toggles)
- `Data/config/islamic_messages.json` - Islamic content for scheduled auto-posting

## External Dependencies

### NPM Packages
- **ws3-fca** - Facebook Chat API wrapper (customized as rdx-fca)
- **better-sqlite3** - SQLite database driver
- **express** - Web server for dashboard
- **axios** - HTTP client for API calls
- **node-cron** - Task scheduling for automated posts
- **moment-timezone** - Timezone-aware date/time handling (Asia/Karachi)
- **jimp/canvas** - Image processing for profile pictures and edits
- **fs-extra** - Enhanced file system operations
- **chalk** - Terminal styling for logs

### External APIs
- **Facebook Graph API** - User profile pictures, friend requests
- **Google Translate API** - Translation commands (Arabic, Bengali, English)
- **Tenor API** - GIF search functionality
- **Cerebras AI** - Conversational AI responses

### File Storage
- `appstate.json` - Facebook session cookies
- `fb_dtsg_data.json` - Facebook dynamic tokens
- `Data/system/database/` - SQLite database files
- `rdx/commands/cache/` - Temporary media files (auto-cleaned)