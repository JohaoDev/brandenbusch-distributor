import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ReclamosComponent } from './pedidos/reclamos/reclamos.component';
import { ResumenPedidoComponent } from './pedidos/resumen-pedido/resumen-pedido.component';
import { ResumenReclamoComponent } from './pedidos/resumen-reclamos/resumen-reclamo.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'reclamos', component: ReclamosComponent },
  { path: 'resumen_pedidos', component: ResumenPedidoComponent },
  { path: 'resumen_reclamos', component: ResumenReclamoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
