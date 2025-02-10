import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PerformanceMetrics, PerformanceMonitoringService } from '../service/performance.service';

@Component({
  selector: 'app-performance-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance-dashboard.component.html',
  styleUrl: './performance-dashboard.component.scss'
})
export class PerformanceDashboardComponent {
  metrics!: PerformanceMetrics;
  resourceTimings: PerformanceResourceTiming[] = [];
  navigationTiming: PerformanceNavigationTiming | null = null;
  snapshot: PerformanceMetrics | null = null;
  showResourceTimings = true;
  showNavigationTiming = true;

  constructor(private performanceService: PerformanceMonitoringService) {}

  ngOnInit() {
    this.performanceService.metrics$.subscribe(metrics => {
      this.metrics = metrics;
    });

    this.resourceTimings = this.performanceService.collectResourceTimings();
    this.navigationTiming = this.performanceService.collectNavigationTiming();
  }

  isGoodMetric(key: string, value: number | null): boolean {
    if (value === null) return false;
    const thresholds = {
      FCP: 1800,  // 1.8s
      LCP: 2500,  // 2.5s
      CLS: 0.1,   // 0.1
      TTFB: 800,  // 800ms
      INP: 200,   // 200ms
      TBT: 200    // 200ms
    };
    return value <= thresholds[key as keyof typeof thresholds];
  }

  isBadMetric(key: string, value: number | null): boolean {
    if (value === null) return false;
    return !this.isGoodMetric(key, value);
  }

  getMetricStatus(key: string, value: number | null): string {
    if (value === null) return 'Not Available';
    return this.isGoodMetric(key, value) ? 'Good' : 'Needs Improvement';
  }

  formatMetricValue(key: string, value: number | null): string {
    if (value === null) return 'N/A';
    if (key === 'CLS') return value.toFixed(3);
    return `${value.toFixed(0)}ms`;
  }

  getMetricDescription(key: string): string {
    const descriptions = {
      FCP: 'Time until the first content is painted',
      LCP: 'Time until the largest content is painted',
      CLS: 'Cumulative score of unexpected layout shifts',
      TTFB: 'Time until the first byte is received',
      INP: 'Overall interaction responsiveness',
      TBT: 'Total time the main thread was blocked'
    };
    return descriptions[key as keyof typeof descriptions] || '';
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  getNavigationMetrics(): { name: string; value: number }[] {
    if (!this.navigationTiming) return [];
    
    return [
      { 
        name: 'DNS Lookup', 
        value: this.navigationTiming.domainLookupEnd - this.navigationTiming.domainLookupStart 
      },
      { 
        name: 'Connection Time', 
        value: this.navigationTiming.connectEnd - this.navigationTiming.connectStart 
      },
      { 
        name: 'Server Response', 
        value: this.navigationTiming.responseEnd - this.navigationTiming.responseStart 
      },
      { 
        name: 'DOM Processing', 
        value: this.navigationTiming.domComplete - this.navigationTiming.domInteractive 
      },
      { 
        name: 'Page Load', 
        value: this.navigationTiming.loadEventEnd - this.navigationTiming.startTime 
      }
    ]
  }

  takeSnapshot() {
    this.snapshot = this.performanceService.getCurrentMetrics();
  }
}
