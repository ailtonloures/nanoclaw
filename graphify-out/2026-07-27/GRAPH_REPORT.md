# Graph Report - .  (2026-07-26)

## Corpus Check
- Large corpus: 676 files · ~843,957 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 1814 nodes · 5615 edges · 84 communities (74 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 128 edges (avg confidence: 0.77)
- Token cost: 155,233 input · 0 output

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
- Add-Reaction MCP Tool
- Internal Thoughts Tags
- Communication Guideline
- Conversation History Folder

## God Nodes (most connected - your core abstractions)
1. `getDb()` - 150 edges
2. `err()` - 71 edges
3. `log` - 59 edges
4. `getAgentGroup()` - 49 edges
5. `createAgentGroup()` - 47 edges
6. `runMigrations()` - 39 edges
7. `writeSessionMessage()` - 39 edges
8. `initTestDb()` - 36 edges
9. `closeDb()` - 36 edges
10. `getSession()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `hookLogger()` --indirect_call--> `input()`  [INFERRED]
  container/agent-runner/scripts/sdk-signal-probe.ts → src/guard/guard.test.ts
- `lastNotifyText()` --indirect_call--> `writeSessionMessage()`  [INFERRED]
  src/modules/approvals/primitive.test.ts → src/session-manager.ts
- `lastRelayedText()` --indirect_call--> `writeSessionMessage()`  [INFERRED]
  src/modules/approvals/reason-capture.test.ts → src/session-manager.ts
- `Approvals ResponseHandler (claims agent-initiated + OneCLI)` --semantically_similar_to--> `Interactive ResponseHandler (question_response)`  [INFERRED] [semantically similar]
  src/modules/approvals/project.md → src/modules/interactive/project.md
- `insertMessage()` --calls--> `getInboundDb()`  [EXTRACTED]
  container/agent-runner/src/formatter.test.ts → container/agent-runner/src/db/connection.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Welcome-Tour Capability Set (agent tools revealed to new users)** — container_skills_welcome_skill_capabilities_tour, container_agent_runner_src_mcp_tools_agents_instructions_create_agent, container_agent_runner_src_mcp_tools_scheduling_instructions_ncl_tasks, container_skills_self_customize_skill_self_customize [INFERRED 0.80]
- **Sub-Agent Delegation Pattern (builder / frontend-engineer via create_agent)** — container_agent_runner_src_mcp_tools_agents_instructions_create_agent, container_skills_self_customize_skill_builder_agent_pattern, container_skills_vercel_cli_skill_delegate_to_frontend_engineer, container_skills_frontend_engineer_skill_frontend_engineer [INFERRED 0.85]
- **OneCLI-Managed Credential Injection Pattern** — container_skills_onecli_gateway_skill_onecli_gateway, container_agent_runner_src_mcp_tools_self_mod_instructions_add_mcp_server, container_skills_vercel_cli_skill_vercel_cli [INFERRED 0.85]
- **Self-mod tool call to admin-approved container rebuild/restart pipeline** — src_modules_self_mod_project_self_mod_module, src_modules_approvals_project_approvals_module, src_modules_self_mod_project_install_packages_handler, src_modules_self_mod_project_add_mcp_server_handler, src_modules_approvals_project_pending_approvals_table [INFERRED 0.85]
- **Registered ResponseHandler pattern for button-click approvals/questions** — src_modules_approvals_project_responsehandler, src_modules_interactive_project_responsehandler, src_modules_approvals_project_pending_approvals_table, src_modules_interactive_project_pending_questions_table [INFERRED 0.75]
- **Human-in-the-loop MCP tools exposed to the agent** — src_modules_interactive_agent_ask_user_question, src_modules_approvals_agent_install_packages, src_modules_approvals_agent_add_mcp_server, src_modules_approvals_agent_onecli_credential_approval [INFERRED 0.75]

## Communities (84 total, 10 thin omitted)

### Community 0 - "Task Formatting & Display"
Cohesion: 0.06
Nodes (73): age(), clip(), COLS, duration(), formatTasksTable(), lastRun(), nextRun(), parseMs() (+65 more)

### Community 1 - "Startup Circuit Breaker"
Cohesion: 0.06
Nodes (50): teardownChannelAdapters(), BACKOFF_SCHEDULE_S, CB_PATH, CircuitBreakerState, enforceStartupBackoff(), getDelay(), read(), resetCircuitBreaker() (+42 more)

### Community 2 - "Channel Wiring Defaults"
Cohesion: 0.07
Nodes (50): EngageValues, escapeRegex(), resolveThreadPolicy(), resolveUnknownSenderPolicy(), resolveWiringDefaults(), substituteName(), validateEngageAgainstChannel(), getChannelDefaults() (+42 more)

### Community 3 - "Agent Group DB Access"
Cohesion: 0.11
Nodes (42): projectDestinationsToSessions(), deleteAgentGroup(), getAgentGroupByFolder(), updateAgentGroup(), getDb(), hasTable(), initDb(), deleteContainerConfig() (+34 more)

### Community 4 - "CLI Guard & Delivery Actions"
Cohesion: 0.11
Nodes (36): commandDecide(), commandGuardAction(), commandGuardSpec(), testUnguarded, DeliveryGuardSpec, runGuarded(), isUnguardedEntry(), reenterGuardedDeliveryAction() (+28 more)

### Community 5 - "Session/Approval DB Layer"
Cohesion: 0.11
Nodes (37): closeDb(), initTestDb(), runMigrations(), createSession(), deletePendingApproval(), getExpiredAwaitingReasonApprovals(), markApprovalAwaitingReason(), now() (+29 more)

### Community 6 - "OneCLI Client & Formatting"
Cohesion: 0.10
Nodes (33): main(), parseArgv(), pickTransport(), printUsage(), formatHuman(), FormatMode, formatResponse(), isFlatRecord() (+25 more)

### Community 7 - "Session DB Connection Mgmt"
Cohesion: 0.13
Nodes (34): getConfig(), clearStaleProcessingAcks(), closeSessionDb(), getInboundDb(), getOutboundDb(), initTestSessionDb(), openInboundDb(), findQuestionResponse() (+26 more)

### Community 8 - "Container Restart & Wake"
Cohesion: 0.14
Nodes (30): restartAgentGroupContainers(), isContainerRunning(), killContainer(), wakeContainer(), getAgentGroup(), countDueMessages(), getSession(), createAgent() (+22 more)

### Community 9 - "Central DB Migrations"
Cohesion: 0.09
Nodes (22): migration001, migration002, migration008, migration009, LegacyRow, migration010, migration011, migration012 (+14 more)

### Community 10 - "Session DB Schema"
Cohesion: 0.10
Nodes (33): ContainerState, deleteOrphanProcessingClaims(), getContainerState(), getMessageForRetry(), getProcessingClaims(), insertMessage(), markMessageFailed(), migrateMessagesInTable() (+25 more)

### Community 11 - "Test Fixtures & Attachments"
Cohesion: 0.11
Nodes (28): isSafeAttachmentName(), readSessionDestinations(), createChatSession(), createGroup(), now(), spawnContainer(), upsertSessionRouting(), findSessionByAgentGroup() (+20 more)

### Community 12 - "WhatsApp Adapter Internals"
Cohesion: 0.09
Nodes (36): fetchBotUsername(), appendMediaFailureNote(), AUTH_DIR, baileysLogger, buildMediaMessage(), collectMentionedJids(), computeIsMention(), connectSocket() (+28 more)

### Community 13 - "ncl CLI Entry Point"
Cohesion: 0.09
Nodes (14): argv, { command, args, json }, formatHuman(), localizeIsoTimestamps(), localTime(), parseArgv(), printUsage(), req (+6 more)

### Community 14 - "Ask-Question Normalization"
Cohesion: 0.11
Nodes (33): InboundEvent, AskQuestionPayload, NormalizedOption, normalizeOption(), normalizeOptions(), OptionInput, OptionStyle, RawOption (+25 more)

### Community 15 - "Self-Mod Approval Flow"
Cohesion: 0.07
Nodes (38): add_mcp_server tool, install_packages tool, OneCLI credential approval (agent-facing), Self-modification tools (agent-facing doc), Agent-initiated approval flow, Approvals module, buildAgentGroupImage (core, used by approvals), getDeliveryAdapter (+30 more)

### Community 16 - "Session State & Continuation"
Cohesion: 0.11
Nodes (23): clearContinuation(), clearCurrentInReplyTo(), continuationKey(), deleteValue(), getContinuation(), getValue(), migrateLegacyContinuation(), setContinuation() (+15 more)

### Community 17 - "Router Command Formatting"
Cohesion: 0.14
Nodes (30): findByRouting(), ADMIN_COMMANDS, categorizeMessage(), CommandCategory, CommandInfo, escapeXml(), extractSenderId(), FILTERED_COMMANDS (+22 more)

### Community 18 - "Dashboard Data Collection"
Cohesion: 0.12
Nodes (29): getActiveAdapters(), collectActivity(), collectAgentGroups(), collectChannels(), collectContextWindows(), collectMessages(), collectSessions(), collectSnapshot() (+21 more)

### Community 19 - "Claude Provider Runtime"
Cohesion: 0.12
Nodes (26): clearContainerToolInFlight(), setContainerToolInFlight(), archiveTranscriptFile(), classifyRateLimitEvent(), claudeConfigDir(), claudeProjectsDir(), createPreCompactHook(), findTranscriptPath() (+18 more)

### Community 20 - "Chat SDK Bridge Actions"
Cohesion: 0.10
Nodes (25): ChannelDefaults, InboundMessage, captured, CapturedEdit, fireAction(), makeAdapter(), ChatSdkBridgeConfig, createChatSdkBridge() (+17 more)

### Community 21 - "Channel Adapter Interface"
Cohesion: 0.08
Nodes (9): ChannelAdapter, ChannelAdapterFactory, ChannelContextDefaults, ChannelSetup, ConversationInfo, DeliveryAddress, OutboundMessage, withDeclaration() (+1 more)

### Community 22 - "Channel Registry & Setup"
Cohesion: 0.09
Nodes (20): ChannelRegistration, OutboundFile, activeAdapters, createChannelDeliveryAdapter(), fallbackChannelDefaults(), getRegisteredChannelNames(), initChannelAdapters(), isNetworkError() (+12 more)

### Community 23 - "Agent-to-Agent MCP Tools"
Cohesion: 0.10
Nodes (11): createAgent, askUserQuestion, sendCard, addMcpServer, installPackages, allTools, log(), registerTools() (+3 more)

### Community 24 - "Outbound Delivery Polling"
Cohesion: 0.11
Nodes (28): getDeliveredIds(), getDueOutboundMessages(), markDelivered(), markDeliveryFailed(), migrateDeliveredTable(), AdapterReadyCallback, adapterReadyCallbacks, deliverSessionMessages() (+20 more)

### Community 25 - "Provider Factory & Mocks"
Cohesion: 0.11
Nodes (13): ThrowingHookProvider, PollLoopConfig, ProviderName, MockProvider, getProviderFactory(), ProviderFactory, registerProvider(), registry (+5 more)

### Community 26 - "Admin Command Gate"
Cohesion: 0.15
Nodes (24): ADMIN_COMMANDS, FILTERED_COMMANDS, gateCommand(), GateResult, isAdmin(), now(), seedAgentGroup(), seedUser() (+16 more)

### Community 27 - "Destination Routing & Inbox Safety"
Cohesion: 0.13
Nodes (25): DestinationRow, getInboundSourceSessionId(), getMostRecentPeerSourceSessionId(), replaceDestinations(), ensureContainedInboxDir(), isPathInside(), COLORS, emit() (+17 more)

### Community 28 - "Compact Instructions & Session Routing"
Cohesion: 0.12
Nodes (19): buildCompactInstructions(), formatDestinationNames(), getSessionRouting(), getTaskSeriesId(), SessionRouting, getCurrentInReplyTo(), buildDestinationsSection(), DestinationEntry (+11 more)

### Community 29 - "Container Poll Loop"
Cohesion: 0.16
Nodes (26): markScriptSkipped(), writeMessageOut, isRunnerCommand(), RoutingContext, stripInternalTags(), sendFile, sendMessage, autoAppendTaskLog() (+18 more)

### Community 30 - "SDK Dependencies (package.json)"
Cohesion: 0.07
Nodes (26): @anthropic-ai/claude-agent-sdk, @anthropic-ai/sdk, dependencies, @anthropic-ai/claude-agent-sdk, @anthropic-ai/sdk, cron-parser, @modelcontextprotocol/sdk, zod (+18 more)

### Community 31 - "Telegram Pairing Flow"
Cohesion: 0.16
Nodes (25): ConsumedDetails, ConsumeInput, createPairing(), extractAddressedText(), extractCode(), generateCode(), getPairing(), getStatus() (+17 more)

### Community 32 - "Generic CRUD Dispatch"
Cohesion: 0.18
Nodes (15): CustomOperation, DISPATCH_INJECTED_KEYS, genericCreate(), genericDelete(), genericGet(), genericList(), genericUpdate(), normalizeArgs() (+7 more)

### Community 33 - "Container Runner & Mounts"
Cohesion: 0.13
Nodes (19): activeContainers, buildContainerArgs(), buildMounts(), hardeningArgs(), onecli, resolveProviderContribution(), resolveProviderName(), selectedSkillNames() (+11 more)

### Community 34 - "Approvals & Destinations CRUD"
Cohesion: 0.14
Nodes (21): createPendingApproval(), getPendingApproval(), deleteAllDestinationsTouching(), deleteDestination(), getDestinationReferencers(), hasDestination(), deletePoliciesTouching(), getMessagePolicy() (+13 more)

### Community 35 - "Agent Collaboration Patterns"
Cohesion: 0.09
Nodes (24): Collaborator Agent Pattern, Companion Agent Pattern, create_agent MCP tool, ncl Write-Command Approval Flow, ncl Admin CLI, send_file MCP tool, ask_user_question MCP tool, send_card MCP tool (+16 more)

### Community 36 - "CLI Resource Dispatch"
Cohesion: 0.15
Nodes (18): getResource(), actorFor(), closestName(), commandHelp(), dispatch(), DispatchOptions, editDistance(), errMsg() (+10 more)

### Community 37 - "Legacy Container Config Backfill"
Cohesion: 0.24
Nodes (14): backfillContainerConfigs(), LegacyContainerJson, AdditionalMountConfig, configFromDb(), materializeContainerJson(), McpServerConfig, buildAgentGroupImage(), execAsync (+6 more)

### Community 38 - "Mount Security Allowlist"
Cohesion: 0.16
Nodes (15): MOUNT_ALLOWLIST_PATH, AdditionalMount, AllowedRoot, DEFAULT_BLOCKED_PATTERNS, expandPath(), findAllowedRoot(), getRealPath(), isValidContainerPath() (+7 more)

### Community 39 - "User-DM Cache & Delivery"
Cohesion: 0.18
Nodes (13): getChannelAdapter(), lastNotifyText(), deleteUserDm(), getUserDm(), upsertUserDm(), deleteUser(), getUser(), updateDisplayName() (+5 more)

### Community 40 - "CLI Help System"
Cohesion: 0.15
Nodes (14): getCliScope(), registerResourceHelpCommands(), getResources(), approvalState, mockGetAgentGroup, mockGetContainerConfig, mockGetPendingApproval, mockGetResource (+6 more)

### Community 41 - "Container Env Config"
Cohesion: 0.12
Nodes (12): ContainerConfig, readEnvFile(), DATA_DIR, GROUPS_DIR, ProviderContainerConfigFn, ProviderContainerContext, ProviderContainerContribution, ProviderHostCapabilities (+4 more)

### Community 42 - "TypeScript Build Config"
Cohesion: 0.12
Nodes (16): compilerOptions, esModuleInterop, module, moduleResolution, rootDir, skipLibCheck, strict, target (+8 more)

### Community 43 - "Group Folder Validation"
Cohesion: 0.24
Nodes (12): GROUPS_DIR, JSON_COLUMNS, updateContainerConfigJson(), assertValidGroupFolder(), ensureWithinBase(), isValidGroupFolder(), RESERVED_FOLDERS, resolveGroupFolderPath() (+4 more)

### Community 44 - "Memory File Read/Write"
Cohesion: 0.22
Nodes (8): readMemoryFile(), renderMemorySection(), source, MEMORY_CONTEXT_SOURCES, MEMORY_SESSION_HOOK, memoryContextForSessionStart(), MemorySessionHookSource, MemorySessionStartSource

### Community 45 - "CLAUDE.md Compose Tests"
Cohesion: 0.17
Nodes (8): GROUPS_DIR, seed(), count(), createAgentGroup(), ensureContainerConfig(), makeGroup(), makeGroup(), performCreateAgent()

### Community 46 - "CRUD Test Harness"
Cohesion: 0.15
Nodes (13): ensureContainerConfigSpy, hookCalls, hostCtx, writeDestinationsSpy, declared, hostCtx, mg(), neverDeclared (+5 more)

### Community 47 - "Host Runtime Config"
Cohesion: 0.16
Nodes (11): DATA_DIR, DEFAULT_AGENT_PROVIDER, envConfig, INSTALL_SLUG, PROJECT_ROOT, SENDER_ALLOWLIST_PATH, STORE_DIR, TIMEZONE (+3 more)

### Community 48 - "Webhook Server"
Cohesion: 0.20
Nodes (10): ensureServer(), fromWebResponse(), rawRoutes, RawWebhookHandler, registerWebhookAdapter(), registerWebhookHandler(), routes, stopWebhookServer() (+2 more)

### Community 49 - "Agent-Runner Config & Entry"
Cohesion: 0.22
Nodes (9): loadConfig(), RunnerConfig, buildSystemPromptAddendum(), log(), main(), copyTemplateIfMissing(), ensureMemoryScaffold(), TEMPLATES_DIR (+1 more)

### Community 50 - "Core Type Definitions"
Cohesion: 0.13
Nodes (14): AgentDestination, AgentGroupMember, AgentMessagePolicy, EngageMode, IgnoredMessagePolicy, MessageIn, MessageInKind, MessageInStatus (+6 more)

### Community 51 - "Task Script Runner"
Cohesion: 0.23
Nodes (12): touchHeartbeat(), MessageInRow, applyPreTaskScripts(), log(), runScript(), ScriptResult, ScriptSkipReason, TaskScriptOutcome (+4 more)

### Community 52 - "CLI Help Rendering"
Cohesion: 0.24
Nodes (12): ColumnDef, flagLine(), flagName(), GENERIC_VERBS, genericFlags(), genericSummary(), GenericVerb, indent() (+4 more)

### Community 53 - "OneCLI Approval Bridge"
Cohesion: 0.22
Nodes (12): ApprovalSummary, buildQuestion(), Decision, editCardExpired(), handleRequest(), onecli, pending, PendingState (+4 more)

### Community 54 - "SDK Hook Signal Probe"
Cohesion: 0.20
Nodes (11): args, HOOK_EVENTS, hookLogger(), hooks, log(), prompt, prompts, pushes (+3 more)

### Community 55 - "Task/Template Parsing"
Cohesion: 0.27
Nodes (9): asRecord(), parseTaskFile(), parseTemplate(), readContextExtras(), readJson(), readSkills(), readTasks(), Template (+1 more)

### Community 56 - "Claude Provider Session Hooks"
Cohesion: 0.22
Nodes (3): MemorySessionHookRegistration, ClaudeProvider, McpServerConfig

### Community 57 - "Group Persona Staging"
Cohesion: 0.39
Nodes (6): composeGroupClaudeMd(), MCP_TOOLS_HOST_SUBPATH, syncSymlink(), writeAtomic(), readGroupPersona(), stageGroupPersona()

### Community 58 - "Container Restart Tests"
Cohesion: 0.22
Nodes (7): mockCountDueMessages, mockGetSession, mockGetSessionsByAgentGroup, mockIsContainerRunning, mockKillContainer, mockWakeContainer, mockWriteSessionMessage

### Community 59 - "Agent Memory System (OKF)"
Cohesion: 0.32
Nodes (8): Memory Index Template (memory/index.md), Agent Memory System Definition, Open Knowledge Format (OKF), Memory System Index (memory/system/index.md), instructions.prepend.md (standing role/persona file), Agent Memory Section, Agent Workspace (/workspace/agent/), Welcome / Channel Onboarding Skill

### Community 60 - "Chat SDK Message Splitting"
Cohesion: 0.29
Nodes (5): splitForLimit(), CapturedButton, PostCall, setupStubAdapter(), stubAdapter()

### Community 61 - "Group Filesystem Init"
Cohesion: 0.50
Nodes (6): initGroupFilesystem(), isRecord(), migrateClaudeMemorySettings(), removeLegacyNanoClawMemoryHook(), writeAtomic(), providerProvidesAgentSurfaces()

### Community 62 - "Dashboard Wiring Tests"
Cohesion: 0.29
Nodes (3): indexPath, sf, source

### Community 63 - "Task Session Templates"
Cohesion: 0.29
Nodes (4): findTaskSessions(), DATA_DIR, GROUPS_DIR, TEMPLATES_DIR

### Community 64 - "Create-Agent Delivery Action"
Cohesion: 0.33
Nodes (5): getDeliveryAction(), handleSystemAction(), {
  mockRequestApproval,
  mockGetContainerConfig,
  mockCreateAgentGroup,
  mockInitGroupFilesystem,
  mockWriteDestinations,
  mockNotifyWrite,
  liveApprovals,
  approvalHandlers,
}, runCreateAgent(), SESSION

### Community 65 - "Channel Approval Tests"
Cohesion: 0.43
Nodes (6): deliverMock, dmEvent(), groupMention(), now(), telegramDefaults, waGroupMention()

### Community 66 - "Attachment Naming"
Cohesion: 0.53
Nodes (4): deriveAttachmentName(), extForMime(), MIME_TO_EXT, TYPE_TO_EXT

### Community 67 - "CLI Tools Manifest"
Cohesion: 0.40
Nodes (4): dockerfile, here, installer, manifest

### Community 69 - "WhatsApp Mention Syntax"
Cohesion: 0.67
Nodes (3): WhatsApp Mentions Instructions (condensed), WhatsApp Mention Syntax (@phone-digits), WhatsApp Text Styles (single-char delimiters)

## Knowledge Gaps
- **310 isolated node(s):** `name`, `version`, `type`, `description`, `start` (+305 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDb()` connect `Agent Group DB Access` to `Channel Wiring Defaults`, `Session/Approval DB Layer`, `Container Restart & Wake`, `Test Fixtures & Attachments`, `ncl CLI Entry Point`, `Ask-Question Normalization`, `Dashboard Data Collection`, `Chat SDK Bridge Actions`, `Outbound Delivery Polling`, `Admin Command Gate`, `Generic CRUD Dispatch`, `Container Runner & Mounts`, `Approvals & Destinations CRUD`, `CLI Resource Dispatch`, `Legacy Container Config Backfill`, `User-DM Cache & Delivery`, `Group Folder Validation`, `CLAUDE.md Compose Tests`, `CRUD Test Harness`, `Task Session Templates`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `log` connect `Destination Routing & Inbox Safety` to `Task Formatting & Display`, `Startup Circuit Breaker`, `Channel Wiring Defaults`, `Agent Group DB Access`, `CLI Guard & Delivery Actions`, `Session/Approval DB Layer`, `OneCLI Client & Formatting`, `Container Restart & Wake`, `Central DB Migrations`, `Session DB Schema`, `Test Fixtures & Attachments`, `WhatsApp Adapter Internals`, `Ask-Question Normalization`, `Dashboard Data Collection`, `Chat SDK Bridge Actions`, `Channel Adapter Interface`, `Channel Registry & Setup`, `Outbound Delivery Polling`, `Telegram Pairing Flow`, `Container Runner & Mounts`, `Legacy Container Config Backfill`, `Mount Security Allowlist`, `User-DM Cache & Delivery`, `Container Env Config`, `Webhook Server`, `OneCLI Approval Bridge`, `Group Persona Staging`, `Group Filesystem Init`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `err()` connect `WhatsApp Adapter Internals` to `Task Formatting & Display`, `Startup Circuit Breaker`, `Channel Wiring Defaults`, `Agent Group DB Access`, `CLI Guard & Delivery Actions`, `Session/Approval DB Layer`, `OneCLI Client & Formatting`, `Container Restart & Wake`, `Session DB Schema`, `Test Fixtures & Attachments`, `Ask-Question Normalization`, `Dashboard Data Collection`, `Chat SDK Bridge Actions`, `Channel Registry & Setup`, `Outbound Delivery Polling`, `Destination Routing & Inbox Safety`, `CLI Resource Dispatch`, `Legacy Container Config Backfill`, `Mount Security Allowlist`, `User-DM Cache & Delivery`, `Container Env Config`, `Group Folder Validation`, `Webhook Server`, `OneCLI Approval Bridge`, `Task/Template Parsing`, `Group Persona Staging`, `Group Filesystem Init`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 69 inferred relationships involving `err()` (e.g. with `backfillContainerConfigs()` and `initChannelAdapters()`) actually correct?**
  _`err()` has 69 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `version`, `type` to the rest of the system?**
  _310 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Task Formatting & Display` be split into smaller, more focused modules?**
  _Cohesion score 0.058002735978112174 - nodes in this community are weakly interconnected._
- **Should `Startup Circuit Breaker` be split into smaller, more focused modules?**
  _Cohesion score 0.05632360471070148 - nodes in this community are weakly interconnected._