---
title: "Linux Debugging Reference"
description: "Master outline of Linux subsystems and tools an SRE must know cold — systemd, CPU/memory/disk, networking, observability, security, containers, boot, and the practical debugging playbook."
sidebar_position: 6
tags: [linux, sre, debugging, systemd, networking, containers, security, boot]
---

You should deeply understand: `/proc`, `strace`, `tcpdump`, `vmstat`, `iostat`, `systemctl`, `journalctl`, `top`, `ss`.

Senior engineers think in: **resource bottlenecks**, **kernel states**, **queues**, **backpressure**, **timeouts**, **failure domains**.

## Table of Contents

1. [Practical Debugging Playbook](#practical-debugging-playbook)
2. [Process Management](#1-process-management)
3. [Systemd](#2-systemd-most-modern-distros)
4. [CPU & Load Debugging](#3-cpu--load-debugging)
5. [Memory Management](#4-memory-management)
6. [Disk & I/O Debugging](#5-disk--io-debugging)
7. [Networking](#6-networking-extremely-important-for-sre)
8. [Logs & Observability](#7-logs--observability)
9. [Performance Debugging (USE / RED)](#8-performance-debugging-the-sre-superpower)
10. [Bash & Shell Skills](#9-bash--shell-skills)
11. [Security & Permissions](#10-security--permissions)
12. [Containers](#11-containers-mandatory-for-modern-sre)
13. [Crash & Deep Debugging](#12-crash--deep-debugging)
14. [Boot Process](#13-boot-process)

---

## Practical Debugging Playbook

When prod breaks, ask, in order:

1. Is the process running?
2. Is the port listening?
3. Is CPU saturated?
4. Is memory exhausted?
5. Is disk full?
6. Are connections stuck?
7. Are there kernel errors?
8. Is DNS resolving?
9. Is the service reachable from another host?
10. What changed?

---

## 1. Process Management

Covered in depth in [Process Management & /proc](./process-management-proc): PID/PPID, zombie/orphan processes, daemons, `ps`/`top`/`htop`/`atop`/`pstree`, `nice`/`renice`, `kill`/`killall`/`pgrep`, and the `/proc/<pid>/` filesystem (`status`, `limits`, `fd`).

---

## 2. Systemd (Most Modern Distros)

You MUST understand:

- `systemctl status`
- `systemctl start/stop/restart`
- `journalctl -xe`
- `journalctl -u <service>`
- Unit files
- Service dependencies
- Restart policies
- Targets

---

## 3. CPU & Load Debugging

### 🔹 Load Average
What it actually means: **runnable + uninterruptible processes**.

### 🔹 Tools
`uptime`, `top`, `mpstat`, `vmstat`, `sar`, `pidstat`

### 🔹 CPU Concepts
- User vs system CPU
- iowait
- Context switching
- CPU stealing (in VMs)
- CPU throttling

---

## 4. Memory Management

### 🔹 Concepts
Virtual memory, paging, swapping, page cache, buffers, OOM killer

### 🔹 Tools
`free -m`, `vmstat`, `top`, `htop`, `/proc/meminfo`, `smem`, `pmap`

### 🔹 Debugging Memory Issues
- Detect memory leaks
- OOM logs (`dmesg`)
- Overcommit behavior

---

## 5. Disk & I/O Debugging

### 🔹 Concepts
IOPS, throughput, latency, queue depth, block devices

### 🔹 Tools
`iostat`, `iotop`, `vmstat`, `dstat`, `blktrace`, `lsblk`

### 🔹 Detect
- Disk saturation
- High iowait
- Filesystem corruption

> Full storage & filesystem deep dive: [Filesystem & Storage Playbook](./filesystem-storage-playbook)

---

## 6. Networking (Extremely Important for SRE)

### 🔹 Basics
TCP/IP model, 3-way handshake, DNS resolution, subnetting, routing tables

### 🔹 Tools
`ip a`, `ip route`, `ss -tulpn`, `netstat`, `tcpdump`, `ping`, `traceroute`, `dig`, `nslookup`, `curl`, `nc`

### 🔹 Debug Skills
- Port binding conflicts
- SYN backlog issues
- Connection resets
- Packet drops
- MTU issues

---

## 7. Logs & Observability

### 🔹 Log Locations
- `/var/log/syslog`
- `/var/log/messages`
- `/var/log/auth.log`
- Application logs

### 🔹 Commands
`tail -f`, `less`, `grep`, `awk`, `sed`, `journalctl`

### 🔹 dmesg
Kernel logs: OOM killer, disk failures, driver errors.

---

## 8. Performance Debugging (The SRE Superpower)

### The USE Method
- **U**tilization
- **S**aturation
- **E**rrors

### The RED Method
- **R**ate
- **E**rrors
- **D**uration

### 🔹 Advanced Tools
`strace`, `lsof`, `perf`, `sar`, `bpftrace`, eBPF basics

---

## 9. Bash & Shell Skills

### 🔹 Must Know
Pipes, redirection, subshells, environment variables, command substitution, exit codes, `set -euo pipefail`

### 🔹 Scripting Basics
Loops, conditionals, functions, debugging scripts (`set -x`)

---

## 10. Security & Permissions

### 🔹 SSH
Key-based auth, `sshd_config`, port forwarding

### 🔹 Firewalls
`iptables`, `nftables`, `ufw`, `firewalld`

### 🔹 SELinux / AppArmor
Modes, troubleshooting denials

> Permissions model (rwx, SUID/SGID, ACLs) is covered in [Filesystem & Storage Playbook](./filesystem-storage-playbook).

---

## 11. Containers (Mandatory for Modern SRE)

- Namespaces
- cgroups
- PID namespace
- Network namespace
- OverlayFS
- `docker ps`, `docker logs`, `docker inspect`, `docker exec`
- Container resource limits

---

## 12. Crash & Deep Debugging

- Core dumps
- `ulimit -c`
- `gdb`
- Kernel panic basics
- `kdump`

---

## 13. Boot Process

- BIOS vs UEFI
- GRUB
- Init systems
- Single-user mode
- Emergency mode

---

## Key Takeaways

- 💡 The 10-question Practical Debugging Playbook is the fastest triage sequence — run it top to bottom before diving deep anywhere.
- 🔥 USE (resource-first) and RED (service-first) are complementary, not competing — USE finds *what's* saturated, RED finds *what users feel*.
- ⚠️ Containers add a second layer of saturation (cgroup limits) that's invisible from host-level tools — always check `docker stats` / cgroup files separately.
- ✅ `/proc`, `strace`, `tcpdump`, `vmstat`, `iostat`, `systemctl`, `journalctl`, `top`, `ss` — if you're fluent in these nine, you can debug almost anything.

## See Also

- [Process Management & /proc](./process-management-proc)
- [Filesystem & Storage Playbook](./filesystem-storage-playbook)
- [Linux Kernel Fundamentals](./linux-kernel-fundamentals)
- [DevOps/SRE Interview Scenarios](./devops-sre-interview-scenarios)
- [Incident Response Mindset](./incident-response-mindset)
