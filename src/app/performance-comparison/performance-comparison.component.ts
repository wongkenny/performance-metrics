import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-performance-comparison',
  standalone: true,
  imports: [],
  templateUrl: './performance-comparison.component.html',
  styleUrl: './performance-comparison.component.scss'
})
export class PerformanceComparisonComponent {

  @ViewChild('goodFcpDemo') goodFcpDemo!: ElementRef;
  @ViewChild('badFcpDemo') badFcpDemo!: ElementRef;
  @ViewChild('goodLcpDemo') goodLcpDemo!: ElementRef;
  @ViewChild('badLcpDemo') badLcpDemo!: ElementRef;
  @ViewChild('goodInpDemo') goodInpDemo!: ElementRef;
  @ViewChild('badInpDemo') badInpDemo!: ElementRef;
  @ViewChild('goodClsDemo') goodClsDemo!: ElementRef;
  @ViewChild('badClsDemo') badClsDemo!: ElementRef;
  @ViewChild('goodTbtDemo') goodTbtDemo!: ElementRef;
  @ViewChild('badTbtDemo') badTbtDemo!: ElementRef;
  @ViewChild('goodTtfbDemo') goodTtfbDemo!: ElementRef;
  @ViewChild('badTtfbDemo') badTtfbDemo!: ElementRef;

  // FCP Demos
  showGoodFCP() {
    const demo = this.goodFcpDemo.nativeElement;
    demo.classList.add('loading');
    setTimeout(() => {
      demo.innerHTML = '<h1 style="color: #2ecc71; text-align: center;">Instant Content!</h1>';
      demo.classList.remove('loading');
    }, 100);
  }

  showBadFCP() {
    const demo = this.badFcpDemo.nativeElement;
    demo.classList.add('loading');
    demo.innerHTML = '<div class="loading-indicator"></div>';
    setTimeout(() => {
      demo.innerHTML = '<h1 style="color: #e74c3c; text-align: center;">Finally Loaded...</h1>';
      demo.classList.remove('loading');
    }, 3000);
  }

  // LCP Demos
  showGoodLCP() {
    const demo = this.goodLcpDemo.nativeElement.querySelector('.hero-image') as HTMLElement;
    demo.classList.add('loading');
    const img = new Image();
    img.src = 'https://picsum.photos/800/400';
    img.onload = () => {
      demo.style.background = `url(${img.src})`;
      demo.classList.add('loaded');
      demo.classList.remove('loading');
    };
  }

  showBadLCP() {
    const demo = this.badLcpDemo.nativeElement.querySelector('.hero-image') as HTMLElement;
    demo.classList.add('loading');
    demo.innerHTML = '<div class="loading-indicator"></div>';
    setTimeout(() => {
      const img = new Image();
      img.src = 'https://picsum.photos/2000/1000';
      img.onload = () => {
        demo.style.background = `url(${img.src})`;
        demo.classList.add('loaded');
        demo.classList.remove('loading');
      };
    }, 3000);
  }

  // INP Demos
  testGoodINP() {
    const element = this.goodInpDemo.nativeElement;
    element.classList.add('clicked');
    element.textContent = 'Clicked! (Fast Response)';
    setTimeout(() => {
      element.classList.remove('clicked');
      element.textContent = 'Click me!';
    }, 500);
  }

  testBadINP() {
    const element = this.badInpDemo.nativeElement;
    element.textContent = 'Processing...';
    const start = Date.now();
    while (Date.now() - start < 1000) {} // Blocking operation
    element.classList.add('clicked');
    element.textContent = 'Finally Responded!';
    setTimeout(() => {
      element.classList.remove('clicked');
      element.textContent = 'Click me! (Slow)';
    }, 500);
  }

  // CLS Demos
  testGoodCLS() {
    const demo = this.goodClsDemo.nativeElement;
    demo.innerHTML = `
      <div style="height: 400px; transition: all 0.3s ease;">
        <div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">
          <img src="https://picsum.photos/200/200" width="200" height="200" style="border-radius: 8px;">
          <p style="margin-top: 20px;">Content with proper spacing 👍</p>
        </div>
      </div>
    `;
  }

  testBadCLS() {
    const demo = this.badClsDemo.nativeElement;
    demo.innerHTML = '<p style="padding: 20px;">Initial content...</p>';
    setTimeout(() => {
      demo.innerHTML = `
        <div style="height: 400px; background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <img src="https://picsum.photos/400/400">
          <p style="margin-top: 20px;">Surprise! Content shifted everything! 😱</p>
          <div style="height: 100px; background: #e0e0e0; margin-top: 20px;"></div>
        </div>
      `;
    }, 1000);
  }

  // TBT Demos
  testGoodTBT() {
    const progressBar = this.goodTbtDemo.nativeElement;
    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        progressBar.style.width = i + '%';
        progressBar.style.background = '#2ecc71';
      }, i * 20);
    }
  }

  testBadTBT() {
    const progressBar = this.badTbtDemo.nativeElement;
    progressBar.style.background = '#e74c3c';
    const start = Date.now();
    while (Date.now() - start < 2000) {} // Heavy blocking operation
    progressBar.style.width = '100%';
  }

  // TTFB Demos
  testGoodTTFB() {
    const demo = this.goodTtfbDemo.nativeElement;
    demo.innerHTML = '<div class="loading-indicator"></div>';
    setTimeout(() => {
      demo.innerHTML = `
        <div style="text-align: center; color: #2ecc71;">
          <h3>Quick Response! ⚡</h3>
          <p>Server responded in 100ms</p>
        </div>
      `;
    }, 100);
  }

  testBadTTFB() {
    const demo = this.badTtfbDemo.nativeElement;
    demo.innerHTML = '<div class="loading-indicator"></div>';
    setTimeout(() => {
      demo.innerHTML = `
        <div style="text-align: center; color: #e74c3c;">
          <h3>Slow Response... 🐌</h3>
          <p>Server took 3000ms to respond</p>
        </div>
      `;
    }, 3000);
  }

}
