import { Routes } from '@angular/router';
import { CounterComponent } from './pages/counter/counter.component';
import { MePerdonas } from './pages/meperdonas/page/meperdonas.component';
import { SubirArchivo } from './pages/prediccion/subirArchivo/subirArchivo.component';

export const routes: Routes = [

    {
        path: '',
        component: MePerdonas
    },
    {
        path: 'contador',
        component: CounterComponent
    },
    {
        path: 'prediccion',
        component:SubirArchivo
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'),
        children: [
            {
                path: 'trending',
                loadComponent: () => import('./gifs/pages/trending-page/trending-page.component')
            },
            {
                path: 'search',
                loadComponent: () => import('./gifs/pages/search-page/search-page.component'),
            },                    
            {
                path:'history/:q',
                loadComponent: () => import('./gifs/pages/gif-history/gif-history.component')
            }
        ]
    }
];
