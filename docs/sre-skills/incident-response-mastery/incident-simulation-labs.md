---
title: "Incident Simulation Labs"
description: "10 timed production incident simulations plus 6 hands-on labs — CPU saturation, disk-full, OOM kills, SYN backlog exhaustion, cgroup throttling, DNS breakage, and more."
sidebar_position: 4
tags: [sre, linux, simulation, chaos-engineering, incident-response]
---

## How To Use This Pack

For each incident:

1. Read only the **Alert**.
2. Start a 30-minute timer.
3. Investigate.
4. Identify:
   - Symptom
   - Root cause
   - Immediate mitigation
   - Long-term fix
5. Write a 5-minute postmortem.

## Table of Contents

1. [API Latency Spiking](#-incident-1--api-latency-spiking)
2. [Server Down — But Ping Works](#-incident-2--server-down--but-ping-works)
3. [Disk 100% — But df Shows Free Space](#-incident-3--disk-100--but-df-shows-free-space)
4. [High Load But Low CPU](#-incident-4--high-load-but-low-cpu)
5. [Out Of Memory Kill](#-incident-5--out-of-memory-kill)
6. [Connections Timing Out Randomly](#-incident-6--connections-timing-out-randomly)
7. [Container Is Slow But Host Is Fine](#-incident-7--container-is-slow-but-host-is-fine)
8. [DNS Is Broken](#-incident-8--dns-is-broken)
9. [Too Many Open Files](#-incident-9--too-many-open-files)
10. [System Won't Boot Properly](#-incident-10--system-wont-boot-properly)
11. [Bonus: The Full Chaos Day](#-bonus-the-full-chaos-day)
12. [Additional Hands-On Labs](#-additional-hands-on-labs)

---

## 🧨 INCIDENT 1 — "API Latency Spiking"

### 🚨 Alert
Latency p95 jumped from 40ms → 3s. CPU at 95%. Users reporting slowness.

### 🖥 Setup (Cause It)
```bash
yes > /dev/null &
yes > /dev/null &
yes > /dev/null &
```

### 🔎 What You Should Check
- `top`
- `uptime`
- `mpstat`
- `pidstat`
- `ps aux --sort=-%cpu`

### 🧠 What You're Expected To Discover
- CPU saturation
- Run queue backlog
- Possibly a noisy neighbor process

### 🎯 Skills Tested
- Load average understanding
- User vs system CPU
- Process prioritization (`nice`, `renice`)
- Killing safely

---

## 🧨 INCIDENT 2 — "Server Down — But Ping Works"

### 🚨 Alert
App is unreachable. Ping works. Port 443 times out.

### 🖥 Setup
```bash
systemctl stop nginx
```
Or simulate a firewall block:
```bash
iptables -A INPUT -p tcp --dport 443 -j DROP
```

### 🔎 Investigate With
- `ss -tulpn`
- `systemctl status`
- `journalctl -xe`
- `iptables -L`
- `tcpdump -i any port 443`

### 🧠 Expected Discovery
Service not listening, OR firewall silently dropping packets.

### 🎯 Skills Tested
- Port binding
- Packet visibility
- Service dependency awareness

---

## 🧨 INCIDENT 3 — "Disk 100% — But df Shows Free Space"

### 🚨 Alert
App cannot write logs. Error: "No space left on device". `df -h` shows 40% free.

### 🖥 Setup
Open and delete a file while still writing:
```bash
tail -f /var/log/syslog > bigfile.log &
rm bigfile.log
```

### 🔎 Investigate
- `df -h`
- `lsof | grep deleted`
- `/proc/<pid>/fd`

### 🧠 Expected Discovery
A deleted file is still held open by a process.

### 🎯 Skills Tested
- File descriptor leaks
- Linux inode behavior
- Disk debugging beyond `df`

---

## 🧨 INCIDENT 4 — "High Load But Low CPU"

### 🚨 Alert
Load average = 15. CPU usage only 20%.

### 🖥 Setup
Simulate disk wait:
```bash
dd if=/dev/zero of=bigfile bs=1M count=5000 oflag=dsync
```

### 🔎 Investigate
- `vmstat 1`
- `iostat -x`
- `top` (check iowait)
- `pidstat -d`

### 🧠 Expected Discovery
High I/O wait. Processes stuck in uninterruptible sleep (D state).

### 🎯 Skills Tested
- Load average meaning
- iowait analysis
- Disk bottleneck detection

---

## 🧨 INCIDENT 5 — "Out Of Memory Kill"

### 🚨 Alert
App randomly restarting. Kernel logs show crash.

### 🖥 Setup
```bash
stress --vm 2 --vm-bytes 2G
```

### 🔎 Investigate
- `dmesg`
- `journalctl`
- `/proc/meminfo`
- `free -m`

### 🧠 Expected Discovery
OOM Killer terminated the process.

### 🎯 Skills Tested
- Memory pressure detection
- OOM log reading
- Swap analysis
- Overcommit behavior

---

## 🧨 INCIDENT 6 — "Connections Timing Out Randomly"

### 🚨 Alert
Intermittent 502 errors. Connections hang 30 seconds.

### 🖥 Setup
Simulate SYN backlog exhaustion:
```bash
hping3 -S -p 80 --flood <server_ip>
```
Or open many connections:
```bash
for i in {1..10000}; do nc <server_ip> 80 & done
```

### 🔎 Investigate
- `ss -s`
- `netstat -an | grep SYN`
- `tcpdump`
- `/proc/sys/net/ipv4/tcp_max_syn_backlog`

### 🧠 Expected Discovery
Connection queue saturation.

### 🎯 Skills Tested
- TCP handshake knowledge
- Backlog tuning
- SYN flood basics

---

## 🧨 INCIDENT 7 — "Container Is Slow But Host Is Fine"

### 🚨 Alert
Container CPU 100%. Host CPU 40%.

### 🖥 Setup
Limit container CPU:
```bash
docker run --cpus=0.5 nginx
```

### 🔎 Investigate
- `docker stats`
- `docker inspect`
- `cat /sys/fs/cgroup/*`

### 🧠 Expected Discovery
cgroup CPU throttling.

### 🎯 Skills Tested
- cgroups
- Resource isolation
- Container vs host debugging

---

## 🧨 INCIDENT 8 — "DNS Is Broken"

### 🚨 Alert
Service cannot reach the database by hostname. IP works fine.

### 🖥 Setup
Break `/etc/resolv.conf`.

### 🔎 Investigate
- `dig`
- `nslookup`
- `cat /etc/resolv.conf`
- `strace curl example.com`

### 🧠 Expected Discovery
DNS resolution misconfiguration.

---

## 🧨 INCIDENT 9 — "Too Many Open Files"

### 🚨 Alert
Error: "Too many open files"

### 🖥 Setup
```bash
ulimit -n 50
```
Then run a connection-heavy app.

### 🔎 Investigate
- `ulimit -a`
- `/proc/<pid>/limits`
- `lsof`
- `/etc/security/limits.conf`

### 🧠 Expected Discovery
File descriptor exhaustion.

---

## 🧨 INCIDENT 10 — "System Won't Boot Properly"

### 🚨 Alert
Instance stuck in emergency mode.

### Causes To Simulate
- Corrupt `/etc/fstab`
- Fill root disk
- Remove a critical system file (VM only)

### 🔎 Investigate
- Single-user mode
- `journalctl -xb`
- `mount -a`

### 🎯 Skills Tested
- Boot process knowledge
- Recovery under pressure

---

## 🔥 Bonus: The "Full Chaos Day"

Simultaneously:

- Fill disk
- Create CPU stress
- Break DNS
- Limit file descriptors

Then debug under time pressure.

---

## 🧪 Additional Hands-On Labs

These labs mirror the incidents above but are structured as discrete practice exercises — run each on a disposable VM (EC2, local VM, or WSL) in order to build intuition.

### Lab 1 — Find the CPU Killer
**Goal**: Identify which process is consuming CPU and why.
```bash
yes > /dev/null &
yes > /dev/null &
yes > /dev/null &
```
**Tasks**: find top CPU process → identify PID/parent → reduce impact without killing immediately → stop it safely.
```bash
top
ps aux --sort=-%cpu | head
pstree -p
renice 10 -p <PID>
kill -15 <PID>
```
💡 **SRE Insight**: High CPU ≠ crash. First contain impact, then fix.

### Lab 2 — Memory Leak Simulation
**Goal**: Detect abnormal memory consumption.
```bash
python3 -c "a=[]; [a.append('A'*10**6) for _ in range(5000)]"
```
```bash
top
ps aux --sort=-%mem | head
cat /proc/<PID>/status | grep Vm
```
💡 **SRE Insight**: Always confirm memory usage from `/proc`, not just `top`.

### Lab 3 — File Descriptor Leak
**Goal**: Detect "Too many open files" condition.
```bash
while true; do cat /dev/null > tempfile_$RANDOM; done
```
```bash
pgrep -fl cat
ls /proc/<PID>/fd | wc -l
cat /proc/<PID>/limits
```
💡 **SRE Insight**: FD exhaustion is a very common production outage cause.

### Lab 4 — Zombie Process Investigation
**Goal**: Identify zombie processes and their parent.
```bash
bash -c 'sleep 1 & exit'
```
```bash
ps aux | grep Z
pstree -p
```
💡 **SRE Insight**: You fix zombies by fixing the parent, not the zombie.

### Lab 5 — Unkillable Process (I/O Wait)
**Goal**: Understand why some processes won't die.
```bash
dd if=/dev/zero of=bigfile bs=1M count=5000
```
```bash
ps -o pid,state,cmd -p <PID>
kill -15 <PID>
kill -9 <PID>
```
💡 **SRE Insight**: State `D` → waiting on kernel I/O → not killable.

### Lab 6 — Full Production Debug Simulation
**Scenario**: "Service is slow, CPU low, users complaining."
```bash
pgrep -fl service
top -p <PID>
cat /proc/<PID>/status
ls /proc/<PID>/fd | wc -l
cat /proc/<PID>/limits
pstree -p <PID>
```
**What the interviewer wants**: you systematically rule out CPU, memory, FD exhaustion, process tree issues, and resource limits — in that order.

---

## 🧠 What Senior SREs Do Differently

They:

- Check saturation first
- Look at queues
- Validate assumptions with data
- Avoid random restarts
- Think in bottlenecks

## 🏁 If You Can Confidently Solve All 10

You are operating at:

- Strong mid-level SRE
- Possibly senior, depending on speed and clarity

## Key Takeaways

- 💡 Always read only the alert first — resist the urge to peek at the "expected discovery" before investigating.
- 🔥 Time-box each incident to 30 minutes to simulate real production pressure.
- ⚠️ The same symptom (e.g., "slow, CPU low") can map to I/O wait, FD exhaustion, or dependency latency — verify with evidence, don't assume.
- ✅ Always write the 5-minute postmortem — it's where the actual learning compounds.

## See Also

- [Incident Response Mindset](./incident-response-mindset) — the thought process to apply while running these labs
- [Process Management & /proc](./process-management-proc) — command reference for zombie/FD/CPU labs
- [Filesystem & Storage Playbook](./filesystem-storage-playbook) — deep dive for the disk-full and inode incidents
- [DevOps/SRE Interview Scenarios](./devops-sre-interview-scenarios) — interview-style versions of these same incidents
