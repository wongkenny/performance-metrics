import { Routes } from '@angular/router';
import { PerformanceComparisonComponent } from './performance-comparison/performance-comparison.component';
import { PerformanceDashboardComponent } from './performance-dashboard/performance-dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', component: PerformanceDashboardComponent },
    { path: 'comparison', component: PerformanceComparisonComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
