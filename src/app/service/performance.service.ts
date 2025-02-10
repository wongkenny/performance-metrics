// performance-monitoring.service.ts
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PerformanceMetrics {
  FCP: number | null;
  LCP: number | null;
  CLS: number | null;
  TTFB: number | null;
  INP: number | null;
  TBT: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitoringService {
  private metricsSubject = new BehaviorSubject<PerformanceMetrics>({
    FCP: null,
    LCP: null,
    CLS: null,
    TTFB: null,
    INP: null,
    TBT: null
  });

  metrics$ = this.metricsSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.initializeMetrics();
    }
  }

  private initializeMetrics(): void {
    if (!this.isBrowser) return;

    // FCP
    if ('PerformanceObserver' in window) {
      const paintObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          this.updateMetric('FCP', fcpEntry.startTime);
        }
      });

      try {
        paintObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.error('Paint observation failed:', e);
      }

      // LCP
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          this.updateMetric('LCP', lastEntry.startTime);
        }
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.error('LCP observation failed:', e);
      }

      // CLS
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            this.updateMetric('CLS', clsValue);
          }
        }
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.error('CLS observation failed:', e);
      }

      // TBT
      const tbtObserver = new PerformanceObserver((entryList) => {
        let totalBlockingTime = 0;
        for (const entry of entryList.getEntries()) {
          const blockingTime = (entry as any).duration - 50;
          if (blockingTime > 0) {
            totalBlockingTime += blockingTime;
            this.updateMetric('TBT', totalBlockingTime);
          }
        }
      });

      try {
        tbtObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.error('TBT observation failed:', e);
      }
    }

    // TTFB
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.updateMetric('TTFB', navigation.responseStart);
        }
      });
    }
  }

  private updateMetric(metric: keyof PerformanceMetrics, value: number): void {
    const currentMetrics = this.metricsSubject.value;
    this.metricsSubject.next({
      ...currentMetrics,
      [metric]: value
    });
  }

  getCurrentMetrics(): PerformanceMetrics {
    return this.metricsSubject.value;
  }

  collectResourceTimings(): PerformanceResourceTiming[] {
    if (!this.isBrowser) return [];
    return performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  }

  collectNavigationTiming(): PerformanceNavigationTiming | null {
    if (!this.isBrowser) return null;
    const navEntry = performance.getEntriesByType('navigation')[0];
    return navEntry as PerformanceNavigationTiming;
  }
}