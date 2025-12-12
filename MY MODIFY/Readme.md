# RDX-BoT

## Overview

RDX-BoT is a Facebook Messenger automation bot built with Node.js. It provides group management, Islamic content posting, economy system, and various utility commands for Facebook Messenger groups and chats. The bot uses a custom Facebook Chat API (ws3-fca/rdx-fca) to interact with Facebook Messenger.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Components

**Entry Points:**
- `index.js` - Express server (port 5000) providing web dashboard for bot configuration and management
- `rdx.js` - Main bot runtime that handles Facebook login, command loading, and event listening

**Facebook Integration:**
- Uses `ws3-fca` (customized as `rdx-fca`) - A Facebook Chat API wrapper for Node.js
- Handles authentication via `appstate.json` (Facebook session cookies)
- Manages `fb_dtsg` tokens for API requests in `fb_dtsg_data.json`

**Command System:**
- Commands stored in `rdx/commands/` directory
- Each command exports a `config` object (name, aliases, description, usage, category, permissions) and a `run` function
- Commands loaded dynamically via `Data/system/handle/handleRefresh.js`
- Supports prefixed commands (configurable prefix, default ".")

**Event System:**
- Events handled in `rdx/events/` directory
- Listen system in `Data/system/listen.js` routes events to appropriate handlers
- Supports: message, message_reply, reactions, notifications

**Database Layer (SQLite via better-sqlite3):**
- Controllers in `Data/system/controllers/`:
  - `users.js` - User management, banning, name caching
  - `threads.js` - Group management, approval system, settings
  - `currencies.js` - Economy system (balance, bank, daily rewards)

**Configuration:**
- `Data/config/envconfig.json` - Bot settings (name, prefix, admins, timezone, feature toggles)
- `Data/config/islamic_messages.json` - Islamic content for auto-posting

### Key Features

1. **Group Management** - Admin commands, anti-join/anti-out, member kicking, group locking
2. **Islamic Content** - Scheduled Quran ayats, namaz reminders, duas
3. **Economy System** - Daily rewards, balance, deposits, gambling
4. **AI Chat** - Integration with Cerebras AI for conversational responses
5. **Media Commands** - Avatar, GIF search, image editing, cover creation
6. **Friend Management** - Accept/decline requests, friend list, blocking

### Design Patterns

- **Modular Commands** - Each command is self-contained with config and execution
- **Controller Pattern** - Database operations abstracted into controller classes
- **Event-Driven** - Bot responds to Facebook events via listener callbacks
- **Singleton API** - Single Facebook API instance shared across commands

## External Dependencies

**Core Libraries:**
- `express` - Web server for dashboard
- `ws3-fca` - Facebook Messenger API (customized locally)
- `better-sqlite3` - SQLite database
- `node-cron` - Scheduled tasks (Islamic posts, token refresh)
- `moment-timezone` - Timezone handling (default: Asia/Karachi)

**Media Processing:**
- `jimp` - Image manipulation
- `canvas` - Image generation
- `axios` - HTTP requests for external APIs

**External APIs Used:**
- Facebook Graph API - Profile pictures, user info
- Tenor API - GIF search
- ImgBB - Image hosting
- Cerebras AI - Conversational AI responses

**Data Storage:**
- SQLite database in `Data/system/database/`
- JSON files for configuration and cached data
- File-based logging in `Data/system/database/botdata/logs/`
