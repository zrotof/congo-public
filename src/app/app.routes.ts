import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./features/challenge/challenge.component')
    },
    {
        path: "biographie",
        loadComponent: () => import('./features/biography-container/biography-container.component')
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full"
    },
];
