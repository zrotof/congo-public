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
        path: "grands-dossiers",
        loadComponent: () => import('./features/big-files-container/big-files-container.component')
    },
    {
        path: "**",
        redirectTo: "",
        pathMatch: "full"
    },
];
