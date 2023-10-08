import parsePrometheusTextFormat from "../../../src/util/prometheusParser/parsePrometheus";
import * as fs from "fs";
import * as path from "path";

describe('Parse prometheus', () => {
    it('should parse prometheus', () => {
        const prometheusMetrics = fs.readFileSync(path.join(__dirname, '../../Fixture/prometheus_metrics.txt'), 'utf8');
        const result = parsePrometheusTextFormat(prometheusMetrics);

        expect(result).toEqual([
            {
                "help": "A summary of the pause duration of garbage collection cycles.",
                "metrics": [
                    {
                        "count": "2.130309e+06",
                        "quantiles": {
                            "0": "1.207e-05",
                            "1": "0.000869156",
                            "0.25": "4.1467e-05",
                            "0.5": "7.5979e-05",
                            "0.75": "0.000145796"
                        },
                        "sum": "227.832268147"
                    }
                ],
                "name": "go_gc_duration_seconds",
                "type": "SUMMARY"
            },
            {
                "help": "Number of goroutines that currently exist.",
                "metrics": [
                    {
                        "value": "9"
                    }
                ],
                "name": "go_goroutines",
                "type": "GAUGE"
            },
            {
                "help": "Information about the Go environment.",
                "metrics": [
                    {
                        "labels": {
                            "version": "go1.17.3"
                        },
                        "value": "1"
                    }
                ],
                "name": "go_info",
                "type": "GAUGE"
            },
            {
                "help": "Number of bytes allocated and still in use.",
                "metrics": [
                    {
                        "value": "5.129328e+06"
                    }
                ],
                "name": "go_memstats_alloc_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Total number of bytes allocated, even if freed.",
                "metrics": [
                    {
                        "value": "3.317500233496e+12"
                    }
                ],
                "name": "go_memstats_alloc_bytes_total",
                "type": "COUNTER"
            },
            {
                "help": "Number of bytes used by the profiling bucket hash table.",
                "metrics": [
                    {
                        "value": "2.303599e+06"
                    }
                ],
                "name": "go_memstats_buck_hash_sys_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Total number of frees.",
                "metrics": [
                    {
                        "value": "2.1515787513e+10"
                    }
                ],
                "name": "go_memstats_frees_total",
                "type": "COUNTER"
            },
            {
                "help": "The fraction of this program's available CPU time used by the GC since the program started.",
                "metrics": [
                    {
                        "value": "7.800453708808021e-05"
                    }
                ],
                "name": "go_memstats_gc_cpu_fraction",
                "type": "GAUGE"
            },
            {
                "help": "Number of bytes used for garbage collection system metadata.",
                "metrics": [
                    {
                        "value": "5.301616e+06"
                    }
                ],
                "name": "go_memstats_gc_sys_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of heap bytes allocated and still in use.",
                "metrics": [
                    {
                        "value": "5.129328e+06"
                    }
                ],
                "name": "go_memstats_heap_alloc_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of heap bytes waiting to be used.",
                "metrics": [
                    {
                        "value": "1.916928e+07"
                    }
                ],
                "name": "go_memstats_heap_idle_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of heap bytes that are in use.",
                "metrics": [
                    {
                        "value": "7.929856e+06"
                    }
                ],
                "name": "go_memstats_heap_inuse_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of allocated objects.",
                "metrics": [
                    {
                        "value": "32962"
                    }
                ],
                "name": "go_memstats_heap_objects",
                "type": "GAUGE"
            },
            {
                "help": "Number of heap bytes released to OS.",
                "metrics": [
                    {
                        "value": "1.4491648e+07"
                    }
                ],
                "name": "go_memstats_heap_released_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of heap bytes obtained from system.",
                "metrics": [
                    {
                        "value": "2.7099136e+07"
                    }
                ],
                "name": "go_memstats_heap_sys_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of seconds since 1970 of last garbage collection.",
                "metrics": [
                    {
                        "value": "1.692287434468365e+09"
                    }
                ],
                "name": "go_memstats_last_gc_time_seconds",
                "type": "GAUGE"
            },
            {
                "help": "Total number of pointer lookups.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "go_memstats_lookups_total",
                "type": "COUNTER"
            },
            {
                "help": "Total number of mallocs.",
                "metrics": [
                    {
                        "value": "2.1515820475e+10"
                    }
                ],
                "name": "go_memstats_mallocs_total",
                "type": "COUNTER"
            },
            {
                "help": "Number of bytes in use by mcache structures.",
                "metrics": [
                    {
                        "value": "19200"
                    }
                ],
                "name": "go_memstats_mcache_inuse_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of bytes used for mcache structures obtained from system.",
                "metrics": [
                    {
                        "value": "32768"
                    }
                ],
                "name": "go_memstats_mcache_sys_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of bytes in use by mspan structures.",
                "metrics": [
                    {
                        "value": "226984"
                    }
                ],
                "name": "go_memstats_mspan_inuse_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of bytes used for mspan structures obtained from system.",
                "metrics": [
                    {
                        "value": "311296"
                    }
                ],
                "name": "go_memstats_mspan_sys_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of heap bytes when next garbage collection will take place.",
                "metrics": [
                    {
                        "value": "8.149504e+06"
                    }
                ],
                "name": "go_memstats_next_gc_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of bytes used for other system allocations.",
                "metrics": [
                    {
                        "value": "2.881577e+06"
                    }
                ],
                "name": "go_memstats_other_sys_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of bytes in use by the stack allocator.",
                "metrics": [
                    {
                        "value": "2.260992e+06"
                    }
                ],
                "name": "go_memstats_stack_inuse_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of bytes obtained from system for stack allocator.",
                "metrics": [
                    {
                        "value": "2.260992e+06"
                    }
                ],
                "name": "go_memstats_stack_sys_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of bytes obtained from system.",
                "metrics": [
                    {
                        "value": "4.0190984e+07"
                    }
                ],
                "name": "go_memstats_sys_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of OS threads created.",
                "metrics": [
                    {
                        "value": "40"
                    }
                ],
                "name": "go_threads",
                "type": "GAUGE"
            },
            {
                "help": "ARP entries by device",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "10"
                    }
                ],
                "name": "node_arp_entries",
                "type": "GAUGE"
            },
            {
                "help": "Node boot time, in unixtime.",
                "metrics": [
                    {
                        "value": "1.67785024e+09"
                    }
                ],
                "name": "node_boot_time_seconds",
                "type": "GAUGE"
            },
            {
                "help": "Total number of context switches.",
                "metrics": [
                    {
                        "value": "4.42750907219e+11"
                    }
                ],
                "name": "node_context_switches_total",
                "type": "COUNTER"
            },
            {
                "help": "Current throttle state of the cooling device",
                "metrics": [
                    {
                        "labels": {
                            "name": "0",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "1",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "10",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "11",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "12",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "13",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "14",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "15",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "16",
                            "type": "intel_powerclamp"
                        },
                        "value": "-1"
                    },
                    {
                        "labels": {
                            "name": "2",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "3",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "4",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "5",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "6",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "7",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "8",
                            "type": "Processor"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "name": "9",
                            "type": "Processor"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_cooling_device_cur_state",
                "type": "GAUGE"
            },
            {
                "help": "Maximum throttle state of the cooling device",
                "metrics": [
                    {
                        "labels": {
                            "name": "0",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "1",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "10",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "11",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "12",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "13",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "14",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "15",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "16",
                            "type": "intel_powerclamp"
                        },
                        "value": "50"
                    },
                    {
                        "labels": {
                            "name": "2",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "3",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "4",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "5",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "6",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "7",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "8",
                            "type": "Processor"
                        },
                        "value": "3"
                    },
                    {
                        "labels": {
                            "name": "9",
                            "type": "Processor"
                        },
                        "value": "3"
                    }
                ],
                "name": "node_cooling_device_max_state",
                "type": "GAUGE"
            },
            {
                "help": "Number of times this CPU core has been throttled.",
                "metrics": [
                    {
                        "labels": {
                            "core": "0",
                            "package": "0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "core": "12",
                            "package": "0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "core": "16",
                            "package": "0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "core": "20",
                            "package": "0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "core": "28",
                            "package": "0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "core": "29",
                            "package": "0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "core": "30",
                            "package": "0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "core": "31",
                            "package": "0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "core": "4",
                            "package": "0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "core": "8",
                            "package": "0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_cpu_core_throttles_total",
                "type": "COUNTER"
            },
            {
                "help": "Maximum cpu thread frequency in hertz.",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "1"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "10"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "11"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "12"
                        },
                        "value": "3.3e+09"
                    },
                    {
                        "labels": {
                            "cpu": "13"
                        },
                        "value": "3.3e+09"
                    },
                    {
                        "labels": {
                            "cpu": "14"
                        },
                        "value": "3.3e+09"
                    },
                    {
                        "labels": {
                            "cpu": "15"
                        },
                        "value": "3.3e+09"
                    },
                    {
                        "labels": {
                            "cpu": "2"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "3"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "4"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "5"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "6"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "7"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "8"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "9"
                        },
                        "value": "4.6e+09"
                    }
                ],
                "name": "node_cpu_frequency_max_hertz",
                "type": "GAUGE"
            },
            {
                "help": "Minimum cpu thread frequency in hertz.",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "1"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "10"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "11"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "12"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "13"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "14"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "15"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "2"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "3"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "4"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "5"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "6"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "7"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "8"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "9"
                        },
                        "value": "8e+08"
                    }
                ],
                "name": "node_cpu_frequency_min_hertz",
                "type": "GAUGE"
            },
            {
                "help": "Seconds the CPUs spent in guests (VMs) for each mode.",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "0",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "1",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "1",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "10",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "10",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "11",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "11",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "12",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "12",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "13",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "13",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "14",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "14",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "15",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "15",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "2",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "2",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "3",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "3",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "4",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "4",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "5",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "5",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "6",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "6",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "7",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "7",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "8",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "8",
                            "mode": "user"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "9",
                            "mode": "nice"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "9",
                            "mode": "user"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_cpu_guest_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "Number of times this CPU package has been throttled.",
                "metrics": [
                    {
                        "labels": {
                            "package": "0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_cpu_package_throttles_total",
                "type": "COUNTER"
            },
            {
                "help": "Current scaled CPU thread frequency in hertz.",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0"
                        },
                        "value": "1.356571e+09"
                    },
                    {
                        "labels": {
                            "cpu": "1"
                        },
                        "value": "1.494226e+09"
                    },
                    {
                        "labels": {
                            "cpu": "10"
                        },
                        "value": "1.200708e+09"
                    },
                    {
                        "labels": {
                            "cpu": "11"
                        },
                        "value": "1.373163e+09"
                    },
                    {
                        "labels": {
                            "cpu": "12"
                        },
                        "value": "1.003867e+09"
                    },
                    {
                        "labels": {
                            "cpu": "13"
                        },
                        "value": "1.117038e+09"
                    },
                    {
                        "labels": {
                            "cpu": "14"
                        },
                        "value": "1.032772e+09"
                    },
                    {
                        "labels": {
                            "cpu": "15"
                        },
                        "value": "1.091084e+09"
                    },
                    {
                        "labels": {
                            "cpu": "2"
                        },
                        "value": "1.158937e+09"
                    },
                    {
                        "labels": {
                            "cpu": "3"
                        },
                        "value": "1.563725e+09"
                    },
                    {
                        "labels": {
                            "cpu": "4"
                        },
                        "value": "1.567589e+09"
                    },
                    {
                        "labels": {
                            "cpu": "5"
                        },
                        "value": "1.199162e+09"
                    },
                    {
                        "labels": {
                            "cpu": "6"
                        },
                        "value": "1.454929e+09"
                    },
                    {
                        "labels": {
                            "cpu": "7"
                        },
                        "value": "1.488519e+09"
                    },
                    {
                        "labels": {
                            "cpu": "8"
                        },
                        "value": "1.52824e+09"
                    },
                    {
                        "labels": {
                            "cpu": "9"
                        },
                        "value": "1.33388e+09"
                    }
                ],
                "name": "node_cpu_scaling_frequency_hertz",
                "type": "GAUGE"
            },
            {
                "help": "Maximum scaled CPU thread frequency in hertz.",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "1"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "10"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "11"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "12"
                        },
                        "value": "3.3e+09"
                    },
                    {
                        "labels": {
                            "cpu": "13"
                        },
                        "value": "3.3e+09"
                    },
                    {
                        "labels": {
                            "cpu": "14"
                        },
                        "value": "3.3e+09"
                    },
                    {
                        "labels": {
                            "cpu": "15"
                        },
                        "value": "3.3e+09"
                    },
                    {
                        "labels": {
                            "cpu": "2"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "3"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "4"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "5"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "6"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "7"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "8"
                        },
                        "value": "4.6e+09"
                    },
                    {
                        "labels": {
                            "cpu": "9"
                        },
                        "value": "4.6e+09"
                    }
                ],
                "name": "node_cpu_scaling_frequency_max_hertz",
                "type": "GAUGE"
            },
            {
                "help": "Minimum scaled CPU thread frequency in hertz.",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "1"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "10"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "11"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "12"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "13"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "14"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "15"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "2"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "3"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "4"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "5"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "6"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "7"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "8"
                        },
                        "value": "8e+08"
                    },
                    {
                        "labels": {
                            "cpu": "9"
                        },
                        "value": "8e+08"
                    }
                ],
                "name": "node_cpu_scaling_frequency_min_hertz",
                "type": "GAUGE"
            },
            {
                "help": "Seconds the CPUs spent in each mode.",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0",
                            "mode": "idle"
                        },
                        "value": "1.225974893e+07"
                    },
                    {
                        "labels": {
                            "cpu": "0",
                            "mode": "iowait"
                        },
                        "value": "341261.32"
                    },
                    {
                        "labels": {
                            "cpu": "0",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "0",
                            "mode": "nice"
                        },
                        "value": "108.77"
                    },
                    {
                        "labels": {
                            "cpu": "0",
                            "mode": "softirq"
                        },
                        "value": "181.84"
                    },
                    {
                        "labels": {
                            "cpu": "0",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "0",
                            "mode": "system"
                        },
                        "value": "161950.76"
                    },
                    {
                        "labels": {
                            "cpu": "0",
                            "mode": "user"
                        },
                        "value": "1.5952833e+06"
                    },
                    {
                        "labels": {
                            "cpu": "1",
                            "mode": "idle"
                        },
                        "value": "1.401706038e+07"
                    },
                    {
                        "labels": {
                            "cpu": "1",
                            "mode": "iowait"
                        },
                        "value": "150310.55"
                    },
                    {
                        "labels": {
                            "cpu": "1",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "1",
                            "mode": "nice"
                        },
                        "value": "3.36"
                    },
                    {
                        "labels": {
                            "cpu": "1",
                            "mode": "softirq"
                        },
                        "value": "495.82"
                    },
                    {
                        "labels": {
                            "cpu": "1",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "1",
                            "mode": "system"
                        },
                        "value": "31743.38"
                    },
                    {
                        "labels": {
                            "cpu": "1",
                            "mode": "user"
                        },
                        "value": "217542.73"
                    },
                    {
                        "labels": {
                            "cpu": "10",
                            "mode": "idle"
                        },
                        "value": "1.133902705e+07"
                    },
                    {
                        "labels": {
                            "cpu": "10",
                            "mode": "iowait"
                        },
                        "value": "441733.28"
                    },
                    {
                        "labels": {
                            "cpu": "10",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "10",
                            "mode": "nice"
                        },
                        "value": "124"
                    },
                    {
                        "labels": {
                            "cpu": "10",
                            "mode": "softirq"
                        },
                        "value": "17.08"
                    },
                    {
                        "labels": {
                            "cpu": "10",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "10",
                            "mode": "system"
                        },
                        "value": "185017.74"
                    },
                    {
                        "labels": {
                            "cpu": "10",
                            "mode": "user"
                        },
                        "value": "2.39267274e+06"
                    },
                    {
                        "labels": {
                            "cpu": "11",
                            "mode": "idle"
                        },
                        "value": "1.400883462e+07"
                    },
                    {
                        "labels": {
                            "cpu": "11",
                            "mode": "iowait"
                        },
                        "value": "141508.74"
                    },
                    {
                        "labels": {
                            "cpu": "11",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "11",
                            "mode": "nice"
                        },
                        "value": "2.32"
                    },
                    {
                        "labels": {
                            "cpu": "11",
                            "mode": "softirq"
                        },
                        "value": "24616.43"
                    },
                    {
                        "labels": {
                            "cpu": "11",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "11",
                            "mode": "system"
                        },
                        "value": "29520.82"
                    },
                    {
                        "labels": {
                            "cpu": "11",
                            "mode": "user"
                        },
                        "value": "203850.8"
                    },
                    {
                        "labels": {
                            "cpu": "12",
                            "mode": "idle"
                        },
                        "value": "1.337454176e+07"
                    },
                    {
                        "labels": {
                            "cpu": "12",
                            "mode": "iowait"
                        },
                        "value": "466982.89"
                    },
                    {
                        "labels": {
                            "cpu": "12",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "12",
                            "mode": "nice"
                        },
                        "value": "1.12"
                    },
                    {
                        "labels": {
                            "cpu": "12",
                            "mode": "softirq"
                        },
                        "value": "15.12"
                    },
                    {
                        "labels": {
                            "cpu": "12",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "12",
                            "mode": "system"
                        },
                        "value": "102450.94"
                    },
                    {
                        "labels": {
                            "cpu": "12",
                            "mode": "user"
                        },
                        "value": "428927.86"
                    },
                    {
                        "labels": {
                            "cpu": "13",
                            "mode": "idle"
                        },
                        "value": "1.349354174e+07"
                    },
                    {
                        "labels": {
                            "cpu": "13",
                            "mode": "iowait"
                        },
                        "value": "417775.86"
                    },
                    {
                        "labels": {
                            "cpu": "13",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "13",
                            "mode": "nice"
                        },
                        "value": "0.54"
                    },
                    {
                        "labels": {
                            "cpu": "13",
                            "mode": "softirq"
                        },
                        "value": "13.94"
                    },
                    {
                        "labels": {
                            "cpu": "13",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "13",
                            "mode": "system"
                        },
                        "value": "87533.51"
                    },
                    {
                        "labels": {
                            "cpu": "13",
                            "mode": "user"
                        },
                        "value": "379553.98"
                    },
                    {
                        "labels": {
                            "cpu": "14",
                            "mode": "idle"
                        },
                        "value": "1.362393107e+07"
                    },
                    {
                        "labels": {
                            "cpu": "14",
                            "mode": "iowait"
                        },
                        "value": "339443.16"
                    },
                    {
                        "labels": {
                            "cpu": "14",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "14",
                            "mode": "nice"
                        },
                        "value": "0.54"
                    },
                    {
                        "labels": {
                            "cpu": "14",
                            "mode": "softirq"
                        },
                        "value": "11.78"
                    },
                    {
                        "labels": {
                            "cpu": "14",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "14",
                            "mode": "system"
                        },
                        "value": "77190.53"
                    },
                    {
                        "labels": {
                            "cpu": "14",
                            "mode": "user"
                        },
                        "value": "343068.86"
                    },
                    {
                        "labels": {
                            "cpu": "15",
                            "mode": "idle"
                        },
                        "value": "1.372739561e+07"
                    },
                    {
                        "labels": {
                            "cpu": "15",
                            "mode": "iowait"
                        },
                        "value": "282475.77"
                    },
                    {
                        "labels": {
                            "cpu": "15",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "15",
                            "mode": "nice"
                        },
                        "value": "0.17"
                    },
                    {
                        "labels": {
                            "cpu": "15",
                            "mode": "softirq"
                        },
                        "value": "10.71"
                    },
                    {
                        "labels": {
                            "cpu": "15",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "15",
                            "mode": "system"
                        },
                        "value": "69061.13"
                    },
                    {
                        "labels": {
                            "cpu": "15",
                            "mode": "user"
                        },
                        "value": "309534.7"
                    },
                    {
                        "labels": {
                            "cpu": "2",
                            "mode": "idle"
                        },
                        "value": "1.206574364e+07"
                    },
                    {
                        "labels": {
                            "cpu": "2",
                            "mode": "iowait"
                        },
                        "value": "380101.62"
                    },
                    {
                        "labels": {
                            "cpu": "2",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "2",
                            "mode": "nice"
                        },
                        "value": "152.36"
                    },
                    {
                        "labels": {
                            "cpu": "2",
                            "mode": "softirq"
                        },
                        "value": "24.6"
                    },
                    {
                        "labels": {
                            "cpu": "2",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "2",
                            "mode": "system"
                        },
                        "value": "176338.19"
                    },
                    {
                        "labels": {
                            "cpu": "2",
                            "mode": "user"
                        },
                        "value": "1.73621854e+06"
                    },
                    {
                        "labels": {
                            "cpu": "3",
                            "mode": "idle"
                        },
                        "value": "1.405706765e+07"
                    },
                    {
                        "labels": {
                            "cpu": "3",
                            "mode": "iowait"
                        },
                        "value": "131125.39"
                    },
                    {
                        "labels": {
                            "cpu": "3",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "3",
                            "mode": "nice"
                        },
                        "value": "2.06"
                    },
                    {
                        "labels": {
                            "cpu": "3",
                            "mode": "softirq"
                        },
                        "value": "32.1"
                    },
                    {
                        "labels": {
                            "cpu": "3",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "3",
                            "mode": "system"
                        },
                        "value": "28285.51"
                    },
                    {
                        "labels": {
                            "cpu": "3",
                            "mode": "user"
                        },
                        "value": "205418.99"
                    },
                    {
                        "labels": {
                            "cpu": "4",
                            "mode": "idle"
                        },
                        "value": "1.197487809e+07"
                    },
                    {
                        "labels": {
                            "cpu": "4",
                            "mode": "iowait"
                        },
                        "value": "417082.36"
                    },
                    {
                        "labels": {
                            "cpu": "4",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "4",
                            "mode": "nice"
                        },
                        "value": "123.14"
                    },
                    {
                        "labels": {
                            "cpu": "4",
                            "mode": "softirq"
                        },
                        "value": "46.45"
                    },
                    {
                        "labels": {
                            "cpu": "4",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "4",
                            "mode": "system"
                        },
                        "value": "183636.08"
                    },
                    {
                        "labels": {
                            "cpu": "4",
                            "mode": "user"
                        },
                        "value": "1.78183438e+06"
                    },
                    {
                        "labels": {
                            "cpu": "5",
                            "mode": "idle"
                        },
                        "value": "1.406731729e+07"
                    },
                    {
                        "labels": {
                            "cpu": "5",
                            "mode": "iowait"
                        },
                        "value": "130019.39"
                    },
                    {
                        "labels": {
                            "cpu": "5",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "5",
                            "mode": "nice"
                        },
                        "value": "1.7"
                    },
                    {
                        "labels": {
                            "cpu": "5",
                            "mode": "softirq"
                        },
                        "value": "16.56"
                    },
                    {
                        "labels": {
                            "cpu": "5",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "5",
                            "mode": "system"
                        },
                        "value": "26840.1"
                    },
                    {
                        "labels": {
                            "cpu": "5",
                            "mode": "user"
                        },
                        "value": "198939.03"
                    },
                    {
                        "labels": {
                            "cpu": "6",
                            "mode": "idle"
                        },
                        "value": "1.192946482e+07"
                    },
                    {
                        "labels": {
                            "cpu": "6",
                            "mode": "iowait"
                        },
                        "value": "446772.73"
                    },
                    {
                        "labels": {
                            "cpu": "6",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "6",
                            "mode": "nice"
                        },
                        "value": "139.51"
                    },
                    {
                        "labels": {
                            "cpu": "6",
                            "mode": "softirq"
                        },
                        "value": "18"
                    },
                    {
                        "labels": {
                            "cpu": "6",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "6",
                            "mode": "system"
                        },
                        "value": "187475.81"
                    },
                    {
                        "labels": {
                            "cpu": "6",
                            "mode": "user"
                        },
                        "value": "1.79336321e+06"
                    },
                    {
                        "labels": {
                            "cpu": "7",
                            "mode": "idle"
                        },
                        "value": "1.407033812e+07"
                    },
                    {
                        "labels": {
                            "cpu": "7",
                            "mode": "iowait"
                        },
                        "value": "132556.29"
                    },
                    {
                        "labels": {
                            "cpu": "7",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "7",
                            "mode": "nice"
                        },
                        "value": "1.94"
                    },
                    {
                        "labels": {
                            "cpu": "7",
                            "mode": "softirq"
                        },
                        "value": "11.5"
                    },
                    {
                        "labels": {
                            "cpu": "7",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "7",
                            "mode": "system"
                        },
                        "value": "26216.87"
                    },
                    {
                        "labels": {
                            "cpu": "7",
                            "mode": "user"
                        },
                        "value": "194665.06"
                    },
                    {
                        "labels": {
                            "cpu": "8",
                            "mode": "idle"
                        },
                        "value": "1.151870526e+07"
                    },
                    {
                        "labels": {
                            "cpu": "8",
                            "mode": "iowait"
                        },
                        "value": "393892.08"
                    },
                    {
                        "labels": {
                            "cpu": "8",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "8",
                            "mode": "nice"
                        },
                        "value": "114.86"
                    },
                    {
                        "labels": {
                            "cpu": "8",
                            "mode": "softirq"
                        },
                        "value": "18.03"
                    },
                    {
                        "labels": {
                            "cpu": "8",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "8",
                            "mode": "system"
                        },
                        "value": "182975.45"
                    },
                    {
                        "labels": {
                            "cpu": "8",
                            "mode": "user"
                        },
                        "value": "2.25754231e+06"
                    },
                    {
                        "labels": {
                            "cpu": "9",
                            "mode": "idle"
                        },
                        "value": "1.385888738e+07"
                    },
                    {
                        "labels": {
                            "cpu": "9",
                            "mode": "iowait"
                        },
                        "value": "92011.73"
                    },
                    {
                        "labels": {
                            "cpu": "9",
                            "mode": "irq"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "9",
                            "mode": "nice"
                        },
                        "value": "2.33"
                    },
                    {
                        "labels": {
                            "cpu": "9",
                            "mode": "softirq"
                        },
                        "value": "154143.86"
                    },
                    {
                        "labels": {
                            "cpu": "9",
                            "mode": "steal"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "9",
                            "mode": "system"
                        },
                        "value": "37293.17"
                    },
                    {
                        "labels": {
                            "cpu": "9",
                            "mode": "user"
                        },
                        "value": "258043.27"
                    }
                ],
                "name": "node_cpu_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "This is the total number of seconds spent by all discards.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "2030.748"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "2034.259"
                    }
                ],
                "name": "node_disk_discard_time_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "The total number of sectors discarded successfully.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "1.6723997672e+10"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "1.6789487616e+10"
                    }
                ],
                "name": "node_disk_discarded_sectors_total",
                "type": "COUNTER"
            },
            {
                "help": "The total number of discards completed successfully.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "3.617657e+06"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "3.617928e+06"
                    }
                ],
                "name": "node_disk_discards_completed_total",
                "type": "COUNTER"
            },
            {
                "help": "The total number of discards merged.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_disk_discards_merged_total",
                "type": "COUNTER"
            },
            {
                "help": "This is the total number of seconds spent by all flush requests.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "1.517431262e+06"
                    }
                ],
                "name": "node_disk_flush_requests_time_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "The total number of flush requests completed successfully",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "6.28902929e+08"
                    }
                ],
                "name": "node_disk_flush_requests_total",
                "type": "COUNTER"
            },
            {
                "help": "Info of /sys/block/<block_device>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0",
                            "major": "253",
                            "minor": "0"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1",
                            "major": "259",
                            "minor": "0"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_disk_info",
                "type": "GAUGE"
            },
            {
                "help": "The number of I/Os currently in progress.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_disk_io_now",
                "type": "GAUGE"
            },
            {
                "help": "Total seconds spent doing I/Os.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "1.484778844e+06"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "1.484309788e+06"
                    }
                ],
                "name": "node_disk_io_time_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "The weighted # of seconds spent doing I/Os.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "4.055556628e+06"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "112327.03600000001"
                    }
                ],
                "name": "node_disk_io_time_weighted_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "The total number of bytes read successfully.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "3.8317053674496e+13"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "3.831831043072e+13"
                    }
                ],
                "name": "node_disk_read_bytes_total",
                "type": "COUNTER"
            },
            {
                "help": "The total number of seconds spent by all reads.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "189951.34"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "186588.544"
                    }
                ],
                "name": "node_disk_read_time_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "The total number of reads completed successfully.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "6.34288912e+08"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "6.26008051e+08"
                    }
                ],
                "name": "node_disk_reads_completed_total",
                "type": "COUNTER"
            },
            {
                "help": "The total number of reads merged.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "8.493575e+06"
                    }
                ],
                "name": "node_disk_reads_merged_total",
                "type": "COUNTER"
            },
            {
                "help": "This is the total number of seconds spent by all writes.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "3.86357454e+06"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "2.701240265e+06"
                    }
                ],
                "name": "node_disk_write_time_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "The total number of writes completed successfully.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "1.2523886073e+10"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "5.164910569e+09"
                    }
                ],
                "name": "node_disk_writes_completed_total",
                "type": "COUNTER"
            },
            {
                "help": "The number of writes merged.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "8.584794363e+09"
                    }
                ],
                "name": "node_disk_writes_merged_total",
                "type": "COUNTER"
            },
            {
                "help": "The total number of bytes written successfully.",
                "metrics": [
                    {
                        "labels": {
                            "device": "dm-0"
                        },
                        "value": "7.95747899928576e+14"
                    },
                    {
                        "labels": {
                            "device": "nvme0n1"
                        },
                        "value": "7.9574982581248e+14"
                    }
                ],
                "name": "node_disk_written_bytes_total",
                "type": "COUNTER"
            },
            {
                "help": "A metric with a constant '1' value labeled by bios_date, bios_release, bios_vendor, bios_version, board_asset_tag, board_name, board_serial, board_vendor, board_version, chassis_asset_tag, chassis_serial, chassis_vendor, chassis_version, product_family, product_name, product_serial, product_sku, product_uuid, product_version, system_vendor if provided by DMI.",
                "metrics": [
                    {
                        "labels": {
                            "bios_date": "06/16/2022",
                            "bios_release": "5.25",
                            "bios_vendor": "American Megatrends International, LLC.",
                            "bios_version": "4.04",
                            "board_asset_tag": "",
                            "board_name": "H610M-ITX/ac",
                            "board_serial": "",
                            "board_vendor": "ASRock",
                            "board_version": "",
                            "chassis_asset_tag": "To Be Filled By O.E.M.",
                            "chassis_serial": "To Be Filled By O.E.M.",
                            "chassis_vendor": "To Be Filled By O.E.M.",
                            "chassis_version": "To Be Filled By O.E.M.",
                            "product_family": "To Be Filled By O.E.M.",
                            "product_name": "H610M-ITX/ac",
                            "product_serial": "To Be Filled By O.E.M.",
                            "product_sku": "To Be Filled By O.E.M.",
                            "product_uuid": "dc59a1a8-9299-0000-0000-000000000000",
                            "product_version": "To Be Filled By O.E.M.",
                            "system_vendor": "To Be Filled By O.E.M."
                        },
                        "value": "1"
                    }
                ],
                "name": "node_dmi_info",
                "type": "GAUGE"
            },
            {
                "help": "Bits of available entropy.",
                "metrics": [
                    {
                        "value": "256"
                    }
                ],
                "name": "node_entropy_available_bits",
                "type": "GAUGE"
            },
            {
                "help": "Bits of entropy pool.",
                "metrics": [
                    {
                        "value": "256"
                    }
                ],
                "name": "node_entropy_pool_size_bits",
                "type": "GAUGE"
            },
            {
                "help": "A metric with a constant '1' value labeled by version, revision, branch, and goversion from which node_exporter was built.",
                "metrics": [
                    {
                        "labels": {
                            "branch": "HEAD",
                            "goversion": "go1.17.3",
                            "revision": "a2321e7b940ddcff26873612bccdf7cd4c42b6b6",
                            "version": "1.3.1"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_exporter_build_info",
                "type": "GAUGE"
            },
            {
                "help": "File descriptor statistics: allocated.",
                "metrics": [
                    {
                        "value": "3712"
                    }
                ],
                "name": "node_filefd_allocated",
                "type": "GAUGE"
            },
            {
                "help": "File descriptor statistics: maximum.",
                "metrics": [
                    {
                        "value": "9.223372036854776e+18"
                    }
                ],
                "name": "node_filefd_maximum",
                "type": "GAUGE"
            },
            {
                "help": "Filesystem space available to non-root users in bytes.",
                "metrics": [
                    {
                        "labels": {
                            "device": "/dev/mapper/ubuntu--vg-ubuntu--lv",
                            "fstype": "ext4",
                            "mountpoint": "/"
                        },
                        "value": "3.69754886144e+11"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p1",
                            "fstype": "vfat",
                            "mountpoint": "/boot/efi"
                        },
                        "value": "1.118633984e+09"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p2",
                            "fstype": "ext4",
                            "mountpoint": "/boot"
                        },
                        "value": "1.650147328e+09"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run"
                        },
                        "value": "6.717366272e+09"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/lock"
                        },
                        "value": "5.24288e+06"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/snapd/ns"
                        },
                        "value": "6.717366272e+09"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/user/1001"
                        },
                        "value": "6.719504384e+09"
                    }
                ],
                "name": "node_filesystem_avail_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Whether an error occurred while getting statistics for the given device.",
                "metrics": [
                    {
                        "labels": {
                            "device": "/dev/mapper/ubuntu--vg-ubuntu--lv",
                            "fstype": "ext4",
                            "mountpoint": "/"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p1",
                            "fstype": "vfat",
                            "mountpoint": "/boot/efi"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p2",
                            "fstype": "ext4",
                            "mountpoint": "/boot"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/lock"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/snapd/ns"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/user/1001"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_filesystem_device_error",
                "type": "GAUGE"
            },
            {
                "help": "Filesystem total file nodes.",
                "metrics": [
                    {
                        "labels": {
                            "device": "/dev/mapper/ubuntu--vg-ubuntu--lv",
                            "fstype": "ext4",
                            "mountpoint": "/"
                        },
                        "value": "5.9768832e+07"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p1",
                            "fstype": "vfat",
                            "mountpoint": "/boot/efi"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p2",
                            "fstype": "ext4",
                            "mountpoint": "/boot"
                        },
                        "value": "131072"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run"
                        },
                        "value": "8.202525e+06"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/lock"
                        },
                        "value": "8.202525e+06"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/snapd/ns"
                        },
                        "value": "8.202525e+06"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/user/1001"
                        },
                        "value": "1.640505e+06"
                    }
                ],
                "name": "node_filesystem_files",
                "type": "GAUGE"
            },
            {
                "help": "Filesystem total free file nodes.",
                "metrics": [
                    {
                        "labels": {
                            "device": "/dev/mapper/ubuntu--vg-ubuntu--lv",
                            "fstype": "ext4",
                            "mountpoint": "/"
                        },
                        "value": "5.9129527e+07"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p1",
                            "fstype": "vfat",
                            "mountpoint": "/boot/efi"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p2",
                            "fstype": "ext4",
                            "mountpoint": "/boot"
                        },
                        "value": "130762"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run"
                        },
                        "value": "8.201424e+06"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/lock"
                        },
                        "value": "8.202522e+06"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/snapd/ns"
                        },
                        "value": "8.201424e+06"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/user/1001"
                        },
                        "value": "1.640477e+06"
                    }
                ],
                "name": "node_filesystem_files_free",
                "type": "GAUGE"
            },
            {
                "help": "Filesystem free space in bytes.",
                "metrics": [
                    {
                        "labels": {
                            "device": "/dev/mapper/ubuntu--vg-ubuntu--lv",
                            "fstype": "ext4",
                            "mountpoint": "/"
                        },
                        "value": "4.10031419392e+11"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p1",
                            "fstype": "vfat",
                            "mountpoint": "/boot/efi"
                        },
                        "value": "1.118633984e+09"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p2",
                            "fstype": "ext4",
                            "mountpoint": "/boot"
                        },
                        "value": "1.774297088e+09"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run"
                        },
                        "value": "6.717366272e+09"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/lock"
                        },
                        "value": "5.24288e+06"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/snapd/ns"
                        },
                        "value": "6.717366272e+09"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/user/1001"
                        },
                        "value": "6.719504384e+09"
                    }
                ],
                "name": "node_filesystem_free_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Filesystem read-only status.",
                "metrics": [
                    {
                        "labels": {
                            "device": "/dev/mapper/ubuntu--vg-ubuntu--lv",
                            "fstype": "ext4",
                            "mountpoint": "/"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p1",
                            "fstype": "vfat",
                            "mountpoint": "/boot/efi"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p2",
                            "fstype": "ext4",
                            "mountpoint": "/boot"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/lock"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/snapd/ns"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/user/1001"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_filesystem_readonly",
                "type": "GAUGE"
            },
            {
                "help": "Filesystem size in bytes.",
                "metrics": [
                    {
                        "labels": {
                            "device": "/dev/mapper/ubuntu--vg-ubuntu--lv",
                            "fstype": "ext4",
                            "mountpoint": "/"
                        },
                        "value": "9.63156860928e+11"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p1",
                            "fstype": "vfat",
                            "mountpoint": "/boot/efi"
                        },
                        "value": "1.124999168e+09"
                    },
                    {
                        "labels": {
                            "device": "/dev/nvme0n1p2",
                            "fstype": "ext4",
                            "mountpoint": "/boot"
                        },
                        "value": "2.040373248e+09"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run"
                        },
                        "value": "6.719512576e+09"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/lock"
                        },
                        "value": "5.24288e+06"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/snapd/ns"
                        },
                        "value": "6.719512576e+09"
                    },
                    {
                        "labels": {
                            "device": "tmpfs",
                            "fstype": "tmpfs",
                            "mountpoint": "/run/user/1001"
                        },
                        "value": "6.71950848e+09"
                    }
                ],
                "name": "node_filesystem_size_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Total number of forks.",
                "metrics": [
                    {
                        "value": "8.670745e+06"
                    }
                ],
                "name": "node_forks_total",
                "type": "COUNTER"
            },
            {
                "help": "Annotation metric for human-readable chip names",
                "metrics": [
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "chip_name": "nvme"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "chip_name": "coretemp"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "thermal_thermal_zone1",
                            "chip_name": "iwlwifi_1"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_hwmon_chip_names",
                "type": "GAUGE"
            },
            {
                "help": "Label for given chip and sensor",
                "metrics": [
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "label": "composite",
                            "sensor": "temp1"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "label": "sensor_1",
                            "sensor": "temp2"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "label": "sensor_2",
                            "sensor": "temp3"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "label": "core_0",
                            "sensor": "temp2"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "label": "core_12",
                            "sensor": "temp5"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "label": "core_16",
                            "sensor": "temp6"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "label": "core_20",
                            "sensor": "temp7"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "label": "core_28",
                            "sensor": "temp8"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "label": "core_29",
                            "sensor": "temp9"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "label": "core_30",
                            "sensor": "temp10"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "label": "core_31",
                            "sensor": "temp11"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "label": "core_4",
                            "sensor": "temp3"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "label": "core_8",
                            "sensor": "temp4"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "label": "package_id_0",
                            "sensor": "temp1"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_hwmon_sensor_label",
                "type": "GAUGE"
            },
            {
                "help": "Hardware sensor alarm status (temp)",
                "metrics": [
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "sensor": "temp1"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_hwmon_temp_alarm",
                "type": "GAUGE"
            },
            {
                "help": "Hardware monitor for temperature (input)",
                "metrics": [
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "sensor": "temp1"
                        },
                        "value": "55.85"
                    },
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "sensor": "temp2"
                        },
                        "value": "55.85"
                    },
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "sensor": "temp3"
                        },
                        "value": "74.85000000000001"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp1"
                        },
                        "value": "44"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp10"
                        },
                        "value": "40"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp11"
                        },
                        "value": "40"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp2"
                        },
                        "value": "40"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp3"
                        },
                        "value": "40"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp4"
                        },
                        "value": "41"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp5"
                        },
                        "value": "39"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp6"
                        },
                        "value": "42"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp7"
                        },
                        "value": "42"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp8"
                        },
                        "value": "40"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp9"
                        },
                        "value": "40"
                    }
                ],
                "name": "node_hwmon_temp_celsius",
                "type": "GAUGE"
            },
            {
                "help": "Hardware monitor for temperature (crit_alarm)",
                "metrics": [
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp1"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp10"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp11"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp2"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp3"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp4"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp5"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp7"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp8"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp9"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_hwmon_temp_crit_alarm_celsius",
                "type": "GAUGE"
            },
            {
                "help": "Hardware monitor for temperature (crit)",
                "metrics": [
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "sensor": "temp1"
                        },
                        "value": "84.85000000000001"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp1"
                        },
                        "value": "100"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp10"
                        },
                        "value": "100"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp11"
                        },
                        "value": "100"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp2"
                        },
                        "value": "100"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp3"
                        },
                        "value": "100"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp4"
                        },
                        "value": "100"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp5"
                        },
                        "value": "100"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp6"
                        },
                        "value": "100"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp7"
                        },
                        "value": "100"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp8"
                        },
                        "value": "100"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp9"
                        },
                        "value": "100"
                    }
                ],
                "name": "node_hwmon_temp_crit_celsius",
                "type": "GAUGE"
            },
            {
                "help": "Hardware monitor for temperature (max)",
                "metrics": [
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "sensor": "temp1"
                        },
                        "value": "81.85000000000001"
                    },
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "sensor": "temp2"
                        },
                        "value": "65261.85"
                    },
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "sensor": "temp3"
                        },
                        "value": "65261.85"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp1"
                        },
                        "value": "80"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp10"
                        },
                        "value": "80"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp11"
                        },
                        "value": "80"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp2"
                        },
                        "value": "80"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp3"
                        },
                        "value": "80"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp4"
                        },
                        "value": "80"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp5"
                        },
                        "value": "80"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp6"
                        },
                        "value": "80"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp7"
                        },
                        "value": "80"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp8"
                        },
                        "value": "80"
                    },
                    {
                        "labels": {
                            "chip": "platform_coretemp_0",
                            "sensor": "temp9"
                        },
                        "value": "80"
                    }
                ],
                "name": "node_hwmon_temp_max_celsius",
                "type": "GAUGE"
            },
            {
                "help": "Hardware monitor for temperature (min)",
                "metrics": [
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "sensor": "temp1"
                        },
                        "value": "-273.15000000000003"
                    },
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "sensor": "temp2"
                        },
                        "value": "-273.15000000000003"
                    },
                    {
                        "labels": {
                            "chip": "nvme_nvme0",
                            "sensor": "temp3"
                        },
                        "value": "-273.15000000000003"
                    }
                ],
                "name": "node_hwmon_temp_min_celsius",
                "type": "GAUGE"
            },
            {
                "help": "Total number of interrupts serviced.",
                "metrics": [
                    {
                        "value": "6.4839448219e+10"
                    }
                ],
                "name": "node_intr_total",
                "type": "COUNTER"
            },
            {
                "help": "1m load average.",
                "metrics": [
                    {
                        "value": "4.16"
                    }
                ],
                "name": "node_load1",
                "type": "GAUGE"
            },
            {
                "help": "15m load average.",
                "metrics": [
                    {
                        "value": "4.35"
                    }
                ],
                "name": "node_load15",
                "type": "GAUGE"
            },
            {
                "help": "5m load average.",
                "metrics": [
                    {
                        "value": "4.48"
                    }
                ],
                "name": "node_load5",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Active_anon_bytes.",
                "metrics": [
                    {
                        "value": "1.6444567552e+10"
                    }
                ],
                "name": "node_memory_Active_anon_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Active_bytes.",
                "metrics": [
                    {
                        "value": "1.7562763264e+10"
                    }
                ],
                "name": "node_memory_Active_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Active_file_bytes.",
                "metrics": [
                    {
                        "value": "1.118195712e+09"
                    }
                ],
                "name": "node_memory_Active_file_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field AnonHugePages_bytes.",
                "metrics": [
                    {
                        "value": "1.516240896e+09"
                    }
                ],
                "name": "node_memory_AnonHugePages_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field AnonPages_bytes.",
                "metrics": [
                    {
                        "value": "2.024605696e+10"
                    }
                ],
                "name": "node_memory_AnonPages_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Bounce_bytes.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_Bounce_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Buffers_bytes.",
                "metrics": [
                    {
                        "value": "8.00206848e+08"
                    }
                ],
                "name": "node_memory_Buffers_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Cached_bytes.",
                "metrics": [
                    {
                        "value": "4.1376063488e+10"
                    }
                ],
                "name": "node_memory_Cached_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field CommitLimit_bytes.",
                "metrics": [
                    {
                        "value": "4.2187472896e+10"
                    }
                ],
                "name": "node_memory_CommitLimit_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Committed_AS_bytes.",
                "metrics": [
                    {
                        "value": "3.1330902016e+10"
                    }
                ],
                "name": "node_memory_Committed_AS_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field DirectMap1G_bytes.",
                "metrics": [
                    {
                        "value": "7.516192768e+09"
                    }
                ],
                "name": "node_memory_DirectMap1G_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field DirectMap2M_bytes.",
                "metrics": [
                    {
                        "value": "6.0467183616e+10"
                    }
                ],
                "name": "node_memory_DirectMap2M_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field DirectMap4k_bytes.",
                "metrics": [
                    {
                        "value": "1.568104448e+09"
                    }
                ],
                "name": "node_memory_DirectMap4k_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Dirty_bytes.",
                "metrics": [
                    {
                        "value": "9.826304e+06"
                    }
                ],
                "name": "node_memory_Dirty_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field FileHugePages_bytes.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_FileHugePages_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field FilePmdMapped_bytes.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_FilePmdMapped_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field HardwareCorrupted_bytes.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_HardwareCorrupted_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field HugePages_Free.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_HugePages_Free",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field HugePages_Rsvd.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_HugePages_Rsvd",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field HugePages_Surp.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_HugePages_Surp",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field HugePages_Total.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_HugePages_Total",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Hugepagesize_bytes.",
                "metrics": [
                    {
                        "value": "2.097152e+06"
                    }
                ],
                "name": "node_memory_Hugepagesize_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Hugetlb_bytes.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_Hugetlb_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Inactive_anon_bytes.",
                "metrics": [
                    {
                        "value": "4.997500928e+09"
                    }
                ],
                "name": "node_memory_Inactive_anon_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Inactive_bytes.",
                "metrics": [
                    {
                        "value": "4.6041505792e+10"
                    }
                ],
                "name": "node_memory_Inactive_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Inactive_file_bytes.",
                "metrics": [
                    {
                        "value": "4.1044004864e+10"
                    }
                ],
                "name": "node_memory_Inactive_file_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field KReclaimable_bytes.",
                "metrics": [
                    {
                        "value": "2.268196864e+09"
                    }
                ],
                "name": "node_memory_KReclaimable_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field KernelStack_bytes.",
                "metrics": [
                    {
                        "value": "8.863744e+06"
                    }
                ],
                "name": "node_memory_KernelStack_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Mapped_bytes.",
                "metrics": [
                    {
                        "value": "2.79089152e+08"
                    }
                ],
                "name": "node_memory_Mapped_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field MemAvailable_bytes.",
                "metrics": [
                    {
                        "value": "4.4252725248e+10"
                    }
                ],
                "name": "node_memory_MemAvailable_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field MemFree_bytes.",
                "metrics": [
                    {
                        "value": "5.70167296e+08"
                    }
                ],
                "name": "node_memory_MemFree_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field MemTotal_bytes.",
                "metrics": [
                    {
                        "value": "6.7195088896e+10"
                    }
                ],
                "name": "node_memory_MemTotal_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Mlocked_bytes.",
                "metrics": [
                    {
                        "value": "2.8418048e+07"
                    }
                ],
                "name": "node_memory_Mlocked_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field NFS_Unstable_bytes.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_NFS_Unstable_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field PageTables_bytes.",
                "metrics": [
                    {
                        "value": "7.3801728e+07"
                    }
                ],
                "name": "node_memory_PageTables_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Percpu_bytes.",
                "metrics": [
                    {
                        "value": "1.3303808e+07"
                    }
                ],
                "name": "node_memory_Percpu_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field SReclaimable_bytes.",
                "metrics": [
                    {
                        "value": "2.268196864e+09"
                    }
                ],
                "name": "node_memory_SReclaimable_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field SUnreclaim_bytes.",
                "metrics": [
                    {
                        "value": "4.60804096e+08"
                    }
                ],
                "name": "node_memory_SUnreclaim_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field ShmemHugePages_bytes.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_ShmemHugePages_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field ShmemPmdMapped_bytes.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_ShmemPmdMapped_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Shmem_bytes.",
                "metrics": [
                    {
                        "value": "1.1759616e+07"
                    }
                ],
                "name": "node_memory_Shmem_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Slab_bytes.",
                "metrics": [
                    {
                        "value": "2.72900096e+09"
                    }
                ],
                "name": "node_memory_Slab_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field SwapCached_bytes.",
                "metrics": [
                    {
                        "value": "8.1866752e+07"
                    }
                ],
                "name": "node_memory_SwapCached_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field SwapFree_bytes.",
                "metrics": [
                    {
                        "value": "6.806765568e+09"
                    }
                ],
                "name": "node_memory_SwapFree_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field SwapTotal_bytes.",
                "metrics": [
                    {
                        "value": "8.589930496e+09"
                    }
                ],
                "name": "node_memory_SwapTotal_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Unevictable_bytes.",
                "metrics": [
                    {
                        "value": "3.8039552e+07"
                    }
                ],
                "name": "node_memory_Unevictable_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field VmallocChunk_bytes.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_VmallocChunk_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field VmallocTotal_bytes.",
                "metrics": [
                    {
                        "value": "3.5184372087808e+13"
                    }
                ],
                "name": "node_memory_VmallocTotal_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field VmallocUsed_bytes.",
                "metrics": [
                    {
                        "value": "3.9473152e+07"
                    }
                ],
                "name": "node_memory_VmallocUsed_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field WritebackTmp_bytes.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_memory_WritebackTmp_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Memory information field Writeback_bytes.",
                "metrics": [
                    {
                        "value": "102400"
                    }
                ],
                "name": "node_memory_Writeback_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Statistic Icmp6InErrors.",
                "metrics": [
                    {
                        "value": "33"
                    }
                ],
                "name": "node_netstat_Icmp6_InErrors",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic Icmp6InMsgs.",
                "metrics": [
                    {
                        "value": "761474"
                    }
                ],
                "name": "node_netstat_Icmp6_InMsgs",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic Icmp6OutMsgs.",
                "metrics": [
                    {
                        "value": "1.092856e+06"
                    }
                ],
                "name": "node_netstat_Icmp6_OutMsgs",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic IcmpInErrors.",
                "metrics": [
                    {
                        "value": "3495"
                    }
                ],
                "name": "node_netstat_Icmp_InErrors",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic IcmpInMsgs.",
                "metrics": [
                    {
                        "value": "13114"
                    }
                ],
                "name": "node_netstat_Icmp_InMsgs",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic IcmpOutMsgs.",
                "metrics": [
                    {
                        "value": "3410"
                    }
                ],
                "name": "node_netstat_Icmp_OutMsgs",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic Ip6InOctets.",
                "metrics": [
                    {
                        "value": "5.10148934495e+11"
                    }
                ],
                "name": "node_netstat_Ip6_InOctets",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic Ip6OutOctets.",
                "metrics": [
                    {
                        "value": "2.23888121177e+11"
                    }
                ],
                "name": "node_netstat_Ip6_OutOctets",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic IpExtInOctets.",
                "metrics": [
                    {
                        "value": "1.639279902213e+13"
                    }
                ],
                "name": "node_netstat_IpExt_InOctets",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic IpExtOutOctets.",
                "metrics": [
                    {
                        "value": "1.6148170061548e+13"
                    }
                ],
                "name": "node_netstat_IpExt_OutOctets",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic IpForwarding.",
                "metrics": [
                    {
                        "value": "2"
                    }
                ],
                "name": "node_netstat_Ip_Forwarding",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpExtListenDrops.",
                "metrics": [
                    {
                        "value": "15"
                    }
                ],
                "name": "node_netstat_TcpExt_ListenDrops",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpExtListenOverflows.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_TcpExt_ListenOverflows",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpExtSyncookiesFailed.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_TcpExt_SyncookiesFailed",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpExtSyncookiesRecv.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_TcpExt_SyncookiesRecv",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpExtSyncookiesSent.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_TcpExt_SyncookiesSent",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpExtTCPSynRetrans.",
                "metrics": [
                    {
                        "value": "46267"
                    }
                ],
                "name": "node_netstat_TcpExt_TCPSynRetrans",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpExtTCPTimeouts.",
                "metrics": [
                    {
                        "value": "1.55937e+06"
                    }
                ],
                "name": "node_netstat_TcpExt_TCPTimeouts",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpActiveOpens.",
                "metrics": [
                    {
                        "value": "3.053968e+06"
                    }
                ],
                "name": "node_netstat_Tcp_ActiveOpens",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpCurrEstab.",
                "metrics": [
                    {
                        "value": "116"
                    }
                ],
                "name": "node_netstat_Tcp_CurrEstab",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpInErrs.",
                "metrics": [
                    {
                        "value": "8747"
                    }
                ],
                "name": "node_netstat_Tcp_InErrs",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpInSegs.",
                "metrics": [
                    {
                        "value": "1.8750426245e+10"
                    }
                ],
                "name": "node_netstat_Tcp_InSegs",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpOutRsts.",
                "metrics": [
                    {
                        "value": "328192"
                    }
                ],
                "name": "node_netstat_Tcp_OutRsts",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpOutSegs.",
                "metrics": [
                    {
                        "value": "1.9353927304e+10"
                    }
                ],
                "name": "node_netstat_Tcp_OutSegs",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpPassiveOpens.",
                "metrics": [
                    {
                        "value": "2.4695839e+07"
                    }
                ],
                "name": "node_netstat_Tcp_PassiveOpens",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic TcpRetransSegs.",
                "metrics": [
                    {
                        "value": "1.691065e+07"
                    }
                ],
                "name": "node_netstat_Tcp_RetransSegs",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic Udp6InDatagrams.",
                "metrics": [
                    {
                        "value": "29683"
                    }
                ],
                "name": "node_netstat_Udp6_InDatagrams",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic Udp6InErrors.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_Udp6_InErrors",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic Udp6NoPorts.",
                "metrics": [
                    {
                        "value": "9"
                    }
                ],
                "name": "node_netstat_Udp6_NoPorts",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic Udp6OutDatagrams.",
                "metrics": [
                    {
                        "value": "29716"
                    }
                ],
                "name": "node_netstat_Udp6_OutDatagrams",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic Udp6RcvbufErrors.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_Udp6_RcvbufErrors",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic Udp6SndbufErrors.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_Udp6_SndbufErrors",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic UdpLite6InErrors.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_UdpLite6_InErrors",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic UdpLiteInErrors.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_UdpLite_InErrors",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic UdpInDatagrams.",
                "metrics": [
                    {
                        "value": "7.2613e+06"
                    }
                ],
                "name": "node_netstat_Udp_InDatagrams",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic UdpInErrors.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_Udp_InErrors",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic UdpNoPorts.",
                "metrics": [
                    {
                        "value": "357"
                    }
                ],
                "name": "node_netstat_Udp_NoPorts",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic UdpOutDatagrams.",
                "metrics": [
                    {
                        "value": "7.262571e+06"
                    }
                ],
                "name": "node_netstat_Udp_OutDatagrams",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic UdpRcvbufErrors.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_Udp_RcvbufErrors",
                "type": "UNTYPED"
            },
            {
                "help": "Statistic UdpSndbufErrors.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_netstat_Udp_SndbufErrors",
                "type": "UNTYPED"
            },
            {
                "help": "address_assign_type value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_address_assign_type",
                "type": "GAUGE"
            },
            {
                "help": "carrier value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_network_carrier",
                "type": "GAUGE"
            },
            {
                "help": "carrier_changes_total value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "16"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_carrier_changes_total",
                "type": "COUNTER"
            },
            {
                "help": "carrier_down_changes_total value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "8"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_carrier_down_changes_total",
                "type": "COUNTER"
            },
            {
                "help": "carrier_up_changes_total value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "8"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_carrier_up_changes_total",
                "type": "COUNTER"
            },
            {
                "help": "device_id value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_device_id",
                "type": "GAUGE"
            },
            {
                "help": "dormant value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_dormant",
                "type": "GAUGE"
            },
            {
                "help": "flags value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "4099"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "9"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "4098"
                    }
                ],
                "name": "node_network_flags",
                "type": "GAUGE"
            },
            {
                "help": "iface_id value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "2"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "3"
                    }
                ],
                "name": "node_network_iface_id",
                "type": "GAUGE"
            },
            {
                "help": "iface_link value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "2"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "3"
                    }
                ],
                "name": "node_network_iface_link",
                "type": "GAUGE"
            },
            {
                "help": "iface_link_mode value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_iface_link_mode",
                "type": "GAUGE"
            },
            {
                "help": "Non-numeric data from /sys/class/net/<iface>, value is always 1.",
                "metrics": [
                    {
                        "labels": {
                            "address": "00:00:00:00:00:00",
                            "broadcast": "00:00:00:00:00:00",
                            "device": "lo",
                            "duplex": "",
                            "ifalias": "",
                            "operstate": "unknown"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "address": "a8:a1:59:dc:99:92",
                            "broadcast": "ff:ff:ff:ff:ff:ff",
                            "device": "enp0s31f6",
                            "duplex": "full",
                            "ifalias": "",
                            "operstate": "up"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "address": "f0:b6:1e:a4:bb:22",
                            "broadcast": "ff:ff:ff:ff:ff:ff",
                            "device": "wlp2s0",
                            "duplex": "",
                            "ifalias": "",
                            "operstate": "down"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_network_info",
                "type": "GAUGE"
            },
            {
                "help": "mtu_bytes value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "1500"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "65536"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "1500"
                    }
                ],
                "name": "node_network_mtu_bytes",
                "type": "GAUGE"
            },
            {
                "help": "name_assign_type value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "4"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "2"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "4"
                    }
                ],
                "name": "node_network_name_assign_type",
                "type": "GAUGE"
            },
            {
                "help": "net_dev_group value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_net_dev_group",
                "type": "GAUGE"
            },
            {
                "help": "protocol_type value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "772"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_network_protocol_type",
                "type": "GAUGE"
            },
            {
                "help": "Network device statistic receive_bytes.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "1.7010015393325e+13"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "2.3592626249e+11"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_receive_bytes_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic receive_compressed.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_receive_compressed_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic receive_drop.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "8.801356e+06"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_receive_drop_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic receive_errs.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_receive_errs_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic receive_fifo.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_receive_fifo_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic receive_frame.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_receive_frame_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic receive_multicast.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "1.1149849e+07"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_receive_multicast_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic receive_packets.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "1.8818462833e+10"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "3.5323745e+07"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_receive_packets_total",
                "type": "COUNTER"
            },
            {
                "help": "speed_bytes value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "1.25e+08"
                    }
                ],
                "name": "node_network_speed_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Network device statistic transmit_bytes.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "1.6724099059184e+13"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "2.3592626249e+11"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_transmit_bytes_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic transmit_carrier.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_transmit_carrier_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic transmit_colls.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_transmit_colls_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic transmit_compressed.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_transmit_compressed_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic transmit_drop.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_transmit_drop_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic transmit_errs.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_transmit_errs_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic transmit_fifo.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_transmit_fifo_total",
                "type": "COUNTER"
            },
            {
                "help": "Network device statistic transmit_packets.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "1.9344099062e+10"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "3.5323745e+07"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_transmit_packets_total",
                "type": "COUNTER"
            },
            {
                "help": "transmit_queue_length value of /sys/class/net/<iface>.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "1000"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "1000"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "1000"
                    }
                ],
                "name": "node_network_transmit_queue_length",
                "type": "GAUGE"
            },
            {
                "help": "Value is 1 if operstate is 'up', 0 otherwise.",
                "metrics": [
                    {
                        "labels": {
                            "device": "enp0s31f6"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "device": "lo"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "device": "wlp2s0"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_network_up",
                "type": "GAUGE"
            },
            {
                "help": "Number of currently allocated flow entries for connection tracking.",
                "metrics": [
                    {
                        "value": "1302"
                    }
                ],
                "name": "node_nf_conntrack_entries",
                "type": "GAUGE"
            },
            {
                "help": "Maximum size of connection tracking table.",
                "metrics": [
                    {
                        "value": "262144"
                    }
                ],
                "name": "node_nf_conntrack_entries_limit",
                "type": "GAUGE"
            },
            {
                "help": "Non-numeric data from /sys/class/nvme/<device>, value is always 1.",
                "metrics": [
                    {
                        "labels": {
                            "device": "nvme0",
                            "firmware_revision": "5B2QGXA7",
                            "model": "Samsung SSD 980 PRO 1TB",
                            "serial": "S5GXNF0TC98821Z",
                            "state": "live"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_nvme_info",
                "type": "GAUGE"
            },
            {
                "help": "A metric with a constant '1' value labeled by build_id, id, id_like, image_id, image_version, name, pretty_name, variant, variant_id, version, version_codename, version_id.",
                "metrics": [
                    {
                        "labels": {
                            "build_id": "",
                            "id": "ubuntu",
                            "id_like": "debian",
                            "image_id": "",
                            "image_version": "",
                            "name": "Ubuntu",
                            "pretty_name": "Ubuntu 22.04.2 LTS",
                            "variant": "",
                            "variant_id": "",
                            "version": "22.04.2 LTS (Jammy Jellyfish)",
                            "version_codename": "jammy",
                            "version_id": "22.04"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_os_info",
                "type": "GAUGE"
            },
            {
                "help": "Metric containing the major.minor part of the OS version.",
                "metrics": [
                    {
                        "labels": {
                            "id": "ubuntu",
                            "id_like": "debian",
                            "name": "Ubuntu"
                        },
                        "value": "22.04"
                    }
                ],
                "name": "node_os_version",
                "type": "GAUGE"
            },
            {
                "help": "Total time in seconds that processes have waited for CPU time",
                "metrics": [
                    {
                        "value": "30766.503475999998"
                    }
                ],
                "name": "node_pressure_cpu_waiting_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "Total time in seconds no process could make progress due to IO congestion",
                "metrics": [
                    {
                        "value": "697649.103742"
                    }
                ],
                "name": "node_pressure_io_stalled_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "Total time in seconds that processes have waited due to IO congestion",
                "metrics": [
                    {
                        "value": "721700.814819"
                    }
                ],
                "name": "node_pressure_io_waiting_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "Total time in seconds no process could make progress due to memory congestion",
                "metrics": [
                    {
                        "value": "1237.181155"
                    }
                ],
                "name": "node_pressure_memory_stalled_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "Total time in seconds that processes have waited for memory",
                "metrics": [
                    {
                        "value": "1249.740271"
                    }
                ],
                "name": "node_pressure_memory_waiting_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "Number of processes blocked waiting for I/O to complete.",
                "metrics": [
                    {
                        "value": "1"
                    }
                ],
                "name": "node_procs_blocked",
                "type": "GAUGE"
            },
            {
                "help": "Number of processes in runnable state.",
                "metrics": [
                    {
                        "value": "20"
                    }
                ],
                "name": "node_procs_running",
                "type": "GAUGE"
            },
            {
                "help": "Current RAPL core value in joules",
                "metrics": [
                    {
                        "labels": {
                            "index": "0",
                            "path": "/sys/class/powercap/intel-rapl:0:0"
                        },
                        "value": "15742.510541"
                    }
                ],
                "name": "node_rapl_core_joules_total",
                "type": "COUNTER"
            },
            {
                "help": "Current RAPL package value in joules",
                "metrics": [
                    {
                        "labels": {
                            "index": "0",
                            "path": "/sys/class/powercap/intel-rapl:0"
                        },
                        "value": "225452.827929"
                    }
                ],
                "name": "node_rapl_package_joules_total",
                "type": "COUNTER"
            },
            {
                "help": "Current RAPL uncore value in joules",
                "metrics": [
                    {
                        "labels": {
                            "index": "0",
                            "path": "/sys/class/powercap/intel-rapl:0:1"
                        },
                        "value": "0.000549"
                    }
                ],
                "name": "node_rapl_uncore_joules_total",
                "type": "COUNTER"
            },
            {
                "help": "Number of seconds CPU spent running a process.",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0"
                        },
                        "value": "1.798299993929953e+06"
                    },
                    {
                        "labels": {
                            "cpu": "1"
                        },
                        "value": "250818.184938461"
                    },
                    {
                        "labels": {
                            "cpu": "10"
                        },
                        "value": "2.620819062198437e+06"
                    },
                    {
                        "labels": {
                            "cpu": "11"
                        },
                        "value": "237139.711828975"
                    },
                    {
                        "labels": {
                            "cpu": "12"
                        },
                        "value": "545632.189041681"
                    },
                    {
                        "labels": {
                            "cpu": "13"
                        },
                        "value": "480370.288328328"
                    },
                    {
                        "labels": {
                            "cpu": "14"
                        },
                        "value": "432074.107619371"
                    },
                    {
                        "labels": {
                            "cpu": "15"
                        },
                        "value": "388793.465168449"
                    },
                    {
                        "labels": {
                            "cpu": "2"
                        },
                        "value": "1.955060009655194e+06"
                    },
                    {
                        "labels": {
                            "cpu": "3"
                        },
                        "value": "234590.379315178"
                    },
                    {
                        "labels": {
                            "cpu": "4"
                        },
                        "value": "2.008516468629794e+06"
                    },
                    {
                        "labels": {
                            "cpu": "5"
                        },
                        "value": "226449.505906973"
                    },
                    {
                        "labels": {
                            "cpu": "6"
                        },
                        "value": "2.023893961077125e+06"
                    },
                    {
                        "labels": {
                            "cpu": "7"
                        },
                        "value": "221342.863806527"
                    },
                    {
                        "labels": {
                            "cpu": "8"
                        },
                        "value": "2.487714372170519e+06"
                    },
                    {
                        "labels": {
                            "cpu": "9"
                        },
                        "value": "320477.852015723"
                    }
                ],
                "name": "node_schedstat_running_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "Number of timeslices executed by CPU.",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0"
                        },
                        "value": "1.775673186e+10"
                    },
                    {
                        "labels": {
                            "cpu": "1"
                        },
                        "value": "8.555056415e+09"
                    },
                    {
                        "labels": {
                            "cpu": "10"
                        },
                        "value": "1.8587590714e+10"
                    },
                    {
                        "labels": {
                            "cpu": "11"
                        },
                        "value": "7.897845856e+09"
                    },
                    {
                        "labels": {
                            "cpu": "12"
                        },
                        "value": "1.7904401128e+10"
                    },
                    {
                        "labels": {
                            "cpu": "13"
                        },
                        "value": "1.6485447979e+10"
                    },
                    {
                        "labels": {
                            "cpu": "14"
                        },
                        "value": "1.5264405109e+10"
                    },
                    {
                        "labels": {
                            "cpu": "15"
                        },
                        "value": "1.4395334287e+10"
                    },
                    {
                        "labels": {
                            "cpu": "2"
                        },
                        "value": "1.854861944e+10"
                    },
                    {
                        "labels": {
                            "cpu": "3"
                        },
                        "value": "7.711925942e+09"
                    },
                    {
                        "labels": {
                            "cpu": "4"
                        },
                        "value": "1.9041255443e+10"
                    },
                    {
                        "labels": {
                            "cpu": "5"
                        },
                        "value": "7.2762034e+09"
                    },
                    {
                        "labels": {
                            "cpu": "6"
                        },
                        "value": "1.9342834415e+10"
                    },
                    {
                        "labels": {
                            "cpu": "7"
                        },
                        "value": "7.039152442e+09"
                    },
                    {
                        "labels": {
                            "cpu": "8"
                        },
                        "value": "1.8061821684e+10"
                    },
                    {
                        "labels": {
                            "cpu": "9"
                        },
                        "value": "9.901671366e+09"
                    }
                ],
                "name": "node_schedstat_timeslices_total",
                "type": "COUNTER"
            },
            {
                "help": "Number of seconds spent by processing waiting for this CPU.",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0"
                        },
                        "value": "10811.838856915"
                    },
                    {
                        "labels": {
                            "cpu": "1"
                        },
                        "value": "12173.743840959"
                    },
                    {
                        "labels": {
                            "cpu": "10"
                        },
                        "value": "10790.519834803"
                    },
                    {
                        "labels": {
                            "cpu": "11"
                        },
                        "value": "16987.37156164"
                    },
                    {
                        "labels": {
                            "cpu": "12"
                        },
                        "value": "17374.539314014"
                    },
                    {
                        "labels": {
                            "cpu": "13"
                        },
                        "value": "17165.937686954"
                    },
                    {
                        "labels": {
                            "cpu": "14"
                        },
                        "value": "17175.427588972"
                    },
                    {
                        "labels": {
                            "cpu": "15"
                        },
                        "value": "17662.689809214"
                    },
                    {
                        "labels": {
                            "cpu": "2"
                        },
                        "value": "10825.112554984"
                    },
                    {
                        "labels": {
                            "cpu": "3"
                        },
                        "value": "12056.311691827"
                    },
                    {
                        "labels": {
                            "cpu": "4"
                        },
                        "value": "10918.665244511"
                    },
                    {
                        "labels": {
                            "cpu": "5"
                        },
                        "value": "12000.836197187"
                    },
                    {
                        "labels": {
                            "cpu": "6"
                        },
                        "value": "11013.323271456"
                    },
                    {
                        "labels": {
                            "cpu": "7"
                        },
                        "value": "12242.586115768"
                    },
                    {
                        "labels": {
                            "cpu": "8"
                        },
                        "value": "10584.929146605"
                    },
                    {
                        "labels": {
                            "cpu": "9"
                        },
                        "value": "19402.339666998"
                    }
                ],
                "name": "node_schedstat_waiting_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "node_exporter: Duration of a collector scrape.",
                "metrics": [
                    {
                        "labels": {
                            "collector": "arp"
                        },
                        "value": "0.000660621"
                    },
                    {
                        "labels": {
                            "collector": "bcache"
                        },
                        "value": "0.000484803"
                    },
                    {
                        "labels": {
                            "collector": "bonding"
                        },
                        "value": "5.8208e-05"
                    },
                    {
                        "labels": {
                            "collector": "btrfs"
                        },
                        "value": "3.0892e-05"
                    },
                    {
                        "labels": {
                            "collector": "conntrack"
                        },
                        "value": "0.003553165"
                    },
                    {
                        "labels": {
                            "collector": "cpu"
                        },
                        "value": "0.006852648"
                    },
                    {
                        "labels": {
                            "collector": "cpufreq"
                        },
                        "value": "0.026472106"
                    },
                    {
                        "labels": {
                            "collector": "diskstats"
                        },
                        "value": "0.005307504"
                    },
                    {
                        "labels": {
                            "collector": "dmi"
                        },
                        "value": "5.3331e-05"
                    },
                    {
                        "labels": {
                            "collector": "edac"
                        },
                        "value": "6.0405e-05"
                    },
                    {
                        "labels": {
                            "collector": "entropy"
                        },
                        "value": "0.001854997"
                    },
                    {
                        "labels": {
                            "collector": "fibrechannel"
                        },
                        "value": "4.0476e-05"
                    },
                    {
                        "labels": {
                            "collector": "filefd"
                        },
                        "value": "0.003604725"
                    },
                    {
                        "labels": {
                            "collector": "filesystem"
                        },
                        "value": "0.001570099"
                    },
                    {
                        "labels": {
                            "collector": "hwmon"
                        },
                        "value": "0.010124129"
                    },
                    {
                        "labels": {
                            "collector": "infiniband"
                        },
                        "value": "8.1516e-05"
                    },
                    {
                        "labels": {
                            "collector": "ipvs"
                        },
                        "value": "5.089e-05"
                    },
                    {
                        "labels": {
                            "collector": "loadavg"
                        },
                        "value": "0.001629782"
                    },
                    {
                        "labels": {
                            "collector": "mdadm"
                        },
                        "value": "8.4567e-05"
                    },
                    {
                        "labels": {
                            "collector": "meminfo"
                        },
                        "value": "0.001167174"
                    },
                    {
                        "labels": {
                            "collector": "netclass"
                        },
                        "value": "0.007418659"
                    },
                    {
                        "labels": {
                            "collector": "netdev"
                        },
                        "value": "0.001741708"
                    },
                    {
                        "labels": {
                            "collector": "netstat"
                        },
                        "value": "0.005741013"
                    },
                    {
                        "labels": {
                            "collector": "nfs"
                        },
                        "value": "2.5095e-05"
                    },
                    {
                        "labels": {
                            "collector": "nfsd"
                        },
                        "value": "2.4587e-05"
                    },
                    {
                        "labels": {
                            "collector": "nvme"
                        },
                        "value": "0.000140004"
                    },
                    {
                        "labels": {
                            "collector": "os"
                        },
                        "value": "0.000567187"
                    },
                    {
                        "labels": {
                            "collector": "powersupplyclass"
                        },
                        "value": "2.7091e-05"
                    },
                    {
                        "labels": {
                            "collector": "pressure"
                        },
                        "value": "0.003455423"
                    },
                    {
                        "labels": {
                            "collector": "rapl"
                        },
                        "value": "0.003880365"
                    },
                    {
                        "labels": {
                            "collector": "schedstat"
                        },
                        "value": "0.000688107"
                    },
                    {
                        "labels": {
                            "collector": "sockstat"
                        },
                        "value": "0.003393788"
                    },
                    {
                        "labels": {
                            "collector": "softnet"
                        },
                        "value": "0.00178862"
                    },
                    {
                        "labels": {
                            "collector": "stat"
                        },
                        "value": "0.002726483"
                    },
                    {
                        "labels": {
                            "collector": "tapestats"
                        },
                        "value": "0.000116878"
                    },
                    {
                        "labels": {
                            "collector": "textfile"
                        },
                        "value": "0.003646625"
                    },
                    {
                        "labels": {
                            "collector": "thermal_zone"
                        },
                        "value": "0.004005966"
                    },
                    {
                        "labels": {
                            "collector": "time"
                        },
                        "value": "0.0007011"
                    },
                    {
                        "labels": {
                            "collector": "timex"
                        },
                        "value": "0.001211689"
                    },
                    {
                        "labels": {
                            "collector": "udp_queues"
                        },
                        "value": "0.001264211"
                    },
                    {
                        "labels": {
                            "collector": "uname"
                        },
                        "value": "3.5326e-05"
                    },
                    {
                        "labels": {
                            "collector": "vmstat"
                        },
                        "value": "0.003733469"
                    },
                    {
                        "labels": {
                            "collector": "xfs"
                        },
                        "value": "6.3525e-05"
                    },
                    {
                        "labels": {
                            "collector": "zfs"
                        },
                        "value": "6.6608e-05"
                    }
                ],
                "name": "node_scrape_collector_duration_seconds",
                "type": "GAUGE"
            },
            {
                "help": "node_exporter: Whether a collector succeeded.",
                "metrics": [
                    {
                        "labels": {
                            "collector": "arp"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "bcache"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "bonding"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "collector": "btrfs"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "conntrack"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "collector": "cpu"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "cpufreq"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "diskstats"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "dmi"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "edac"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "entropy"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "fibrechannel"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "collector": "filefd"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "filesystem"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "hwmon"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "infiniband"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "collector": "ipvs"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "collector": "loadavg"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "mdadm"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "meminfo"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "netclass"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "netdev"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "netstat"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "nfs"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "collector": "nfsd"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "collector": "nvme"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "os"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "powersupplyclass"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "pressure"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "rapl"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "schedstat"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "sockstat"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "softnet"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "stat"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "tapestats"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "collector": "textfile"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "thermal_zone"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "time"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "timex"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "udp_queues"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "uname"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "vmstat"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "xfs"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "collector": "zfs"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_scrape_collector_success",
                "type": "GAUGE"
            },
            {
                "help": "Number of FRAG6 sockets in state inuse.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_sockstat_FRAG6_inuse",
                "type": "GAUGE"
            },
            {
                "help": "Number of FRAG6 sockets in state memory.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_sockstat_FRAG6_memory",
                "type": "GAUGE"
            },
            {
                "help": "Number of FRAG sockets in state inuse.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_sockstat_FRAG_inuse",
                "type": "GAUGE"
            },
            {
                "help": "Number of FRAG sockets in state memory.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_sockstat_FRAG_memory",
                "type": "GAUGE"
            },
            {
                "help": "Number of RAW6 sockets in state inuse.",
                "metrics": [
                    {
                        "value": "1"
                    }
                ],
                "name": "node_sockstat_RAW6_inuse",
                "type": "GAUGE"
            },
            {
                "help": "Number of RAW sockets in state inuse.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_sockstat_RAW_inuse",
                "type": "GAUGE"
            },
            {
                "help": "Number of TCP6 sockets in state inuse.",
                "metrics": [
                    {
                        "value": "33"
                    }
                ],
                "name": "node_sockstat_TCP6_inuse",
                "type": "GAUGE"
            },
            {
                "help": "Number of TCP sockets in state alloc.",
                "metrics": [
                    {
                        "value": "140"
                    }
                ],
                "name": "node_sockstat_TCP_alloc",
                "type": "GAUGE"
            },
            {
                "help": "Number of TCP sockets in state inuse.",
                "metrics": [
                    {
                        "value": "107"
                    }
                ],
                "name": "node_sockstat_TCP_inuse",
                "type": "GAUGE"
            },
            {
                "help": "Number of TCP sockets in state mem.",
                "metrics": [
                    {
                        "value": "231"
                    }
                ],
                "name": "node_sockstat_TCP_mem",
                "type": "GAUGE"
            },
            {
                "help": "Number of TCP sockets in state mem_bytes.",
                "metrics": [
                    {
                        "value": "946176"
                    }
                ],
                "name": "node_sockstat_TCP_mem_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of TCP sockets in state orphan.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_sockstat_TCP_orphan",
                "type": "GAUGE"
            },
            {
                "help": "Number of TCP sockets in state tw.",
                "metrics": [
                    {
                        "value": "395"
                    }
                ],
                "name": "node_sockstat_TCP_tw",
                "type": "GAUGE"
            },
            {
                "help": "Number of UDP6 sockets in state inuse.",
                "metrics": [
                    {
                        "value": "2"
                    }
                ],
                "name": "node_sockstat_UDP6_inuse",
                "type": "GAUGE"
            },
            {
                "help": "Number of UDPLITE6 sockets in state inuse.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_sockstat_UDPLITE6_inuse",
                "type": "GAUGE"
            },
            {
                "help": "Number of UDPLITE sockets in state inuse.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_sockstat_UDPLITE_inuse",
                "type": "GAUGE"
            },
            {
                "help": "Number of UDP sockets in state inuse.",
                "metrics": [
                    {
                        "value": "3"
                    }
                ],
                "name": "node_sockstat_UDP_inuse",
                "type": "GAUGE"
            },
            {
                "help": "Number of UDP sockets in state mem.",
                "metrics": [
                    {
                        "value": "2"
                    }
                ],
                "name": "node_sockstat_UDP_mem",
                "type": "GAUGE"
            },
            {
                "help": "Number of UDP sockets in state mem_bytes.",
                "metrics": [
                    {
                        "value": "8192"
                    }
                ],
                "name": "node_sockstat_UDP_mem_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Number of IPv4 sockets in use.",
                "metrics": [
                    {
                        "value": "346"
                    }
                ],
                "name": "node_sockstat_sockets_used",
                "type": "GAUGE"
            },
            {
                "help": "Number of dropped packets",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "1"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "10"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "11"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "12"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "13"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "14"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "15"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "2"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "3"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "4"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "5"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "7"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "8"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "9"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_softnet_dropped_total",
                "type": "COUNTER"
            },
            {
                "help": "Number of processed packets",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0"
                        },
                        "value": "4.147447e+06"
                    },
                    {
                        "labels": {
                            "cpu": "1"
                        },
                        "value": "627303"
                    },
                    {
                        "labels": {
                            "cpu": "10"
                        },
                        "value": "3.966186e+06"
                    },
                    {
                        "labels": {
                            "cpu": "11"
                        },
                        "value": "3.439408364e+09"
                    },
                    {
                        "labels": {
                            "cpu": "12"
                        },
                        "value": "2.048177e+06"
                    },
                    {
                        "labels": {
                            "cpu": "13"
                        },
                        "value": "1.810146e+06"
                    },
                    {
                        "labels": {
                            "cpu": "14"
                        },
                        "value": "1.786788e+06"
                    },
                    {
                        "labels": {
                            "cpu": "15"
                        },
                        "value": "1.393149e+06"
                    },
                    {
                        "labels": {
                            "cpu": "2"
                        },
                        "value": "3.699512e+06"
                    },
                    {
                        "labels": {
                            "cpu": "3"
                        },
                        "value": "623932"
                    },
                    {
                        "labels": {
                            "cpu": "4"
                        },
                        "value": "3.897209e+06"
                    },
                    {
                        "labels": {
                            "cpu": "5"
                        },
                        "value": "478018"
                    },
                    {
                        "labels": {
                            "cpu": "6"
                        },
                        "value": "4.061054e+06"
                    },
                    {
                        "labels": {
                            "cpu": "7"
                        },
                        "value": "467776"
                    },
                    {
                        "labels": {
                            "cpu": "8"
                        },
                        "value": "4.618572e+06"
                    },
                    {
                        "labels": {
                            "cpu": "9"
                        },
                        "value": "2.448005631e+09"
                    }
                ],
                "name": "node_softnet_processed_total",
                "type": "COUNTER"
            },
            {
                "help": "Number of times processing packets ran out of quota",
                "metrics": [
                    {
                        "labels": {
                            "cpu": "0"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "1"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "10"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "11"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "12"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "13"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "14"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "15"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "2"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "3"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "4"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "5"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "6"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "7"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "8"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cpu": "9"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_softnet_times_squeezed_total",
                "type": "COUNTER"
            },
            {
                "help": "1 if there was an error opening or reading a file, 0 otherwise",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_textfile_scrape_error",
                "type": "GAUGE"
            },
            {
                "help": "Zone temperature in Celsius",
                "metrics": [
                    {
                        "labels": {
                            "type": "x86_pkg_temp",
                            "zone": "0"
                        },
                        "value": "44"
                    }
                ],
                "name": "node_thermal_zone_temp",
                "type": "GAUGE"
            },
            {
                "help": "Available clocksources read from '/sys/devices/system/clocksource'.",
                "metrics": [
                    {
                        "labels": {
                            "clocksource": "acpi_pm",
                            "device": "0"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "clocksource": "hpet",
                            "device": "0"
                        },
                        "value": "1"
                    },
                    {
                        "labels": {
                            "clocksource": "tsc",
                            "device": "0"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_time_clocksource_available_info",
                "type": "GAUGE"
            },
            {
                "help": "Current clocksource read from '/sys/devices/system/clocksource'.",
                "metrics": [
                    {
                        "labels": {
                            "clocksource": "tsc",
                            "device": "0"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_time_clocksource_current_info",
                "type": "GAUGE"
            },
            {
                "help": "System time in seconds since epoch (1970).",
                "metrics": [
                    {
                        "value": "1.692287441837473e+09"
                    }
                ],
                "name": "node_time_seconds",
                "type": "GAUGE"
            },
            {
                "help": "System time zone offset in seconds.",
                "metrics": [
                    {
                        "labels": {
                            "time_zone": "UTC"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_time_zone_offset_seconds",
                "type": "GAUGE"
            },
            {
                "help": "Estimated error in seconds.",
                "metrics": [
                    {
                        "value": "0.000978"
                    }
                ],
                "name": "node_timex_estimated_error_seconds",
                "type": "GAUGE"
            },
            {
                "help": "Local clock frequency adjustment.",
                "metrics": [
                    {
                        "value": "1.00003195993042"
                    }
                ],
                "name": "node_timex_frequency_adjustment_ratio",
                "type": "GAUGE"
            },
            {
                "help": "Phase-locked loop time constant.",
                "metrics": [
                    {
                        "value": "4"
                    }
                ],
                "name": "node_timex_loop_time_constant",
                "type": "GAUGE"
            },
            {
                "help": "Maximum error in seconds.",
                "metrics": [
                    {
                        "value": "0.07462"
                    }
                ],
                "name": "node_timex_maxerror_seconds",
                "type": "GAUGE"
            },
            {
                "help": "Time offset in between local system and reference clock.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_timex_offset_seconds",
                "type": "GAUGE"
            },
            {
                "help": "Pulse per second count of calibration intervals.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_timex_pps_calibration_total",
                "type": "COUNTER"
            },
            {
                "help": "Pulse per second count of calibration errors.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_timex_pps_error_total",
                "type": "COUNTER"
            },
            {
                "help": "Pulse per second frequency.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_timex_pps_frequency_hertz",
                "type": "GAUGE"
            },
            {
                "help": "Pulse per second jitter.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_timex_pps_jitter_seconds",
                "type": "GAUGE"
            },
            {
                "help": "Pulse per second count of jitter limit exceeded events.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_timex_pps_jitter_total",
                "type": "COUNTER"
            },
            {
                "help": "Pulse per second interval duration.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_timex_pps_shift_seconds",
                "type": "GAUGE"
            },
            {
                "help": "Pulse per second count of stability limit exceeded events.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_timex_pps_stability_exceeded_total",
                "type": "COUNTER"
            },
            {
                "help": "Pulse per second stability, average of recent frequency changes.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_timex_pps_stability_hertz",
                "type": "GAUGE"
            },
            {
                "help": "Value of the status array bits.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_timex_status",
                "type": "GAUGE"
            },
            {
                "help": "Is clock synchronized to a reliable server (1 = yes, 0 = no).",
                "metrics": [
                    {
                        "value": "1"
                    }
                ],
                "name": "node_timex_sync_status",
                "type": "GAUGE"
            },
            {
                "help": "International Atomic Time (TAI) offset.",
                "metrics": [
                    {
                        "value": "37"
                    }
                ],
                "name": "node_timex_tai_offset_seconds",
                "type": "GAUGE"
            },
            {
                "help": "Seconds between clock ticks.",
                "metrics": [
                    {
                        "value": "0.01"
                    }
                ],
                "name": "node_timex_tick_seconds",
                "type": "GAUGE"
            },
            {
                "help": "Number of allocated memory in the kernel for UDP datagrams in bytes.",
                "metrics": [
                    {
                        "labels": {
                            "ip": "v4",
                            "queue": "rx"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "ip": "v4",
                            "queue": "tx"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "ip": "v6",
                            "queue": "rx"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "ip": "v6",
                            "queue": "tx"
                        },
                        "value": "0"
                    }
                ],
                "name": "node_udp_queues",
                "type": "GAUGE"
            },
            {
                "help": "Labeled system information as provided by the uname system call.",
                "metrics": [
                    {
                        "labels": {
                            "domainname": "(none)",
                            "machine": "x86_64",
                            "nodename": "pipocas",
                            "release": "5.15.0-67-generic",
                            "sysname": "Linux",
                            "version": "#74-Ubuntu SMP Wed Feb 22 14:14:39 UTC 2023"
                        },
                        "value": "1"
                    }
                ],
                "name": "node_uname_info",
                "type": "GAUGE"
            },
            {
                "help": "/proc/vmstat information field oom_kill.",
                "metrics": [
                    {
                        "value": "0"
                    }
                ],
                "name": "node_vmstat_oom_kill",
                "type": "UNTYPED"
            },
            {
                "help": "/proc/vmstat information field pgfault.",
                "metrics": [
                    {
                        "value": "1.3573040562e+10"
                    }
                ],
                "name": "node_vmstat_pgfault",
                "type": "UNTYPED"
            },
            {
                "help": "/proc/vmstat information field pgmajfault.",
                "metrics": [
                    {
                        "value": "3.109964e+06"
                    }
                ],
                "name": "node_vmstat_pgmajfault",
                "type": "UNTYPED"
            },
            {
                "help": "/proc/vmstat information field pgpgin.",
                "metrics": [
                    {
                        "value": "3.7420464089e+10"
                    }
                ],
                "name": "node_vmstat_pgpgin",
                "type": "UNTYPED"
            },
            {
                "help": "/proc/vmstat information field pgpgout.",
                "metrics": [
                    {
                        "value": "7.77099439274e+11"
                    }
                ],
                "name": "node_vmstat_pgpgout",
                "type": "UNTYPED"
            },
            {
                "help": "/proc/vmstat information field pswpin.",
                "metrics": [
                    {
                        "value": "6.566038e+06"
                    }
                ],
                "name": "node_vmstat_pswpin",
                "type": "UNTYPED"
            },
            {
                "help": "/proc/vmstat information field pswpout.",
                "metrics": [
                    {
                        "value": "9.920556e+06"
                    }
                ],
                "name": "node_vmstat_pswpout",
                "type": "UNTYPED"
            },
            {
                "help": "Total user and system CPU time spent in seconds.",
                "metrics": [
                    {
                        "value": "54628.99"
                    }
                ],
                "name": "process_cpu_seconds_total",
                "type": "COUNTER"
            },
            {
                "help": "Maximum number of open file descriptors.",
                "metrics": [
                    {
                        "value": "4096"
                    }
                ],
                "name": "process_max_fds",
                "type": "GAUGE"
            },
            {
                "help": "Number of open file descriptors.",
                "metrics": [
                    {
                        "value": "10"
                    }
                ],
                "name": "process_open_fds",
                "type": "GAUGE"
            },
            {
                "help": "Resident memory size in bytes.",
                "metrics": [
                    {
                        "value": "1.9214336e+07"
                    }
                ],
                "name": "process_resident_memory_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Start time of the process since unix epoch in seconds.",
                "metrics": [
                    {
                        "value": "1.68355924899e+09"
                    }
                ],
                "name": "process_start_time_seconds",
                "type": "GAUGE"
            },
            {
                "help": "Virtual memory size in bytes.",
                "metrics": [
                    {
                        "value": "7.38267136e+08"
                    }
                ],
                "name": "process_virtual_memory_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Maximum amount of virtual memory available in bytes.",
                "metrics": [
                    {
                        "value": "1.8446744073709552e+19"
                    }
                ],
                "name": "process_virtual_memory_max_bytes",
                "type": "GAUGE"
            },
            {
                "help": "Total number of internal errors encountered by the promhttp metric handler.",
                "metrics": [
                    {
                        "labels": {
                            "cause": "encoding"
                        },
                        "value": "0"
                    },
                    {
                        "labels": {
                            "cause": "gathering"
                        },
                        "value": "0"
                    }
                ],
                "name": "promhttp_metric_handler_errors_total",
                "type": "COUNTER"
            },
            {
                "help": "Current number of scrapes being served.",
                "metrics": [
                    {
                        "value": "1"
                    }
                ],
                "name": "promhttp_metric_handler_requests_in_flight",
                "type": "GAUGE"
            },
            {
                "help": "Total number of scrapes by HTTP status code.",
                "metrics": [
                    {
                        "labels": {
                            "code": "200"
                        },
                        "value": "799487"
                    },
                    {
                        "labels": {
                            "code": "500"
                        },
                        "value": "0"
                    }
                ],
                "name": "promhttp_metric_handler_requests_total",
                "type": "COUNTER"
            }
        ])
    });
});