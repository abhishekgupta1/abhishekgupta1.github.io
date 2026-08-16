---
title: "90-Day Linux/SRE Mastery Roadmap"
description: "A 12-week phased learning plan from Linux comfort to production-grade SRE debugging skill — filesystem, processes, networking, CPU/memory, containers, and observability."
sidebar_position: 5
tags: [sre, linux, roadmap, learning-plan, performance, containers, observability]
---

## How This Roadmap Is Structured

- **Phase 1 (Days 1–30)** → Core Linux control
- **Phase 2 (Days 31–60)** → Performance & debugging depth
- **Phase 3 (Days 61–90)** → Production-level SRE mastery

Each phase includes: Concepts, Commands to master, Labs, Expected outcome.

## Table of Contents

1. [Phase 1 — Linux Foundations (Days 1–30)](#-phase-1--linux-foundations-days-130)
2. [Phase 2 — Performance & Debugging Depth (Days 31–60)](#-phase-2--performance--debugging-depth-days-3160)
3. [Phase 3 — Production SRE Mastery (Days 61–90)](#-phase-3--production-sre-mastery-days-6190)
4. [Daily Habit](#-daily-habit-throughout-90-days)
5. [Final Skill Checklist](#-final-skill-checklist-if-you-can-do-these-youre-strong)

---

## 🔵 PHASE 1 — Linux Foundations (Days 1–30)

**Goal**: Become comfortable living inside Linux without fear.

### ✅ Week 1 — Filesystem & Shell Mastery

**Concepts**: filesystem hierarchy, inodes, file descriptors, permissions (rwx, SUID, SGID, sticky bit), environment variables

**Commands**: `ls`, `stat`, `file`, `find`, `xargs`, `chmod`, `chown`, `du`, `df`, `mount`, `umount`, `lsblk`, `lsof`

**Lab**:
- Fill disk to 95% → debug it
- Exhaust inodes → fix it
- Break permissions → repair them
- Trace which process is holding a deleted file open

**Outcome**: You can debug "disk full" in under 10 minutes.

### ✅ Week 2 — Process & Service Control

**Concepts**: PID/PPID, zombie processes, signals, daemons, systemd internals

**Commands**: `ps aux`, `top`/`htop`, `pstree`, `kill`/`kill -9`, `nice`/`renice`, `systemctl`, `journalctl`

**Lab**:
- Create zombie processes intentionally
- Write a broken systemd service and debug it
- Crash a service and analyze logs

**Outcome**: You can debug "service not starting" confidently.

### ✅ Week 3 — Networking Essentials

**Concepts**: TCP 3-way handshake, SYN backlog, TIME_WAIT, DNS resolution flow, routing tables, NAT basics

**Commands**: `ip a`, `ip route`, `ss -tulpn`, `tcpdump`, `netstat`, `dig`, `curl`, `nc`, `traceroute`

**Lab**:
- Break DNS → fix it
- Simulate port conflicts
- Capture and analyze a TCP handshake
- Block traffic with a firewall → debug it

**Outcome**: You can debug "service unreachable" end-to-end.

### ✅ Week 4 — Storage & Memory

**Concepts**: virtual memory, page cache, swap, OOM killer, IOPS/latency/throughput, LVM basics

**Commands**: `free -m`, `vmstat`, `iostat`, `iotop`, `lsblk`, `df -i`, `dmesg`

**Lab**:
- Trigger the OOM killer
- Saturate disk I/O
- Create and extend LVM volumes
- Analyze memory pressure

**Outcome**: You understand what "high load" actually means.

---

## 🟡 PHASE 2 — Performance & Debugging Depth (Days 31–60)

**Goal**: Think like the kernel.

### ✅ Week 5 — CPU & Load Deep Dive

**Concepts**: load average meaning, run queue, context switching, CPU steal time (VMs), interrupts

**Tools**: `uptime`, `mpstat`, `pidstat`, `sar`, `vmstat`, `perf top`

**Lab**:
- Create a CPU-bound process
- Analyze CPU saturation
- Measure context switches

**Outcome**: You can explain why load is high.

### ✅ Week 6 — Advanced Memory Debugging

**Concepts**: memory leaks, RSS vs VSZ, page faults, overcommit behavior, huge pages

**Tools**: `smem`, `pmap`, `cat /proc/meminfo`, `cat /proc/<pid>/smaps`

**Lab**:
- Simulate a memory leak
- Compare memory usage across processes
- Debug OOM logs

**Outcome**: You can debug "server slow after 3 days."

### ✅ Week 7 — I/O & Filesystem Internals

**Concepts**: I/O scheduler, queue depth, fsync impact, journaling

**Tools**: `iostat -x`, `blktrace`, `dstat`, `lsof`

**Lab**:
- Create a heavy write workload
- Observe iowait behavior
- Compare SSD vs HDD latency

**Outcome**: You can debug disk bottlenecks like a senior engineer.

### ✅ Week 8 — Strace, Lsof & System Call Debugging

**Concepts**: system calls, blocking vs non-blocking I/O, file descriptor leaks

**Tools**: `strace`, `lsof`, `watch`

**Lab**:
- Trace a failing process
- Identify a hanging syscall
- Detect an FD leak

**Outcome**: You stop guessing. You start proving.

---

## 🔴 PHASE 3 — Production SRE Mastery (Days 61–90)

**Goal**: Operate like you're on-call for a major system.

### ✅ Week 9 — Networking at Scale

**Concepts**: SYN flood, ephemeral port exhaustion, TCP retransmissions, MTU mismatch, keepalive behavior

**Tools**: `ss -s`, `tcpdump -i any`, `netstat -an`, `ethtool`

**Lab**:
- Simulate connection exhaustion
- Analyze packet drops
- Tune TCP parameters

### ✅ Week 10 — Containers & cgroups

**Concepts**: namespaces, cgroups v1/v2, CPU shares, memory limits, PID namespace

**Tools**: `docker stats`, `docker inspect`, `cat /sys/fs/cgroup/*`

**Lab**:
- Constrain container memory
- Trigger a container OOM
- Debug container networking

### ✅ Week 11 — Observability Mindset

Learn:
- **USE Method** (Utilization, Saturation, Errors)
- **RED Method** (Rate, Errors, Duration)
- How Linux metrics map to SRE dashboards

Read:
- *Systems Performance* by Brendan Gregg
- *Site Reliability Engineering* by Google

### ✅ Week 12 — Chaos & Failure Simulation

Now simulate real incidents:
- Disk full
- Memory exhaustion
- CPU saturation
- DNS failure
- Network partition
- File descriptor exhaustion
- Kernel panic (VM only)

Practice debugging under time pressure.

---

## 🧠 Daily Habit (Throughout 90 Days)

Every single day:

- Spend 30 minutes reading `/proc`
- Use man pages instead of Google
- Break something intentionally
- Write a postmortem

---

## 🔥 Final Skill Checklist (If You Can Do These, You're Strong)

You can:

- Explain load average clearly
- Debug high CPU in under 5 minutes
- Diagnose OOM cause from logs
- Trace a hanging process with `strace`
- Identify disk saturation
- Analyze a TCP handshake via `tcpdump`
- Debug container resource limits
- Recover from a broken systemd service

## 🏁 After 90 Days

You won't just "know Linux." You will:

- Think in queues
- See bottlenecks
- Understand kernel states
- Debug calmly under pressure

## Key Takeaways

- 💡 Each phase builds on the last — don't skip to containers/cgroups (Week 10) before internalizing CPU/memory/disk fundamentals (Weeks 1–8).
- 🔥 The daily `/proc` habit is what converts memorized commands into intuition.
- ✅ Week 12's chaos simulation is the real test — pair it directly with [Incident Simulation Labs](./incident-simulation-labs).

## See Also

- [Incident Simulation Labs](./incident-simulation-labs) — the hands-on labs referenced throughout each phase
- [Incident Response Mindset](./incident-response-mindset) — the thinking framework to pair with these technical skills
- [Process Management & /proc](./process-management-proc) — Week 2 & 6 deep reference
- [Filesystem & Storage Playbook](./filesystem-storage-playbook) — Weeks 1, 4, 7 deep reference
- [Linux Kernel Fundamentals](./linux-kernel-fundamentals) — underlying theory for Phase 2
