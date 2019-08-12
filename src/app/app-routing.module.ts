import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/restaurants',
        pathMatch: 'full'
    },
    {path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInPageModule'},
    {path: 'restaurants', loadChildren: './restaurants/restaurants.module#RestaurantsPageModule'},
    {path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpPageModule'},
    {path: 'sign-out', loadChildren: './sign-out/sign-out.module#SignOutPageModule'},
    {path: 'my-orders', loadChildren: './my-orders/my-orders.module#MyOrdersPageModule'},
    {path: 'api', loadChildren: './api/api.module#APIPageModule'},
    {path: 'restaurants/:id', loadChildren: './restaurant-single/restaurant-single.module#RestaurantSinglePageModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
