# Graph Report - nanoclaw-v2  (2026-07-27)

## Corpus Check
- 655 files · ~847,037 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 4990 nodes · 10309 edges · 325 communities (281 shown, 44 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 147 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `adbe41a5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Task Formatting & Display
- Startup Circuit Breaker
- Channel Wiring Defaults
- Agent Group DB Access
- CLI Guard & Delivery Actions
- Session/Approval DB Layer
- OneCLI Client & Formatting
- Session DB Connection Mgmt
- Container Restart & Wake
- Central DB Migrations
- Session DB Schema
- Test Fixtures & Attachments
- WhatsApp Adapter Internals
- ncl CLI Entry Point
- Ask-Question Normalization
- Self-Mod Approval Flow
- Session State & Continuation
- Router Command Formatting
- Dashboard Data Collection
- Claude Provider Runtime
- Chat SDK Bridge Actions
- Channel Adapter Interface
- Channel Registry & Setup
- Agent-to-Agent MCP Tools
- Outbound Delivery Polling
- Provider Factory & Mocks
- Admin Command Gate
- Destination Routing & Inbox Safety
- Compact Instructions & Session Routing
- Container Poll Loop
- SDK Dependencies (package.json)
- Telegram Pairing Flow
- Generic CRUD Dispatch
- Container Runner & Mounts
- Approvals & Destinations CRUD
- Agent Collaboration Patterns
- CLI Resource Dispatch
- Legacy Container Config Backfill
- Mount Security Allowlist
- User-DM Cache & Delivery
- CLI Help System
- Container Env Config
- TypeScript Build Config
- Group Folder Validation
- Memory File Read/Write
- CLAUDE.md Compose Tests
- CRUD Test Harness
- Host Runtime Config
- Webhook Server
- Agent-Runner Config & Entry
- Core Type Definitions
- Task Script Runner
- CLI Help Rendering
- OneCLI Approval Bridge
- SDK Hook Signal Probe
- Task/Template Parsing
- Claude Provider Session Hooks
- Group Persona Staging
- Container Restart Tests
- Agent Memory System (OKF)
- Chat SDK Message Splitting
- Group Filesystem Init
- Dashboard Wiring Tests
- Task Session Templates
- Create-Agent Delivery Action
- Channel Approval Tests
- Attachment Naming
- CLI Tools Manifest
- Gmail Dockerfile Tools
- WhatsApp Mention Syntax
- Memory Migration Contract
- Claude Compact Boundary
- Container Build Script
- Container Entrypoint Script
- CLI Tools Install Script
- Platform ID Namespacing
- Add-Reaction MCP Tool
- Internal Thoughts Tags
- Communication Guideline
- Conversation History Folder
- claude-assist.ts
- Add Signal Channel
- emitStatus
- Add DeltaChat Channel
- Install
- Add WhatsApp Channel
- scheduling/db.ts
- Claude Agent SDK Deep Dive
- Troubleshooting
- Workflow
- Phase 2: Upgrade
- dependencies
- manifest.template.json
- NanoClaw
- discover-openclaw.ts
- transform.ts
- skill-driver.ts
- onecli.ts
- verify.ts
- resources/dashboard-pusher.ts
- devDependencies
- setup-config-parse.ts
- Initialize OneCLI Agent Vault
- update-nanoclaw/SKILL.md
- run-channel-skill.ts
- teams-manifest.ts
- The skill-engine seam: declare/emit vs. acquire/present
- compilerOptions
- Add Mnemon — Persistent Memory
- Use Native Credential Proxy
- 1. Tables
- StatusBarController
- Add WeChat Channel
- Contributing
- What's Done
- Add GitHub Channel
- Add Gmail Tool (OneCLI-native)
- NanoClaw Container Debugging
- nc: skill directives — authoring reference
- Skill guidelines
- scripts
- peer-cleanup.ts
- Add iMessage Channel
- Add Matrix Channel
- ncl.ts
- providers/registry.ts
- Add Google Calendar Tool (OneCLI-native)
- Add Linear Channel
- Add macOS Menu Bar Status Indicator
- Manage Channels
- Finish v1 → v2 migration
- Instructions
- CONTRIBUTING.md
- The skills model
- whatsapp-auth.ts
- README_ja.md
- README_ko.md
- README_zh.md
- probe.sh
- /add-clidash — CLI-derived read-only dashboard
- Add Discord Channel
- Add Ollama Provider
- Add rtk
- Add Telegram Channel
- Add Vercel
- Add Webex Channel
- Add WhatsApp Cloud API Channel
- NanoClaw — Per-Session DB Schema
- logs.ts
- Install
- Steps
- Add Google Chat Channel
- Add Resend Email Channel
- Add Slack Channel
- NanoClaw Customization
- 3. Move legacy files
- Contributor Covenant Code of Conduct
- NanoClaw v1 → v2 — what changed
- typing/index.ts
- Add Atomic Chat Integration
- Add Karpathy LLM Wiki
- v1 → v2 Migration — Development Guide
- NanoClaw Specification
- shared.ts
- clidash/package.json
- wa-qr-browser.ts
- Init First Agent
- Workflow
- update-skills/SKILL.md
- Running Agents on Local Ollama
- Setup flow
- package.json
- src/upgrade-state.ts
- whatsapp-send/index.ts
- Remove Google Calendar Tool
- Remove Gmail Tool
- LLM Wiki
- Vercel CLI
- wire-dm.ts
- Prerequisites
- Channel Adapter Interface
- NanoClaw Architecture (Draft)
- Agent-Runner Architecture
- Build & Runtime
- Agent Templates
- Repo Tokens
- run-migrations.ts
- discord-resolver.ts
- ChannelSetup
- format-tasks.ts
- Branch and fork maintenance
- Channel Isolation Model
- Scheduled Tasks
- Remove Atomic Chat
- Remove the Codex agent provider
- Remove DeltaChat
- Remove Ollama
- Remove Microsoft Teams
- Remove WhatsApp
- Migrating OpenClaw Cron Jobs to NanoClaw v2 Tasks
- Remove migrate-from-openclaw
- native-credential-proxy.test.ts
- NanoClaw Architecture Diagram
- `ncl tasks` migration
- Phase 2: Apply Code Changes
- Troubleshooting
- clidash
- ncl-overview.test.js
- resources/dashboard-wiring.test.ts
- Remove Mnemon
- ollama-mcp-stdio.ts
- Remove Telegram
- Remove Vercel
- Remove WeChat Channel
- Manage Mounts
- Git Provider Commands Reference
- Special cases
- Remove Native Credential Proxy
- Session DB Schema
- Flexibility Model
- NanoClaw Database Architecture — Overview
- Agent Memory
- Upgrading the OneCLI gateway
- Architecture: Channel System
- Recovering from the upgrade tripwire
- Releasing NanoClaw
- atomic-chat-mcp-stdio.ts
- Remove Discord
- Remove Google Chat
- Remove GitHub
- Remove iMessage
- Remove Karpathy LLM Wiki
- Remove Linear
- Remove Matrix
- Remove Resend Email Channel
- Remove rtk
- Remove Signal
- Remove Slack
- Remove Webex
- Remove WhatsApp Cloud API Channel
- Operational Behavior
- Switching an agent group between providers
- Scheduled Tasks
- migrate-v2-reset.sh
- test-v2-agent.ts
- Phase 2: Apply Code Changes
- Phase 2: Apply Code Changes
- Prerequisites by Provider
- Fetch Review Comments
- Reply to Inline Comments
- Post Summary Comment
- Resolve Qodo Review Comment
- Create PR/MR (Special Case)
- Find Open PR/MR
- Configuration
- Security Considerations
- cleanup-sessions.sh
- agent-ping.ts
- refresh
- mdToHtml
- Step 0: Check code push status
- Channel Adapters
- Media Handling
- Troubleshooting
- Message Flow
- Deployment
- PULL_REQUEST_TEMPLATE.md
- included
- imessage-configure.sh
- install-signal-cli.sh
- migrate-v2/groups.ts
- select-channels.ts
- provider-contract.test.ts
- stub-cli.js
- smoke.sh
- BlockingProvider
- ProviderExchange
- Central DB Schema
- Memory System
- chat.ts
- q.test.ts
- sanity-live-poll.ts
- channels-remote.sh
- migrate-v2/env.ts
- Templates
- ncl
- css.test.js
- migrate-nanoclaw/diagnostics.md
- setup/SKILL.md
- update-nanoclaw/diagnostics.md
- whatsapp.instructions.md
- CONTRIBUTORS.md
- q.ts
- install-claude.sh
- install-github.sh
- install-node.sh
- register-claude-token.sh
- run-suggested.sh
- uninstall.sh
- progressLogPath
- stepsDir

## God Nodes (most connected - your core abstractions)
1. `getDb()` - 150 edges
2. `log` - 73 edges
3. `err()` - 71 edges
4. `createAgentGroup()` - 59 edges
5. `runMigrations()` - 58 edges
6. `getAgentGroup()` - 50 edges
7. `main()` - 46 edges
8. `closeDb()` - 41 edges
9. `writeSessionMessage()` - 41 edges
10. `Changelog` - 40 edges

## Surprising Connections (you probably didn't know these)
- `queryClaudeUnderSpinner()` --indirect_call--> `icon()`  [INFERRED]
  setup/lib/claude-assist.ts → .claude/skills/add-clidash/add/tools/clidash/public/app.js
- `runUnderWindow()` --indirect_call--> `icon()`  [INFERRED]
  setup/lib/windowed-runner.ts → .claude/skills/add-clidash/add/tools/clidash/public/app.js
- `hookLogger()` --indirect_call--> `input()`  [INFERRED]
  container/agent-runner/scripts/sdk-signal-probe.ts → src/guard/guard.test.ts
- `migrate-v2.sh script` --calls--> `build.sh script`  [EXTRACTED]
  migrate-v2.sh → container/build.sh
- `migrate-v2.sh script` --calls--> `install-docker.sh script`  [EXTRACTED]
  migrate-v2.sh → setup/install-docker.sh

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Welcome-Tour Capability Set (agent tools revealed to new users)** — container_skills_welcome_skill_capabilities_tour, container_agent_runner_src_mcp_tools_agents_instructions_create_agent, container_agent_runner_src_mcp_tools_scheduling_instructions_ncl_tasks, container_skills_self_customize_skill_self_customize [INFERRED 0.80]
- **Sub-Agent Delegation Pattern (builder / frontend-engineer via create_agent)** — container_agent_runner_src_mcp_tools_agents_instructions_create_agent, container_skills_self_customize_skill_builder_agent_pattern, container_skills_vercel_cli_skill_delegate_to_frontend_engineer, container_skills_frontend_engineer_skill_frontend_engineer [INFERRED 0.85]
- **OneCLI-Managed Credential Injection Pattern** — container_skills_onecli_gateway_skill_onecli_gateway, container_agent_runner_src_mcp_tools_self_mod_instructions_add_mcp_server, container_skills_vercel_cli_skill_vercel_cli [INFERRED 0.85]
- **Self-mod tool call to admin-approved container rebuild/restart pipeline** — src_modules_self_mod_project_self_mod_module, src_modules_approvals_project_approvals_module, src_modules_self_mod_project_install_packages_handler, src_modules_self_mod_project_add_mcp_server_handler, src_modules_approvals_project_pending_approvals_table [INFERRED 0.85]
- **Registered ResponseHandler pattern for button-click approvals/questions** — src_modules_approvals_project_responsehandler, src_modules_interactive_project_responsehandler, src_modules_approvals_project_pending_approvals_table, src_modules_interactive_project_pending_questions_table [INFERRED 0.75]
- **Human-in-the-loop MCP tools exposed to the agent** — src_modules_interactive_agent_ask_user_question, src_modules_approvals_agent_install_packages, src_modules_approvals_agent_add_mcp_server, src_modules_approvals_agent_onecli_credential_approval [INFERRED 0.75]

## Communities (325 total, 44 thin omitted)

### Community 0 - "Task Formatting & Display"
Cohesion: 0.13
Nodes (36): appendTaskLog(), cancelTaskCommand(), createTask(), enrichListRow(), getTask(), groupArg(), listTasks(), mutateTask() (+28 more)

### Community 1 - "Startup Circuit Breaker"
Cohesion: 0.20
Nodes (10): BACKOFF_SCHEDULE_S, CB_PATH, CircuitBreakerState, enforceStartupBackoff(), getDelay(), read(), resetCircuitBreaker(), CB_PATH (+2 more)

### Community 2 - "Channel Wiring Defaults"
Cohesion: 0.06
Nodes (66): onInbound(), InboundEvent, normalizeOptions(), RawOption, resolveThreadPolicy(), getUnregisteredSenders(), recordDroppedMessage(), UnregisteredSender (+58 more)

### Community 3 - "Agent Group DB Access"
Cohesion: 0.06
Nodes (36): collectActivity(), listDirs(), localDay(), normTs(), readTable(), CONTAINER_SEGS, describeFile(), globFiles() (+28 more)

### Community 4 - "CLI Guard & Delivery Actions"
Cohesion: 0.16
Nodes (25): testUnguarded, DeliveryActionHandler, defined, defineGuardedAction(), GuardedAction, GuardedActionSpec, isGuardedAction(), listGuardedActions() (+17 more)

### Community 5 - "Session/Approval DB Layer"
Cohesion: 0.08
Nodes (52): deletePendingApproval(), markApprovalAwaitingReason(), getDeliveryAdapter(), onDeliveryAdapterReady(), now(), seedApproval(), finalizeReject(), ApprovalSummary (+44 more)

### Community 6 - "OneCLI Client & Formatting"
Cohesion: 0.15
Nodes (21): main(), parseArgv(), pickTransport(), printUsage(), formatHuman(), FormatMode, formatResponse(), isFlatRecord() (+13 more)

### Community 7 - "Session DB Connection Mgmt"
Cohesion: 0.08
Nodes (49): getConfig(), clearStaleProcessingAcks(), closeSessionDb(), getInboundDb(), getOutboundDb(), initTestSessionDb(), openInboundDb(), findQuestionResponse() (+41 more)

### Community 8 - "Container Restart & Wake"
Cohesion: 0.04
Nodes (97): LegacyContainerJson, composeGroupClaudeMd(), MCP_TOOLS_HOST_SUBPATH, syncSymlink(), writeAtomic(), ensureContainerConfigSpy, hookCalls, hostCtx (+89 more)

### Community 9 - "Central DB Migrations"
Cohesion: 0.08
Nodes (26): getMessagingGroupWithAgentCount(), mg(), now(), migration001, migration002, migration008, migration009, LegacyRow (+18 more)

### Community 10 - "Session DB Schema"
Cohesion: 0.10
Nodes (31): isContainerRunning(), countDueMessages(), deleteOrphanProcessingClaims(), getContainerState(), getMessageForRetry(), getProcessingClaims(), markMessageFailed(), retryWithBackoff() (+23 more)

### Community 11 - "Test Fixtures & Attachments"
Cohesion: 0.06
Nodes (55): copyTree(), main(), SKIP_NAMES, isSafeAttachmentName(), captured, CapturedEdit, readSessionDestinations(), createChatSession() (+47 more)

### Community 12 - "WhatsApp Adapter Internals"
Cohesion: 0.08
Nodes (35): ConversationInfo, appendMediaFailureNote(), AUTH_DIR, baileysLogger, buildMediaMessage(), collectMentionedJids(), computeIsMention(), connectSocket() (+27 more)

### Community 14 - "Ask-Question Normalization"
Cohesion: 0.33
Nodes (5): AskQuestionPayload, NormalizedOption, normalizeOption(), OptionInput, OptionStyle

### Community 15 - "Self-Mod Approval Flow"
Cohesion: 0.07
Nodes (38): add_mcp_server tool, install_packages tool, OneCLI credential approval (agent-facing), Self-modification tools (agent-facing doc), Agent-initiated approval flow, Approvals module, buildAgentGroupImage (core, used by approvals), getDeliveryAdapter (+30 more)

### Community 17 - "Router Command Formatting"
Cohesion: 0.15
Nodes (28): ADMIN_COMMANDS, categorizeMessage(), CommandCategory, CommandInfo, escapeXml(), extractSenderId(), FILTERED_COMMANDS, formatAttachments() (+20 more)

### Community 18 - "Dashboard Data Collection"
Cohesion: 0.06
Nodes (77): getActiveAdapters(), projectDestinationsToSessions(), count(), count(), HOST, collectActivity(), collectAgentGroups(), collectChannels() (+69 more)

### Community 19 - "Claude Provider Runtime"
Cohesion: 0.05
Nodes (43): clearContainerToolInFlight(), setContainerToolInFlight(), ThrowingHookProvider, MemorySessionHookRegistration, PollLoopConfig, archiveTranscriptFile(), classifyRateLimitEvent(), claudeConfigDir() (+35 more)

### Community 20 - "Chat SDK Bridge Actions"
Cohesion: 0.21
Nodes (11): createPairingInterceptor(), fetchBotUsername(), InboundFields, isGroupPlatformId(), sanitizeTelegramLegacyMarkdown(), readInboundFields(), sendPairingConfirmation(), setup() (+3 more)

### Community 22 - "Channel Registry & Setup"
Cohesion: 0.05
Nodes (51): backfillContainerConfigs(), ChannelAdapterFactory, ChannelContextDefaults, ChannelDefaults, ChannelRegistration, DeliveryAddress, OutboundFile, OutboundMessage (+43 more)

### Community 23 - "Agent-to-Agent MCP Tools"
Cohesion: 0.07
Nodes (20): createAgent, askUserQuestion, routing(), sendCard, sleep(), addMcpServer, installPackages, allTools (+12 more)

### Community 24 - "Outbound Delivery Polling"
Cohesion: 0.04
Nodes (120): ag, Args, cleanup, db, groupDir, sessionsDir, Args, generateId() (+112 more)

### Community 25 - "Provider Factory & Mocks"
Cohesion: 0.07
Nodes (39): CHAT_VERSION, ExecStub, Fixture, isSideEffectRun(), isString(), ROOT, runScenario(), SABOTEUR_EFFECTS (+31 more)

### Community 26 - "Admin Command Gate"
Cohesion: 0.05
Nodes (60): deliver(), getChannelAdapter(), ADMIN_COMMANDS, FILTERED_COMMANDS, gateCommand(), GateResult, isAdmin(), now() (+52 more)

### Community 27 - "Destination Routing & Inbox Safety"
Cohesion: 0.12
Nodes (16): ContainerState, DestinationRow, getDeliveredIds(), getDueOutboundMessages(), getInboundSourceSessionId(), markDelivered(), markDeliveryFailed(), migrateDeliveredTable() (+8 more)

### Community 28 - "Compact Instructions & Session Routing"
Cohesion: 0.12
Nodes (20): buildCompactInstructions(), formatDestinationNames(), loadConfig(), RunnerConfig, getTaskSeriesId(), buildDestinationsSection(), buildSystemPromptAddendum(), DestinationEntry (+12 more)

### Community 29 - "Container Poll Loop"
Cohesion: 0.12
Nodes (40): markProcessing(), markScriptSkipped(), writeMessageOut, clearContinuation(), clearCurrentInReplyTo(), continuationKey(), deleteValue(), getContinuation() (+32 more)

### Community 30 - "SDK Dependencies (package.json)"
Cohesion: 0.07
Nodes (26): @anthropic-ai/claude-agent-sdk, @anthropic-ai/sdk, dependencies, @anthropic-ai/claude-agent-sdk, @anthropic-ai/sdk, cron-parser, @modelcontextprotocol/sdk, zod (+18 more)

### Community 31 - "Telegram Pairing Flow"
Cohesion: 0.14
Nodes (30): intentToString(), parseArgs(), printAttempt(), printCodeCard(), run(), ConsumedDetails, ConsumeInput, createPairing() (+22 more)

### Community 32 - "Generic CRUD Dispatch"
Cohesion: 0.19
Nodes (14): CustomOperation, DISPATCH_INJECTED_KEYS, genericCreate(), genericDelete(), genericGet(), genericList(), genericUpdate(), normalizeArgs() (+6 more)

### Community 33 - "Container Runner & Mounts"
Cohesion: 0.11
Nodes (45): anthropicSecretExists(), appendProviderImport(), askAgentProviderChoice(), askChannelChoice(), askDisplayName(), askOtherChannelName(), ChannelChoice, channelDmLabel() (+37 more)

### Community 34 - "Approvals & Destinations CRUD"
Cohesion: 0.04
Nodes (46): NanoClaw Documentation, AI-Native Development, Architecture Decisions, Browser Automation, Built for the Individual User, Channels, Communication Channels, Container Isolation (+38 more)

### Community 35 - "Agent Collaboration Patterns"
Cohesion: 0.09
Nodes (24): Collaborator Agent Pattern, Companion Agent Pattern, create_agent MCP tool, ncl Write-Command Approval Flow, ncl Admin CLI, send_file MCP tool, ask_user_question MCP tool, send_card MCP tool (+16 more)

### Community 36 - "CLI Resource Dispatch"
Cohesion: 0.20
Nodes (15): getResource(), actorFor(), closestName(), commandHelp(), dispatch(), DispatchOptions, editDistance(), errMsg() (+7 more)

### Community 37 - "Legacy Container Config Backfill"
Cohesion: 0.27
Nodes (11): run(), parseTimezoneFlag(), resolveConfigTimezone(), configFromDb(), resolveGroupTimezone(), appendRunLog(), formatLocalStamp(), formatLocalTime() (+3 more)

### Community 38 - "Mount Security Allowlist"
Cohesion: 0.16
Nodes (15): AdditionalMount, AllowedRoot, DEFAULT_BLOCKED_PATTERNS, expandPath(), findAllowedRoot(), getRealPath(), isValidContainerPath(), loadMountAllowlist() (+7 more)

### Community 39 - "User-DM Cache & Delivery"
Cohesion: 0.09
Nodes (38): AgentTask, applyOne(), ApplyOptions, ApplyResult, applySkill(), bindCapture(), defaultResolveRemote(), destOf() (+30 more)

### Community 40 - "CLI Help System"
Cohesion: 0.15
Nodes (18): getCliScope(), registerResourceHelpCommands(), getResources(), approvalState, mockGetAgentGroup, mockGetContainerConfig, mockGetPendingApproval, mockGetResource (+10 more)

### Community 41 - "Container Env Config"
Cohesion: 0.11
Nodes (33): answered(), confirmGroup(), decideOnecli(), emptyGroupTitles(), groupBody(), GROUPS, printLeftAlone(), runCommand() (+25 more)

### Community 42 - "TypeScript Build Config"
Cohesion: 0.12
Nodes (16): compilerOptions, esModuleInterop, module, moduleResolution, rootDir, skipLibCheck, strict, target (+8 more)

### Community 43 - "Group Folder Validation"
Cohesion: 0.57
Nodes (5): assertValidGroupFolder(), ensureWithinBase(), isValidGroupFolder(), RESERVED_FOLDERS, resolveGroupFolderPath()

### Community 44 - "Memory File Read/Write"
Cohesion: 0.22
Nodes (8): readMemoryFile(), renderMemorySection(), source, MEMORY_CONTEXT_SOURCES, MEMORY_SESSION_HOOK, memoryContextForSessionStart(), MemorySessionHookSource, MemorySessionStartSource

### Community 45 - "CLAUDE.md Compose Tests"
Cohesion: 0.05
Nodes (40): [1.1.0] - 2026-02-23, [1.1.1] - 2026-02-24, [1.1.2] - 2026-02-24, [1.1.3] - 2026-02-25, [1.1.4] - 2026-03-01, [1.1.5] - 2026-03-01, [1.1.6] - 2026-03-01, [1.2.0] - 2026-03-02 (+32 more)

### Community 46 - "CRUD Test Harness"
Cohesion: 0.12
Nodes (31): DockerStatus, parseArgs(), run(), tryStartDocker(), detectRegisteredGroups(), run(), confirmThenOpen(), formatNoteLink() (+23 more)

### Community 47 - "Host Runtime Config"
Cohesion: 0.47
Nodes (3): materializeTemplateSkills(), templateSkillsSource(), DATA_DIR

### Community 48 - "Webhook Server"
Cohesion: 0.20
Nodes (10): ensureServer(), fromWebResponse(), rawRoutes, RawWebhookHandler, registerWebhookAdapter(), registerWebhookHandler(), routes, stopWebhookServer() (+2 more)

### Community 49 - "Agent-Runner Config & Entry"
Cohesion: 0.05
Nodes (38): 1. Copy the adapter and its registration test, 2. Register the adapter, 3. Install the adapter package, 4. Build and validate, Add Microsoft Teams Channel, Alternatives, App name, Apply (+30 more)

### Community 50 - "Core Type Definitions"
Cohesion: 0.09
Nodes (26): bold(), brand_bold(), clear_line(), dim(), gray(), NANOCLAW_BOOTSTRAPPED, red(), nanoclaw.sh script (+18 more)

### Community 51 - "Task Script Runner"
Cohesion: 0.36
Nodes (8): touchHeartbeat(), MessageInRow, applyPreTaskScripts(), log(), runScript(), ScriptResult, ScriptSkipReason, TaskScriptOutcome

### Community 52 - "CLI Help Rendering"
Cohesion: 0.24
Nodes (12): ColumnDef, flagLine(), flagName(), GENERIC_VERBS, genericFlags(), genericSummary(), GenericVerb, indent() (+4 more)

### Community 53 - "OneCLI Approval Bridge"
Cohesion: 0.15
Nodes (34): absTime(), activeCollection(), badgeChip(), buildCell(), cellFor(), closeDetail(), currentView(), dataSignature() (+26 more)

### Community 54 - "SDK Hook Signal Probe"
Cohesion: 0.18
Nodes (12): args, HOOK_EVENTS, hookLogger(), hooks, log(), prompt, prompts, pushes (+4 more)

### Community 55 - "Task/Template Parsing"
Cohesion: 0.27
Nodes (9): asRecord(), parseTaskFile(), parseTemplate(), readContextExtras(), readJson(), readSkills(), readTasks(), Template (+1 more)

### Community 56 - "Claude Provider Session Hooks"
Cohesion: 0.06
Nodes (34): 1. Remove the adapter, 2. Remove credentials, 3. Rebuild and restart, 4. Remove the Emacs config (optional), 5. Messaging group (left intact), Remove Emacs, 1. Fetch the channels branch, 2. Copy the adapter and Lisp client (+26 more)

### Community 57 - "Group Persona Staging"
Cohesion: 0.06
Nodes (35): add_reaction, Agent-Runner Core, Agent-Runner Properties, Agent-to-agent sends (no dedicated tool), AgentProvider Interface, ask_user_question, Claude Provider, Codex Provider (+27 more)

### Community 58 - "Container Restart Tests"
Cohesion: 0.22
Nodes (7): mockCountDueMessages, mockGetSession, mockGetSessionsByAgentGroup, mockIsContainerRunning, mockKillContainer, mockWakeContainer, mockWriteSessionMessage

### Community 59 - "Agent Memory System (OKF)"
Cohesion: 0.32
Nodes (8): Memory Index Template (memory/index.md), Agent Memory System Definition, Open Knowledge Format (OKF), Memory System Index (memory/system/index.md), instructions.prepend.md (standing role/persona file), Agent Memory Section, Agent Workspace (/workspace/agent/), Welcome / Channel Onboarding Skill

### Community 60 - "Chat SDK Message Splitting"
Cohesion: 0.14
Nodes (15): fireAction(), makeAdapter(), ChatSdkBridgeConfig, createChatSdkBridge(), GatewayAdapter, handleForwardedEvent(), ReplyContext, ReplyContextExtractor (+7 more)

### Community 61 - "Group Filesystem Init"
Cohesion: 0.80
Nodes (4): isRecord(), migrateClaudeMemorySettings(), removeLegacyNanoClawMemoryHook(), writeAtomic()

### Community 62 - "Dashboard Wiring Tests"
Cohesion: 0.29
Nodes (3): indexPath, sf, source

### Community 63 - "Task Session Templates"
Cohesion: 0.12
Nodes (15): ⚠️ STOP — READ THIS FIRST IF YOU ARE CLAUDE ⚠️, Architecture, Changelog, Community, Contributing, Customizing, FAQ, License (+7 more)

### Community 64 - "Create-Agent Delivery Action"
Cohesion: 0.19
Nodes (11): getDeliveryAction(), DeliveryGuardSpec, GuardedDeliveryHandler, runGuarded(), isUnguardedEntry(), reenterGuardedDeliveryAction(), registerDeliveryAction(), isUnguarded() (+3 more)

### Community 65 - "Channel Approval Tests"
Cohesion: 0.06
Nodes (33): Access control (sender policies), Anthropic and other container-facing credentials → OneCLI vault, Channel tokens (telegram, discord, slack), Config-registered plugins (with API keys), Confirm the assistant name, Container timeout, IDENTITY.md / SOUL.md, If a container rebuild is needed (+25 more)

### Community 66 - "Attachment Naming"
Cohesion: 0.53
Nodes (4): deriveAttachmentName(), extForMime(), MIME_TO_EXT, TYPE_TO_EXT

### Community 67 - "CLI Tools Manifest"
Cohesion: 0.40
Nodes (4): dockerfile, here, installer, manifest

### Community 69 - "WhatsApp Mention Syntax"
Cohesion: 0.67
Nodes (3): WhatsApp Mentions Instructions (condensed), WhatsApp Mention Syntax (@phone-digits), WhatsApp Text Styles (single-char delimiters)

### Community 74 - "Container Build Script"
Cohesion: 0.15
Nodes (23): build.sh script, abort(), bold(), clear_line(), dim(), disable_v1_service(), find_v1(), green() (+15 more)

### Community 77 - "Platform ID Namespacing"
Cohesion: 0.12
Nodes (27): confirmAssistantResponds(), Block, dumpTranscriptOnFailure(), Fields, outcomeStatus(), QuietChildResult, runQuietStep(), runUnderSpinner() (+19 more)

### Community 84 - "claude-assist.ts"
Cohesion: 0.11
Nodes (29): extractClaudeOAuthToken(), normalizeCapturedTerminalOutput(), runCli(), BIG_PICTURE_FILES, buildPrompt(), ensureClaudeReady(), formatToolUse(), handleStreamEvent() (+21 more)

### Community 85 - "Add Signal Channel"
Cohesion: 0.06
Nodes (31): 1. Install signal-cli, 2. Copy the adapter and its registration test, 3. Register the adapter, 4. Install the QR-rendering dependency, 5. Build and validate, Add Signal Channel, Alternatives, Apply (+23 more)

### Community 86 - "emitStatus"
Cohesion: 0.12
Nodes (25): Args, childEnv(), createAnthropicSecret(), findAnthropicSecret(), listSecrets(), LOCAL_BIN, OnecliSecret, parseArgs() (+17 more)

### Community 87 - "Add DeltaChat Channel"
Cohesion: 0.06
Nodes (30): 1. Fetch the channels branch, 2. Copy the adapter and its registration test, 3. Append the self-registration import, 4. Install the adapter package (pinned), 5. Build and validate, Account configure fails, Account Setup, Adapter not starting — credentials missing (+22 more)

### Community 88 - "Install"
Cohesion: 0.06
Nodes (29): 1. Delete the barrel import lines (both trees), 2. Delete the copied files (both trees), 3. Remove the agent-runner dependency, 4. Revert the Dockerfile CLI install, 5. Clean up per-group overlays, 6. Unset OpenCode env vars, 7. Rebuild and restart, Remove OpenCode provider (+21 more)

### Community 89 - "Add WhatsApp Channel"
Cohesion: 0.06
Nodes (30): 1. Copy the adapter and its registration test, 2. Register the adapter, 3. Install the adapter packages, 4. Build and validate, Add WhatsApp Channel, Alternatives, Apply, Assistant name (+22 more)

### Community 90 - "scheduling/db.ts"
Cohesion: 0.14
Nodes (26): ensureSchema(), nextEvenSeq(), openInboundDb(), cancelTask(), clearRecurrence(), deleteTask(), getCompletedRecurring(), insertRecurrence() (+18 more)

### Community 91 - "Claude Agent SDK Deep Dive"
Cohesion: 0.07
Nodes (26): AgentDefinition, Architecture, BaseHookInput (shared) & subagent hooks, CanUseTool / PermissionResult, Claude Agent SDK Deep Dive, Hook configuration & return, Hook Events, Key Files (in the published tarball) (+18 more)

### Community 92 - "Troubleshooting"
Cohesion: 0.07
Nodes (27): Add env-var stubs to `.env.example`, Add Ollama Integration, Agent doesn't use Ollama tools, Agent says "Ollama is not installed" or tries to run a CLI, Check if already applied, Check logs if needed, Check prerequisites, Copy the skill's source and tests into both trees (+19 more)

### Community 93 - "Workflow"
Cohesion: 0.07
Nodes (24): Formatting and Outputting Rules, Grouping by Severity, Output Structure, After Fetching, Algorithm, API URL, Fetching Rules with Pagination, Extracting Repository Scope from Git Remote URL (+16 more)

### Community 94 - "Phase 2: Upgrade"
Cohesion: 0.07
Nodes (27): 1.0 Preflight, 1.1 Assess scope and determine path, 1.2 Update existing guide (if applicable), 1.3 Explore the codebase, 1.4 Analyze customizations, 1.5 Confirm with user, 1.6 Migration plan (Tier 3 only), 1.7 Write the migration guide (+19 more)

### Community 95 - "dependencies"
Cohesion: 0.07
Nodes (27): better-sqlite3, chat, @chat-adapter/telegram, @clack/core, @clack/prompts, kleur, @nanoco/nanoclaw-dashboard, @onecli-sh/sdk (+19 more)

### Community 96 - "manifest.template.json"
Cohesion: 0.07
Nodes (26): identity, messageTeamMembers, nanoclaw.invalid, accentColor, bots, description, full, short (+18 more)

### Community 97 - "NanoClaw"
Cohesion: 0.08
Nodes (26): Admin CLI (`ncl`), Central DB, Channels and Providers (skill-installed), CJK font support, Container Build Cache, Container Config, Container Restart, Container Runtime (Bun) (+18 more)

### Community 98 - "discover-openclaw.ts"
Cohesion: 0.13
Nodes (25): ALL_KNOWN_CHANNELS, ChannelInfo, ConfigPlugin, countCronJobs(), countDailyMemoryFiles(), CREDENTIAL_FIELDS, detectAgents(), detectChannels() (+17 more)

### Community 99 - "transform.ts"
Cohesion: 0.14
Nodes (22): CHANNEL_FIELDS, emitStatus(), main(), parseArgs(), parseDotenv(), parseJson5(), writeEnvVar(), approximateIntervalAsCron() (+14 more)

### Community 100 - "skill-driver.ts"
Cohesion: 0.14
Nodes (20): ApplyEvent, InputMeta, StepOutcome, RunOutcome, channelsRemote(), clackResolveInput(), defaultOnEvent(), GATE_WORDING (+12 more)

### Community 101 - "onecli.ts"
Cohesion: 0.14
Nodes (21): readVersionPin(), here, VERSIONS_FILE, childEnv(), ensureShellProfilePath(), extractUrlFromOutput(), gatewayV1Hint(), getOnecliApiHost() (+13 more)

### Community 102 - "verify.ts"
Cohesion: 0.17
Nodes (18): generatePlist(), detectExistingInstall(), ScanDeps, scanService(), deps(), dockerUp(), fakeRun(), DEFER_WIRE_CHANNELS (+10 more)

### Community 103 - "resources/dashboard-pusher.ts"
Cohesion: 0.16
Nodes (20): collectActivity(), collectAgentGroups(), collectChannels(), collectContextWindows(), collectMessages(), collectSessions(), collectSnapshot(), collectTokens() (+12 more)

### Community 104 - "devDependencies"
Cohesion: 0.08
Nodes (25): eslint, @eslint/js, eslint-plugin-no-catch-all, globals, husky, devDependencies, eslint, @eslint/js (+17 more)

### Community 105 - "setup-config-parse.ts"
Cohesion: 0.16
Nodes (21): BaseEntry, BoolEntry, CONFIG, Entry, EntrySurface, EnumEntry, envVarFor(), findByFlag() (+13 more)

### Community 106 - "Initialize OneCLI Agent Vault"
Cohesion: 0.08
Nodes (23): After either path, API key path, Check for native credential proxy, Check if OneCLI is already working, Check the codebase expects OneCLI, Configure the CLI, git over HTTPS, Granting secrets to agents (safe merge) (+15 more)

### Community 107 - "update-nanoclaw/SKILL.md"
Cohesion: 0.08
Nodes (23): About, Diagnostics, Goal, How it works, Known behavior changes when channel adapters update, Operating principles, Rollback, Step 0: Preflight (stop early if unsafe) (+15 more)

### Community 108 - "run-channel-skill.ts"
Cohesion: 0.15
Nodes (17): firstFailureHint(), fullyApplied(), ChannelSkillOverrides, initFirstAgent(), resolveAgentName(), runChannelSkill(), bs, WireArgs (+9 more)

### Community 109 - "teams-manifest.ts"
Cohesion: 0.11
Nodes (17): appId, result, rsc, url, ASSETS_DIR, buildTeamsAppPackage(), ManifestOptions, ManifestResult (+9 more)

### Community 110 - "The skill-engine seam: declare/emit vs. acquire/present"
Cohesion: 0.09
Nodes (22): 10. Open questions (decisions this spec made that the design left open), 11. Rejected review findings, 1. The boundary rule, 2. The new core interface, 3. Migration table, 4. Behavior change: validate + normalize apply to EVERY bound value, 5.0 Where the policy lives, and the driver's own seams, 5.1 Natural-barrier gate policy (+14 more)

### Community 111 - "compilerOptions"
Cohesion: 0.09
Nodes (21): ES2022, compilerOptions, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames, lib, module (+13 more)

### Community 112 - "Add Mnemon — Persistent Memory"
Cohesion: 0.10
Nodes (20): 1. Dockerfile — install mnemon binary, 2. Entrypoint — run mnemon setup on each container start, 3. Copy the integration tests, 4. Rebuild and smoke-test the image, Add Mnemon — Persistent Memory, Agent not using past memory, Check if already applied, Check latest mnemon version (+12 more)

### Community 113 - "Use Native Credential Proxy"
Cohesion: 0.10
Nodes (20): Add the env flag stub to `.env.example`, API key path, Check if already applied, Confirm the seam exists, Copy the skill's source and tests into `src/`, How it works, Import the proxy in `src/container-runner.ts`, Make the one-line reach-in (+12 more)

### Community 114 - "1. Tables"
Cohesion: 0.10
Nodes (21): 1.10 `agent_destinations`, 1.11 `pending_approvals`, 1.12 `unregistered_senders`, 1.13 Chat SDK bridge tables, 1.14 `schema_version`, 1.15 `container_configs`, 1.16 `pending_sender_approvals`, 1.17 `pending_channel_approvals` (+13 more)

### Community 115 - "StatusBarController"
Cohesion: 0.17
Nodes (9): AppKit, Bool, StatusBarController, Double, Int32, NSObject, NSStatusItem, String (+1 more)

### Community 116 - "Add WeChat Channel"
Cohesion: 0.10
Nodes (19): 1. Enable the channel, 1. Fetch the channels branch, 1. Trigger the first inbound message, 2. Copy the adapter and its registration test, 2. Run the wire script, 2. Start the service and scan the QR, 3. Append the self-registration import, 3. Test (+11 more)

### Community 117 - "Contributing"
Cohesion: 0.11
Nodes (18): 1. Channel and provider skills (registry branches), 2. Utility skills (with code files), 3. Operational skills (instruction-only), 4. Container skills (agent runtime), Before opening, Before You Start, Breaking Changes, Contributing (+10 more)

### Community 118 - "What's Done"
Cohesion: 0.11
Nodes (18): 1. ~~Channel Skills Don't Register Groups~~ ✅, 2. ~~Setup SKILL.md Missing Group Registration Step~~ ✅, 3. ~~Channel Skills Should Know Channel Type~~ ✅, 4. ~~Verify Step Channel Auth Check~~ ✅, 5. Agent-Shared Session Mode ✅, Architecture Reference, Channel Barrel, Channel Defaults (two-level model) (+10 more)

### Community 119 - "Add GitHub Channel"
Cohesion: 0.12
Nodes (16): 1. Copy the adapter, 1. Create a Personal Access Token for the bot account, 2. Register the adapter, 2. Set up a webhook on each repo, 3. Configure environment, 3. Install the adapter package, 4. Build and validate, Add GitHub Channel (+8 more)

### Community 120 - "Add Gmail Tool (OneCLI-native)"
Cohesion: 0.12
Nodes (17): Add Gmail Tool (OneCLI-native), Add the `.gmail-mcp` mount, Check agent secret-mode, Check logs if the tool isn't working, Credits & references, List groups, pick which ones get Gmail, Notes, Phase 1: Pre-flight (+9 more)

### Community 121 - "NanoClaw Container Debugging"
Cohesion: 0.12
Nodes (17): 1. "No adapter for channel type" / Messages silently lost (null platform_message_id), 2. Container exits immediately / agent produces no reply, 3. Mount Issues, 4. Heartbeat / stale-session detection, Architecture Overview, Clearing a Session, Common Issues, Container CLI (`ncl`) inside a session (+9 more)

### Community 122 - "nc: skill directives — authoring reference"
Cohesion: 0.12
Nodes (17): `append to:<file> [at:<marker>]`, `copy [from-branch:<b>]`, `dep [manager:pnpm]`, `env-set`, Fence syntax, `json-merge into:<file> key:<field>`, Lint, nc: skill directives — authoring reference (+9 more)

### Community 123 - "Skill guidelines"
Cohesion: 0.12
Nodes (17): 1. Minimal integration surface, 2. A test for every functional integration point, Anti-patterns, Change shapes, Choosing the test type, Dependencies are integration points, Integration points, Principles (+9 more)

### Community 124 - "scripts"
Cohesion: 0.12
Nodes (17): scripts, build, chat, dev, format, format:check, format:fix, lint (+9 more)

### Community 125 - "peer-cleanup.ts"
Cohesion: 0.19
Nodes (13): cleanupLaunchdPeers(), cleanupSystemdPeers(), cleanupUnhealthyPeers(), deadLaunchdTarget(), deadSystemdTarget(), PeerCleanupResult, PeerStatus, probeLaunchdPeer() (+5 more)

### Community 126 - "Add iMessage Channel"
Cohesion: 0.12
Nodes (15): 1. Copy the adapter, 2. Register the adapter, 3. Install the adapter package, 4. Build and validate, Add iMessage Channel, Apply, Channel Info, Configure environment (+7 more)

### Community 127 - "Add Matrix Channel"
Cohesion: 0.12
Nodes (15): 1. Copy the adapter, 2. Register the adapter, 3. Install the adapter package, 4. Patch matrix-js-sdk ESM imports, 5. Build, Add Matrix Channel, Apply, Channel Info (+7 more)

### Community 128 - "ncl.ts"
Cohesion: 0.15
Nodes (12): argv, { command, args, json }, formatHuman(), localizeIsoTimestamps(), localTime(), parseArgv(), printUsage(), req (+4 more)

### Community 129 - "providers/registry.ts"
Cohesion: 0.22
Nodes (10): AssistContext, INSTALL_SKILLS, run(), applyProviderSkill(), isFlowOwnedCommand(), FailureAssistResult, getSetupProvider(), listSetupProviders() (+2 more)

### Community 130 - "Add Google Calendar Tool (OneCLI-native)"
Cohesion: 0.13
Nodes (15): Add Google Calendar Tool (OneCLI-native), Add the `.calendar-mcp` mount, Check agent secret-mode, Check logs if the tool isn't working, Credits & references, Phase 1: Pre-flight, Phase 3: Wire Per-Agent-Group, Phase 4: Build and Restart (+7 more)

### Community 131 - "Add Linear Channel"
Cohesion: 0.13
Nodes (14): 1. Copy the adapter and its registration test, 1. Set up a webhook, 2. Register the adapter, 2. Store the credentials, 3. Install the adapter package, 4. Build and validate, Add Linear Channel, Apply (+6 more)

### Community 132 - "Add macOS Menu Bar Status Indicator"
Cohesion: 0.13
Nodes (13): 1. Unload the launchd service, 2. Delete the produced files, Remove macOS Menu Bar Status Indicator, Add macOS Menu Bar Status Indicator, Check for swiftc, Check if already installed, Check platform, Compile the Swift binary (+5 more)

### Community 133 - "Manage Channels"
Cohesion: 0.13
Nodes (14): Add Channel Group, Assess Current State, Change Wiring, Channel Defaults: The Two-Level Model, First Channel (No Agent Groups Exist), Isolation Question, Manage Channels, Mention capability (+6 more)

### Community 134 - "Finish v1 → v2 migration"
Cohesion: 0.13
Nodes (14): 0a — Fix blockers only, 0b — Smoke test, then continue, Access policy, Deferred failures, Finish v1 → v2 migration, Phase 0: Get v2 routing real messages, Phase 1: Owner and access, Phase 2: Migrate legacy memory (+6 more)

### Community 135 - "Instructions"
Cohesion: 0.13
Nodes (15): Important notes, Instructions, Output format, Severity mapping, Step 1: Detect git provider, Step 2: Find the open PR/MR, Step 3: Get Qodo review comments, Step 3a: Check if review is still in progress (+7 more)

### Community 136 - "CONTRIBUTING.md"
Cohesion: 0.20
Nodes (7): Customizing NanoClaw, Go deeper, How you actually work, The deal, The idea in a minute, Upgrading, What makes it work

### Community 137 - "The skills model"
Cohesion: 0.13
Nodes (15): A fork is a recipe of skills, A test for every integration point, How you actually work, Migrations, The bet, The maintainer's side of the deal, The problem, The promise (+7 more)

### Community 138 - "whatsapp-auth.ts"
Cohesion: 0.16
Nodes (13): qrcode, qrcode, AUTH_DIR, AuthMethod, baileysLogger, PAIRING_CODE_FILE, parseArgs(), phoneFromId() (+5 more)

### Community 139 - "README_ja.md"
Cohesion: 0.13
Nodes (14): FAQ, NanoClawを作った理由, RFS（スキル募集）, アーキテクチャ, カスタマイズ, クイックスタート, コミュニティ, コントリビューション (+6 more)

### Community 140 - "README_ko.md"
Cohesion: 0.13
Nodes (14): FAQ, NanoClaw를 만든 이유, RFS (Request for Skills), 기여하기, 라이선스, 변경 이력, 빠른 시작, 사용법 (+6 more)

### Community 141 - "README_zh.md"
Cohesion: 0.13
Nodes (14): FAQ, RFS（技能征集）, 使用方法, 功能支持, 定制, 快速开始, 我为什么创建 NanoClaw, 更新日志 (+6 more)

### Community 142 - "probe.sh"
Cohesion: 0.24
Nodes (12): command_exists(), PATH, probe_anthropic_secret(), probe_display_name(), probe_docker(), probe_onecli_status(), probe_onecli_url(), probe_service_status() (+4 more)

### Community 143 - "/add-clidash — CLI-derived read-only dashboard"
Cohesion: 0.14
Nodes (12): Remove /add-clidash, 1. Copy the tool into place, 2. Create the config, 3. Test, 4. Run and verify, 5. (Optional) Run as a service, /add-clidash — CLI-derived read-only dashboard, Configuration reference (+4 more)

### Community 144 - "Add Discord Channel"
Cohesion: 0.14
Nodes (13): 1. Copy the adapter and its registration test, 2. Register the adapter, 3. Install the adapter package, 4. Build and validate, Add Discord Channel, Apply, Channel Info, Credentials (+5 more)

### Community 145 - "Add Ollama Provider"
Cohesion: 0.14
Nodes (13): 1. Check source support, 1a. Extend ContainerConfig, 1b. Wire into container-runner, 1c. Fix home directory permissions (if not already done), 2. Identify the setup, 3. Configure container.json, 4. Set the model, 5. Build and restart (+5 more)

### Community 146 - "Add rtk"
Cohesion: 0.14
Nodes (13): Add rtk, Binary won't execute — permission denied, Hook not firing, Integration tests, `rtk: command not found` inside the container, Step 1 — Install rtk on the host, Step 2 — Identify the target agent group, Step 3 — Mount rtk into the container config (+5 more)

### Community 147 - "Add Telegram Channel"
Cohesion: 0.14
Nodes (13): 1. Copy the adapter, helpers, and tests, 2. Register the adapter, 3. Register the pairing setup step, 4. Install the adapter package, 5. Build and validate, Add Telegram Channel, Apply, Channel Info (+5 more)

### Community 148 - "Add Vercel"
Cohesion: 0.14
Nodes (14): Add Vercel, Assign the secret to all agents, Check if already applied, Check if Vercel credential already exists, Check prerequisites, Done, Phase 1: Pre-flight, Phase 2: Install Container Skill (+6 more)

### Community 149 - "Add Webex Channel"
Cohesion: 0.14
Nodes (13): 1. Copy the adapter and its registration test, 2. Register the adapter, 3. Install the adapter package, 4. Build and validate, Add Webex Channel, Apply, Channel Info, Create the Webex bot (+5 more)

### Community 150 - "Add WhatsApp Cloud API Channel"
Cohesion: 0.14
Nodes (13): 1. Copy the adapter, 2. Register the adapter, 3. Install the adapter package, 4. Build and validate, Add WhatsApp Cloud API Channel, Apply, Channel Info, Credentials (+5 more)

### Community 151 - "NanoClaw — Per-Session DB Schema"
Cohesion: 0.14
Nodes (14): 1. Session folder layout, 2.1 `messages_in`, 2.2 `delivered`, 2.3 `destinations`, 2.4 `session_routing`, 2. Inbound DB (`inbound.db`), 3. Sequence numbering invariant, 4.1 `messages_out` (+6 more)

### Community 152 - "logs.ts"
Cohesion: 0.18
Nodes (9): complete(), completedInRun, formatDuration(), formatDurationTotal(), header(), PROGRESS_LOG, reset(), step() (+1 more)

### Community 153 - "Install"
Cohesion: 0.15
Nodes (12): 1. Fetch and copy the payload, 2. Wire the barrels, 3. CLI manifest, 4. Build, 5. Validate, Authenticate, Codex agent provider, Default new groups to codex (optional) (+4 more)

### Community 154 - "Steps"
Cohesion: 0.15
Nodes (12): 1. Install the npm package, 2. Copy the pusher module and its tests, 3. Wire into src/index.ts, 4. Add environment variables to .env, 5. Build, test, and restart, 6. Verify (runtime smoke check), /add-dashboard — NanoClaw Dashboard, Architecture (+4 more)

### Community 155 - "Add Google Chat Channel"
Cohesion: 0.15
Nodes (12): 1. Copy the adapter and its registration test, 2. Register the adapter, 3. Install the adapter package, 4. Build and validate, Add Google Chat Channel, Apply, Channel Info, Credentials (+4 more)

### Community 156 - "Add Resend Email Channel"
Cohesion: 0.15
Nodes (12): 1. Copy the adapter, 2. Register the adapter, 3. Install the adapter package, 4. Build and validate, Add Resend Email Channel, Apply, Channel Info, Connect yourself (+4 more)

### Community 157 - "Add Slack Channel"
Cohesion: 0.15
Nodes (12): 1. Copy the adapter, registration test, and formatting skill, 2. Register the adapter, 3. Install the adapter package, 4. Build and validate, Add Slack Channel, Apply, Channel Info, Credentials (+4 more)

### Community 158 - "NanoClaw Customization"
Cohesion: 0.15
Nodes (12): Adding a New Input Channel (e.g., Telegram, Slack, Email), Adding a New MCP Integration, Adding New Commands, After Changes, Changing Assistant Behavior, Changing Deployment, Common Customization Patterns, Entity Model (+4 more)

### Community 159 - "3. Move legacy files"
Cohesion: 0.15
Nodes (12): 1. Inventory and maintenance window, 2. Prepare the shared tree, 3. Move legacy files, 4. Organize with the invoking harness, 5. Verify and rollback, `CLAUDE.local.md`, Claude native auto-memory, Explain quarantined links plainly (+4 more)

### Community 160 - "Contributor Covenant Code of Conduct"
Cohesion: 0.15
Nodes (12): 1. Correction, 2. Warning, 3. Temporary Ban, 4. Permanent Ban, Attribution, Contributor Covenant Code of Conduct, Enforcement, Enforcement Guidelines (+4 more)

### Community 161 - "NanoClaw v1 → v2 — what changed"
Cohesion: 0.15
Nodes (13): Central DB vs session DBs, Channel adapters, Credentials, Entity model — the biggest shift, Group folders on disk, Host process vs containers, Migration surface — where the code lives, NanoClaw v1 → v2 — what changed (+5 more)

### Community 162 - "typing/index.ts"
Cohesion: 0.23
Nodes (10): isHeartbeatFresh(), pauseTypingRefreshAfterDelivery(), setTypingAdapter(), startTypingRefresh(), Call, captureAdapter(), triggerTyping(), TypingAdapter (+2 more)

### Community 163 - "Add Atomic Chat Integration"
Cohesion: 0.17
Nodes (11): Add Atomic Chat Integration, Check if already applied, Check logs if needed, Check prerequisites, Phase 1: Pre-flight, Phase 3: Configure, Phase 4: Verify, Restart the service (+3 more)

### Community 164 - "Add Karpathy LLM Wiki"
Cohesion: 0.17
Nodes (11): 3a. Directory structure, 3b. Container skill, 3c. Group CLAUDE.md, Add Karpathy LLM Wiki, Step 1: Read the pattern, Step 2: Choose a group, Step 3: Design collaboratively, Step 4: Source handling capabilities (+3 more)

### Community 165 - "v1 → v2 Migration — Development Guide"
Cohesion: 0.17
Nodes (12): Architecture, Check handoff, Check what was migrated, Common issues, Debugging, Development loop, File layout, Key decisions (+4 more)

### Community 166 - "NanoClaw Specification"
Cohesion: 0.17
Nodes (12): Architecture, Commands, Commands Available in Any Group, Commands Available in Main Channel Only, Folder Structure, How Sessions Work, MCP Servers, NanoClaw MCP (built-in) (+4 more)

### Community 167 - "shared.ts"
Cohesion: 0.26
Nodes (10): appendEnvKey(), copyGlob(), main(), parseEnv(), CHANNEL_AUTH_REGISTRY, ChannelAuthSpec, isWhatsappJid(), JID_PREFIX_TO_CHANNEL (+2 more)

### Community 168 - "clidash/package.json"
Cohesion: 0.18
Nodes (10): description, engines, node, name, private, scripts, start, test (+2 more)

### Community 169 - "wa-qr-browser.ts"
Cohesion: 0.18
Nodes (7): args, child, clean, portIdx, server, State, Status

### Community 170 - "Init First Agent"
Cohesion: 0.18
Nodes (10): 1. Pick the channel, 2. Ask for the operator's identity, 3. Resolve the DM platform id, 3a. User DMs the bot once (Discord / Slack / Teams / Webex / gChat), 3b. Telegram pair-code path (if the user prefers not to DM first), 4. Run the init script, 5. Verify, Init First Agent (+2 more)

### Community 171 - "Workflow"
Cohesion: 0.18
Nodes (10): 1. Identify the source — and whether this is a new skill or a refine, 2. Gather the material, 3. Distill — find the reusable procedure, 4. Author the SKILL.md, 5. Place and verify, Example, Learn — Distill a Skill from Anything, Notes (+2 more)

### Community 172 - "update-skills/SKILL.md"
Cohesion: 0.18
Nodes (10): About, Goal, How it works, Operating principles, Step 0: Preflight, Step 1: Detect installed skills, Step 2: Present results, Step 3: Re-apply each selected skill (+2 more)

### Community 173 - "Running Agents on Local Ollama"
Cohesion: 0.18
Nodes (10): Allowing Prompt Caching (filter the cache-busting hash), How It Works, Model Selection, Network Isolation, Reverting to Claude, Running Agents on Local Ollama, See Also, The OneCLI Complication (+2 more)

### Community 174 - "Setup flow"
Cohesion: 0.18
Nodes (11): Channel installs are skill-driven, Common pitfalls, Contract for a new step, File reference, Future work (not yet implemented), Level 1: user-facing (clack), Level 2: progression log, Level 3: raw per-step logs (+3 more)

### Community 175 - "package.json"
Cohesion: 0.18
Nodes (10): bin, ncl, description, engines, node, main, name, packageManager (+2 more)

### Community 176 - "src/upgrade-state.ts"
Cohesion: 0.47
Nodes (8): enforceUpgradeTripwire(), getCodeVersion(), isUpgradeCurrent(), MARKER_PATH, markerPath(), readUpgradeState(), UpgradeState, writeUpgradeState()

### Community 177 - "whatsapp-send/index.ts"
Cohesion: 0.27
Nodes (9): getChannelAdapterExact(), insertMessage(), ALLOWED_CONTACTS, ALLOWED_GROUPS, env, parseAllowlist(), resolveAllowedWhatsappJid(), toDigits() (+1 more)

### Community 178 - "Remove Google Calendar Tool"
Cohesion: 0.20
Nodes (8): 1. Unregister the MCP server (per group), 2. Remove the `.calendar-mcp` mount from the DB (per group), 3. Delete the copied test file, 4. Revert the Dockerfile edits, 5. Rebuild and restart, 6. Optional: remove stubs and disconnect OneCLI, Remove Google Calendar Tool, Verification

### Community 179 - "Remove Gmail Tool"
Cohesion: 0.20
Nodes (7): 1. Delete the copied tests, 2. Unregister the MCP server (per group), 3. Remove the `.gmail-mcp` mount (per group), 4. Remove the Dockerfile install, 5. Rebuild and restart, 6. (Optional) Drop the host stubs and disconnect, Remove Gmail Tool

### Community 180 - "LLM Wiki"
Cohesion: 0.20
Nodes (9): Architecture, Indexing and Logging, LLM Wiki, Note, Operations, Optional: CLI Tools, The Core Idea, Tips and Tricks (+1 more)

### Community 181 - "Vercel CLI"
Cohesion: 0.20
Nodes (9): Auth, Best Practices, Common Errors, Deploying, Domains, Environment Variables, Pre-Send Checks (do this before sharing the URL), Project Management (+1 more)

### Community 182 - "wire-dm.ts"
Cohesion: 0.27
Nodes (9): AgRow, Args, main(), MgRow, ncl(), parseArgs(), PROJECT_ROOT, prompt() (+1 more)

### Community 183 - "Prerequisites"
Cohesion: 0.20
Nodes (8): Bot Identifiers, Prerequisites, Qodo PR Resolver, Quick Check:, Required Context:, Required Tools:, Review Comment Types, Understanding Qodo Reviews

### Community 184 - "Channel Adapter Interface"
Cohesion: 0.20
Nodes (10): Channel Adapter Interface, Channel Defaults, Chat SDK Bridge, Host Delivery Logic, messages_in content examples, messages_out content examples, NanoClaw API Details, NanoClaw Channel Interface (+2 more)

### Community 185 - "NanoClaw Architecture (Draft)"
Cohesion: 0.20
Nodes (10): Agent Groups vs Sessions, Container Lifecycle, Core Idea, Core Properties, Design Decisions, Message Flow, NanoClaw Architecture (Draft), Open Questions (+2 more)

### Community 186 - "Agent-Runner Architecture"
Cohesion: 0.20
Nodes (10): Agent-Runner Architecture, Agent-Runner Properties, Agent-to-Agent Messaging, Cards, Commands, IO Model, MCP Tools, Message Formatting by Kind (+2 more)

### Community 187 - "Build & Runtime"
Cohesion: 0.20
Nodes (9): Build & Runtime, CI shape, Image build surface, Key invariants, Lockfiles, Migration history, Session wake (two paths), Supply chain (+1 more)

### Community 188 - "Agent Templates"
Cohesion: 0.20
Nodes (10): Agent Templates, Approval-gating sensitive actions, Contributing a template, MCP servers and credentials, MCP servers that require an env var to boot, Recurring tasks, Referencing extra context files, The template ref (+2 more)

### Community 189 - "Repo Tokens"
Cohesion: 0.20
Nodes (9): Examples, Full workflow example, How it works, Inputs, Outputs, README setup, Repo Tokens, Usage (+1 more)

### Community 190 - "run-migrations.ts"
Cohesion: 0.20
Nodes (7): entries, MigrationResult, migrationsDir, migrationVersions, projectRoot, results, tsxBin

### Community 191 - "discord-resolver.ts"
Cohesion: 0.24
Nodes (7): buildDiscordResolver(), Channel, ChannelInfo, emptyResolver(), FetchFn, Guild, mockFetch()

### Community 193 - "format-tasks.ts"
Cohesion: 0.42
Nodes (9): age(), clip(), COLS, duration(), formatTasksTable(), lastRun(), nextRun(), parseMs() (+1 more)

### Community 194 - "Branch and fork maintenance"
Cohesion: 0.22
Nodes (9): Adding a new channel or provider, Branch and fork maintenance, Conflict resolution, Dependencies, Forward merge procedure, How users add capabilities, Merge directions, Structure (+1 more)

### Community 195 - "Channel Isolation Model"
Cohesion: 0.22
Nodes (9): 1. Shared Session, 2. Same Agent, Separate Sessions, 3. Separate Agent Groups, Channel Isolation Model, Entity Model, How to Decide, Rules of Thumb, The Three Levels (+1 more)

### Community 196 - "Scheduled Tasks"
Cohesion: 0.22
Nodes (9): Create a one-time task, Create a recurring task, Delivery and run logs, Frequency limit, Manage and test tasks, Scheduled Tasks, Script failures, Script gates (+1 more)

### Community 197 - "Remove Atomic Chat"
Cohesion: 0.25
Nodes (7): 1. Delete the copied files (both trees), 2. Unregister the MCP server, 3. Revert the host-side edits in `src/container-runner.ts`, 4. Remove env vars, 5. Rebuild and restart, Remove Atomic Chat, Verification

### Community 198 - "Remove the Codex agent provider"
Cohesion: 0.25
Nodes (7): 1. Switch codex groups back to the default, 2. Delete the barrel imports, 3. Delete every copied file, 4. Remove the CLI manifest entry, 5. Vault secret (optional), 6. Rebuild and verify, Remove the Codex agent provider

### Community 199 - "Remove DeltaChat"
Cohesion: 0.25
Nodes (7): 1. Remove the adapter, 2. Remove credentials, 3. Rebuild and restart, 4. Remove account data (optional), 5. Remove the package (optional), Remove DeltaChat, Verification

### Community 200 - "Remove Ollama"
Cohesion: 0.25
Nodes (7): 1. Delete the copied files (both trees), 2. Unregister the MCP server, 3. Revert the host-side edits in `src/container-runner.ts`, 4. Remove env vars, 5. Rebuild and restart, Remove Ollama, Verification

### Community 201 - "Remove Microsoft Teams"
Cohesion: 0.25
Nodes (7): 1. Remove the adapter, 2. Remove credentials, 3. Sign out the Teams CLI, then remove the packages, 4. Remove local artifacts, 5. Clean up cloud resources, 6. Rebuild and restart, Remove Microsoft Teams

### Community 202 - "Remove WhatsApp"
Cohesion: 0.25
Nodes (7): 1. Remove the adapter, 2. Remove the setup steps, 3. Remove credentials, 4. Remove the packages, 5. Rebuild and restart, 6. Remove auth state (optional), Remove WhatsApp

### Community 203 - "Migrating OpenClaw Cron Jobs to NanoClaw v2 Tasks"
Cohesion: 0.25
Nodes (7): Creating the task, For each enabled job, How tasks work in NanoClaw v2, Migrating OpenClaw Cron Jobs to NanoClaw v2 Tasks, OpenClaw Cron Job Format, Schedule mapping (use the shipped transform), What doesn't map

### Community 204 - "Remove migrate-from-openclaw"
Cohesion: 0.25
Nodes (7): 1. Remove the copied transform module and its test, 2. Remove the migration state file, 3. Remove deferred-task notes (if Phase 5 deferred any), 4. Migrated content files (review before deleting), 5. Rebuild if you removed copied skills, 6. Undo the migration itself (optional, destructive), Remove migrate-from-openclaw

### Community 205 - "native-credential-proxy.test.ts"
Cohesion: 0.39
Nodes (5): NATIVE_CREDENTIAL_VARS, nativeCredentialEnvArgs(), nativeCredentialsEnabled(), SAVED_CWD, SAVED_ENV

### Community 206 - "NanoClaw Architecture Diagram"
Cohesion: 0.25
Nodes (7): Entity Model + Isolation Levels, Isolation Level Cheatsheet, Message Flow (inbound -> agent -> outbound), Named Destinations + Agent-to-Agent, NanoClaw Architecture Diagram, System Overview, Two-DB Split (why)

### Community 207 - "`ncl tasks` migration"
Cohesion: 0.25
Nodes (7): Detect, Fix, Legacy tasks (scheduled before this update), `ncl tasks` migration, Rollback, Verify, Why

### Community 208 - "Phase 2: Apply Code Changes"
Cohesion: 0.29
Nodes (7): Add env-var stubs to `.env.example`, Copy the skill's source and tests into both trees, Forward host env vars into the container, Phase 2: Apply Code Changes, Register the MCP server in the agent-runner, Surface `[ATOMIC]` log lines at info level, Validate code changes

### Community 209 - "Troubleshooting"
Cohesion: 0.29
Nodes (7): Agent doesn't use Atomic Chat tools, Agent says "Atomic Chat is not installed" or tries to run a CLI, Context window or output size issues, "Failed to connect to Atomic Chat", `model not found` / 404 on generate, Slow first response, Troubleshooting

### Community 210 - "clidash"
Cohesion: 0.29
Nodes (6): API, clidash, Configure (`clidash.config.json`), Deploy as a service, Run, Test

### Community 212 - "resources/dashboard-wiring.test.ts"
Cohesion: 0.29
Nodes (3): indexPath, sf, source

### Community 213 - "Remove Mnemon"
Cohesion: 0.29
Nodes (6): 1. Strip the Dockerfile install layer, 2. Strip the entrypoint setup line, 3. Delete the copied test files, 4. Rebuild and restart, 5. Delete stored memory (optional), Remove Mnemon

### Community 215 - "Remove Telegram"
Cohesion: 0.29
Nodes (6): 1. Remove the adapter, 2. Remove the setup step, 3. Remove credentials, 4. Remove the package, 5. Rebuild and restart, Remove Telegram

### Community 216 - "Remove Vercel"
Cohesion: 0.29
Nodes (6): 1. Remove the container skill, 2. Remove the dependency guard test, 3. Remove the OneCLI credential, 4. The Vercel CLI in the container image, 5. Restart running containers, Remove Vercel

### Community 217 - "Remove WeChat Channel"
Cohesion: 0.29
Nodes (6): 1. Remove the adapter, 2. Remove credentials, 3. Remove the package, 4. Remove saved auth + sync state, 5. Rebuild and restart, Remove WeChat Channel

### Community 218 - "Manage Mounts"
Cohesion: 0.29
Nodes (6): Add Directories, After Changes, Manage Mounts, Remove Directories, Reset to Empty, Show Current Config

### Community 219 - "Git Provider Commands Reference"
Cohesion: 0.29
Nodes (7): API Failures, Error Handling, Git Provider Commands Reference, Missing CLI Tool, Provider Detection, Supported Providers, Unsupported Provider

### Community 220 - "Special cases"
Cohesion: 0.29
Nodes (7): Inline reply commands, Missing CLI tool, No PR/MR exists, No Qodo review yet, Review in progress, Special cases, Unsupported git provider

### Community 221 - "Remove Native Credential Proxy"
Cohesion: 0.29
Nodes (6): 1. Delete the copied files, 2. Revert the reach-in in `src/container-runner.ts`, 3. Remove the env keys, 4. Rebuild and restart, Remove Native Credential Proxy, Verification

### Community 222 - "Session DB Schema"
Cohesion: 0.29
Nodes (7): Agent-to-Agent Communication, Interactive Operations (Cards, Reactions, Edits), messages_in content by kind, messages_out content by kind, Routing, Scheduling, Session DB Schema

### Community 223 - "Flexibility Model"
Cohesion: 0.29
Nodes (7): Code Structure for Skill Customization, Code Style, Conflict Hotspots and Solutions, DB File Structure, Example: PR Factory, Flexibility Model, What the base architecture must support primitively

### Community 224 - "NanoClaw Database Architecture — Overview"
Cohesion: 0.29
Nodes (7): 1. The three databases, 2. Database map, 3. Central vs. session: what goes where, 4. Cross-mount visibility, 5. Design patterns at a glance, 6. Readers & writers — at a glance, NanoClaw Database Architecture — Overview

### Community 225 - "Agent Memory"
Cohesion: 0.29
Nodes (7): Agent Memory, How memory reaches the agent, Layout, Migrating older memory, Operator notes, Portable format (OKF), What goes where

### Community 226 - "Upgrading the OneCLI gateway"
Cohesion: 0.29
Nodes (6): 1. Detect, 2. Upgrade, 3. Verify, 4. Rollback, The CLI binary (`onecli-cli` pin), Upgrading the OneCLI gateway

### Community 227 - "Architecture: Channel System"
Cohesion: 0.29
Nodes (7): Adding a New Channel, Architecture: Channel System, Channel Interface, Channel Registry, Key Files, Self-Registration Pattern, System Diagram

### Community 228 - "Recovering from the upgrade tripwire"
Cohesion: 0.29
Nodes (6): If you have your own upgrade flow, If you just ran a supported upgrade, If you ran `git pull` yourself, Recovering from the upgrade tripwire, The override, What happened

### Community 229 - "Releasing NanoClaw"
Cohesion: 0.29
Nodes (6): Channels and stability, Publishing the release, Releasing NanoClaw, Rollup releases, What goes in a release, When to cut a release

### Community 231 - "Remove Discord"
Cohesion: 0.33
Nodes (5): 1. Remove the adapter, 2. Remove credentials, 3. Remove the package, 4. Rebuild and restart, Remove Discord

### Community 232 - "Remove Google Chat"
Cohesion: 0.33
Nodes (5): 1. Remove the adapter, 2. Remove credentials, 3. Remove the package, 4. Rebuild and restart, Remove Google Chat

### Community 233 - "Remove GitHub"
Cohesion: 0.33
Nodes (5): 1. Remove the adapter, 2. Remove credentials, 3. Remove the package, 4. Rebuild and restart, Remove GitHub

### Community 234 - "Remove iMessage"
Cohesion: 0.33
Nodes (5): 1. Remove the adapter, 2. Remove credentials, 3. Remove the package, 4. Rebuild and restart, Remove iMessage

### Community 235 - "Remove Karpathy LLM Wiki"
Cohesion: 0.33
Nodes (5): 1. Remove the shared container skill, 2. Remove the wiki section from the group CLAUDE.md, 3. Restart so containers drop the skill, Remove Karpathy LLM Wiki, User content is preserved

### Community 236 - "Remove Linear"
Cohesion: 0.33
Nodes (5): 1. Remove the adapter, 2. Remove credentials, 3. Remove the package, 4. Rebuild and restart, Remove Linear

### Community 237 - "Remove Matrix"
Cohesion: 0.33
Nodes (5): 1. Remove the adapter, 2. Remove credentials, 3. Remove the package, 4. Rebuild and restart, Remove Matrix

### Community 238 - "Remove Resend Email Channel"
Cohesion: 0.33
Nodes (5): 1. Remove the adapter, 2. Remove credentials, 3. Remove the package, 4. Rebuild and restart, Remove Resend Email Channel

### Community 239 - "Remove rtk"
Cohesion: 0.33
Nodes (5): 1. Remove the mount from the container config, 2. Remove the PreToolUse hook from settings.json, 3. Restart the container, 4. Remove the host binary (optional), Remove rtk

### Community 240 - "Remove Signal"
Cohesion: 0.33
Nodes (5): 1. Remove the adapter, 2. Remove credentials, 3. Rebuild and restart, 4. Unlink the Signal account (optional), Remove Signal

### Community 241 - "Remove Slack"
Cohesion: 0.33
Nodes (5): 1. Remove the adapter, 2. Remove credentials, 3. Remove the package, 4. Rebuild and restart, Remove Slack

### Community 242 - "Remove Webex"
Cohesion: 0.33
Nodes (5): 1. Remove the adapter, 2. Remove credentials, 3. Remove the package, 4. Rebuild and restart, Remove Webex

### Community 243 - "Remove WhatsApp Cloud API Channel"
Cohesion: 0.33
Nodes (5): 1. Remove the adapter, 2. Remove credentials, 3. Remove the package, 4. Rebuild and restart, Remove WhatsApp Cloud API Channel

### Community 244 - "Operational Behavior"
Cohesion: 0.33
Nodes (6): Error Handling and Retries, Host Polling, Message Batching, Message Lifecycle, Operational Behavior, Output Delivery

### Community 245 - "Switching an agent group between providers"
Cohesion: 0.33
Nodes (6): Preconditions, Rolling back, Switching, Switching an agent group between providers, What carries over, What does not carry over

### Community 246 - "Scheduled Tasks"
Cohesion: 0.33
Nodes (6): Creating a Task, How Scheduling Works, Managing Tasks, One-Time Tasks, Schedule Types, Scheduled Tasks

### Community 247 - "migrate-v2-reset.sh"
Cohesion: 0.53
Nodes (5): clean(), dim(), green(), migrate-v2-reset.sh script, use_ansi()

### Community 248 - "test-v2-agent.ts"
Cohesion: 0.33
Nodes (4): db, provider, resultChecker, timeout

### Community 249 - "Phase 2: Apply Code Changes"
Cohesion: 0.40
Nodes (5): Add MCP server to Dockerfile, Check if already applied, Install the dependency-guard test, Phase 2: Apply Code Changes, Rebuild the container image

### Community 250 - "Phase 2: Apply Code Changes"
Cohesion: 0.40
Nodes (5): Add MCP server to Dockerfile, Check if already applied, Copy the skill's tests into the container tree, Phase 2: Apply Code Changes, Rebuild the container image

### Community 251 - "Prerequisites by Provider"
Cohesion: 0.40
Nodes (5): Azure DevOps, Bitbucket, GitHub, GitLab, Prerequisites by Provider

### Community 252 - "Fetch Review Comments"
Cohesion: 0.40
Nodes (5): Azure DevOps, Bitbucket, Fetch Review Comments, GitHub, GitLab

### Community 253 - "Reply to Inline Comments"
Cohesion: 0.40
Nodes (5): Azure DevOps, Bitbucket, GitHub, GitLab, Reply to Inline Comments

### Community 254 - "Post Summary Comment"
Cohesion: 0.40
Nodes (5): Azure DevOps, Bitbucket, GitHub, GitLab, Post Summary Comment

### Community 255 - "Resolve Qodo Review Comment"
Cohesion: 0.40
Nodes (5): Azure DevOps, Bitbucket, GitHub, GitLab, Resolve Qodo Review Comment

### Community 256 - "Create PR/MR (Special Case)"
Cohesion: 0.40
Nodes (5): Azure DevOps, Bitbucket, Create PR/MR (Special Case), GitHub, GitLab

### Community 257 - "Find Open PR/MR"
Cohesion: 0.40
Nodes (5): Azure DevOps, Bitbucket, Find Open PR/MR, GitHub, GitLab

### Community 258 - "Configuration"
Cohesion: 0.40
Nodes (5): Changing the Assistant Name, Claude Authentication, Configuration, Container Configuration, Placeholder Values in launchd

### Community 259 - "Security Considerations"
Cohesion: 0.40
Nodes (5): Container Isolation, Credential Storage, File Permissions, Prompt Injection Risk, Security Considerations

### Community 260 - "cleanup-sessions.sh"
Cohesion: 0.80
Nodes (4): is_active(), log(), remove(), cleanup-sessions.sh script

### Community 261 - "agent-ping.ts"
Cohesion: 0.60
Nodes (3): classifyPingResult(), pingCliAgent(), PingResult

### Community 264 - "refresh"
Cohesion: 0.67
Nodes (4): coarseAgo(), refresh(), renderControls(), tick()

### Community 268 - "Step 0: Check code push status"
Cohesion: 0.50
Nodes (4): Scenario A: Uncommitted changes exist, Scenario B: Unpushed commits exist, Scenario C: Everything pushed, Step 0: Check code push status

### Community 270 - "Channel Adapters"
Cohesion: 0.50
Nodes (4): Auto-Registration, Channel Adapter Configuration, Channel Adapters, Chat SDK Integration

### Community 271 - "Media Handling"
Cohesion: 0.50
Nodes (4): Inbound, Media Handling, Message Deduplication, Outbound

### Community 272 - "Troubleshooting"
Cohesion: 0.50
Nodes (4): Common Issues, Debug Mode, Log Location, Troubleshooting

### Community 273 - "Message Flow"
Cohesion: 0.50
Nodes (4): Conversation Catch-Up, Incoming Message Flow, Message Flow, Trigger Word Matching

### Community 274 - "Deployment"
Cohesion: 0.50
Nodes (4): Deployment, Managing the Service, Service: com.nanoclaw, Startup Sequence

### Community 275 - "PULL_REQUEST_TEMPLATE.md"
Cohesion: 0.50
Nodes (3): Description, For Skills, Type of Change

### Community 276 - "included"
Cohesion: 0.67
Nodes (3): included(), main(), The system-understanding surface: host + agent-runner source (tests     excluded

### Community 277 - "imessage-configure.sh"
Cohesion: 0.83
Nodes (3): remove_key(), set_key(), imessage-configure.sh script

### Community 278 - "install-signal-cli.sh"
Cohesion: 0.83
Nodes (3): emit_status(), log(), install-signal-cli.sh script

### Community 279 - "migrate-v2/groups.ts"
Cohesion: 0.67
Nodes (3): copyTree(), main(), SKIP_NAMES

### Community 280 - "select-channels.ts"
Cohesion: 0.67
Nodes (3): CHANNELS, main(), VALID_NAMES

### Community 286 - "Central DB Schema"
Cohesion: 0.67
Nodes (3): Central DB Schema, Container lifecycle states, Pending Question Flow

### Community 287 - "Memory System"
Cohesion: 0.67
Nodes (3): How Memory Works, Memory Hierarchy, Memory System

## Knowledge Gaps
- **2058 isolated node(s):** `server`, `transport`, `name`, `version`, `description` (+2053 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **44 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `sleep()` connect `Agent-to-Agent MCP Tools` to `Container Poll Loop`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `handleRequest()` connect `Session/Approval DB Layer` to `Channel Wiring Defaults`, `Container Restart & Wake`, `Dashboard Data Collection`, `Channel Registry & Setup`, `Agent-to-Agent MCP Tools`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `err()` connect `Channel Registry & Setup` to `Task Formatting & Display`, `Channel Wiring Defaults`, `CLI Guard & Delivery Actions`, `Session/Approval DB Layer`, `OneCLI Client & Formatting`, `Container Restart & Wake`, `Session DB Schema`, `Test Fixtures & Attachments`, `WhatsApp Adapter Internals`, `Dashboard Data Collection`, `Chat SDK Bridge Actions`, `Outbound Delivery Polling`, `Admin Command Gate`, `Destination Routing & Inbox Safety`, `CLI Resource Dispatch`, `Mount Security Allowlist`, `Webhook Server`, `Task/Template Parsing`, `Chat SDK Message Splitting`, `Group Filesystem Init`, `scheduling/db.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Are the 69 inferred relationships involving `err()` (e.g. with `backfillContainerConfigs()` and `initChannelAdapters()`) actually correct?**
  _`err()` has 69 INFERRED edges - model-reasoned connections that need verification._
- **What connects `server`, `transport`, `name` to the rest of the system?**
  _2058 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Task Formatting & Display` be split into smaller, more focused modules?**
  _Cohesion score 0.12692307692307692 - nodes in this community are weakly interconnected._
- **Should `Channel Wiring Defaults` be split into smaller, more focused modules?**
  _Cohesion score 0.055905220288781934 - nodes in this community are weakly interconnected._