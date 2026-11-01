# 🔬 Reverse engineering and binaries

**For:** people who want to understand compiled programs, memory bugs and malware.
**Prerequisites:** C basics and some assembly helps; [Start here](start-here.md).

## 1. Foundations

- The binary and assembly modules of [pwn.college](https://pwn.college/) teach how programs run on the CPU.
- Read through [Awesome Reversing](https://github.com/HACKE-RC/awesome-reversing) to pick a course or book.

## 2. Static analysis

- Open simple crackme-style programs in [Ghidra](https://ghidra-sre.org/) and follow the decompiled code.
- Try the same binary in [Cutter](https://cutter.re/) or [radare2](https://www.radare.org/) to learn a second tool.

## 3. Dynamic analysis

- Step through Windows programs with [x64dbg](https://x64dbg.com/).
- Debug Linux binaries with GDB plus [pwndbg](https://github.com/pwndbg/pwndbg).
- Hook functions in running processes with [Frida](https://frida.re/).

## 4. Memory corruption

- Work through [Exploit Education](https://exploit.education/): Nebula, then Phoenix, then Fusion.
- Automate exploitation of CTF binaries with [pwntools](https://github.com/Gallopsled/pwntools).
- For kernel-level research, see [Linux Kernel Exploitation](https://github.com/xairy/linux-kernel-exploitation).

## 5. Malware analysis (in an isolated VM)

- Triage samples with [capa](https://github.com/mandiant/capa) to see what they are capable of.
- Write detection rules with [YARA](https://virustotal.github.io/yara/) and learn from [Awesome YARA](https://github.com/pedramamini/awesome-yara).
- Understand persistence with [Awesome Malware Persistence](https://github.com/Karneades/awesome-malware-persistence) and unpacking with [Awesome Executable Packing](https://github.com/packing-box/awesome-executable-packing).

> Always analyze malware in an isolated, disposable VM with no access to your network or personal data.
